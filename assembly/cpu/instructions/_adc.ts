
import { flags } from '../flags';
import { registers } from '../registers';
import { instruction } from '../instruction';
import {
	addr_absolute,
	addr_directPage,
	addr_immediate,
	addr_stackRelative
} from '../addressing';
import { bus } from '../../bus';
import { scheduler } from '../../scheduler';
import { Instruction_addr_immediate } from '../addressing/immediate';

/**
 * Add With Carry Instruction (`adc`)
 *
 * Adds operand to the Accumulator; adds an additional 1 if `C` is set
 * 
 *     | OpCode | Syntax       | Addressing                        | Flags     | Bytes | Cycle         |
 *     |--------|--------------|-----------------------------------|-----------|-------|---------------|
 *     | 0x61   | and (dp,X)   | Direct Page Indirect Indexed,X    | NV----ZC- | 2     | 6 [1],[2]     |
 *     | 0x63   | and sr,S     | Stack Relative                    | NV----ZC- | 2     | 4 [1]         |
 *     | 0x65   | and dp       | Direct Page                       | NV----ZC- | 2     | 3 [1],[2]     |
 *     | 0x67   | and [dp]     | Direct Page Indirect Long         | NV----ZC- | 2     | 6 [1],[2]     |
 *     | 0x69   | and #const   | Immediate                         | NV----ZC- | 2 [3] | 2 [1]         |
 *     | 0x6D   | and addr     | Absolute                          | NV----ZC- | 3     | 4 [1]         |
 *     | 0x6F   | and long     | Absolute Long                     | NV----ZC- | 4     | 5 [1]         |
 *     | 0x71   | and (dp),Y   | Direct Page Indirect Indexed,Y    | NV----ZC- | 2     | 5 [1],[2],[4] |
 *     | 0x72   | and (dp)     | Direct Page Indirect              | NV----ZC- | 2     | 5 [1],[2]     |
 *     | 0x73   | and (sr,S),Y | Stack Relative Indirect Indexed,Y | NV----ZC- | 2     | 7 [1]         |
 *     | 0x75   | and dp,X     | Direct Page Indexed,X             | NV----ZC- | 2     | 4 [1],[2]     |
 *     | 0x77   | and [dp],Y   | Direct Indirect Long Indexed,Y    | NV----ZC- | 2     | 6 [1],[2]     |
 *     | 0x79   | and addr,Y   | Absolute Indexed,Y                | NV----ZC- | 3     | 4 [1],[4]     |
 *     | 0x7D   | and addr,X   | Absolute Indexed,X                | NV----ZC- | 3     | 4 [1],[4]     |
 *     | 0x7F   | and long,X   | Absolute Long Indexed,X           | NV----ZC- | 4     | 5 [1]         |
 *
 * [1]: Add 1 cycle if M = 0
 * [2]: Add 1 cycle if low byte of D is non-zero
 * [3]: Add 1 byte if M = 0
 * [4]: Add 1 cycle if adding index crosses a page boundary or X = 0 (16-bit index registers)
 *
 * FIXME: Implement [4]
 * FIXME: Where do we count all the cpu cycles?
 */
export namespace adc {

	export const test = new Instruction_addr_immediate(adc_u8, adc_u16);

	export class adc61 extends addr_directPage.indexedX.indirect.Instruction {
		constructor() {
			super(adc_);
		}
	}

	/** 0x61 - Direct Page Indirect Indexed,X */
	// export const $61 = create(addr_directPage.indexedX.indirect.Instruction);
	export const $61 = new adc.adc61();
	// export const $61 = new addr_directPage.indexedX.indirect.Instruction(adc_);

	/** 0x63 - Stack Relative */
	export const $63 = new addr_stackRelative.Instruction(adc_);
	
	/** 0x65 - Direct Page */
	export const $65 = new addr_directPage.Instruction(adc_);
	
	/** 0x67 - Direct Page Indirect Long */
	export const $67 = new addr_directPage.indirect.long.Instruction(adc_);
	
	/** 0x69 - Immediate */
	export const $69 = new addr_immediate.Instruction(adc_u8, adc_u16);
	
	/** 0x6D - Absolute */
	export const $6D = new addr_absolute.Instruction(adc_);
	
	/** 0x6F - Absolute Long */
	export const $6F = new addr_absolute.long.Instruction(adc_);
	
	/** 0x71 - Direct Page Indirect Indexed,Y */
	export const $71 = new addr_directPage.indirect.indexedY.Instruction(adc_);
	
	/** 0x72 - Direct Page Indirect */
	export const $72 = new addr_directPage.indirect.Instruction(adc_);
	
	/** 0x73 - Stack Relative Indirect Indexed,Y */
	export const $73 = new addr_stackRelative.indirectIndexedY.Instruction(adc_);
	
	/** 0x75 - Direct Page Indexed,X */
	export const $75 = new addr_directPage.indexedX.Instruction(adc_);
	
	/** 0x77 - Direct Indirect Long Indexed,Y */
	export const $77 = new addr_directPage.indirect.long.indexedY.Instruction(adc_);
	
	/** 0x79 - Absolute Indexed,Y */
	export const $79 = new addr_absolute.indexedY.Instruction(adc_);
	
	/** 0x7D - Absolute Indexed,X */
	export const $7D = new addr_absolute.indexedX.Instruction(adc_);
	
	/** 0x7F - Absolute Long Indexed,X */
	export const $7F = new addr_absolute.long.indexedX.Instruction(adc_);
	
	
	
	
	
	// ===== Actual Add With Carry implementation
	
	let buffer: u8 = 0;
	let is8Bit: bool = false;

	/** Given a fully resolved effective address, performs the adc instruction */
	function adc_(inst: instruction.Instruction, effective: u32) : bool {
		switch (inst.step - instruction.firstStep) {
			case 0:
				// Check what mode we're running in (8-bit or 16-bit)
				is8Bit = flags.E || flags.M;

				// Prepare to read the first byte from the effective address
				bus.read.setup(effective);
				
				return false;
			
			case 1:
				// If we're in 8-bit mode, we just want the one byte, so we can finish up
				if (is8Bit) {
					return adc_u8(inst, bus.read.fetch());
				}

				// Otherwise, grab our one byte, and prepare to grab second
				else {
					buffer = bus.read.fetch();

					bus.read.setup(effective + 1);

					return false;
				}
			
			case 2:
				// If we're here on step 2, that can only mean we're in 16-bit mode.
				// Read the next byte from the effective address to construct our operand
				let operand = <u16>bus.read.fetch() << 8;

				// Add on the byte we read last time to get the full u16
				operand |= buffer;

				return adc_u16(inst, operand);
			
			// This should never happen
			default:
				return true;
		}
	}
	
	/** 8-bit Mode */
	function adc_u8(inst: instruction.Instruction, operand: u8) : true {
		const aLow: u8 = registers.A;
		
		let result: u16;
		let overflow: u8;
		let carry: u16 = flags.C ? 0x01 : 0x00;
	
		// Handle BCD addition if in decimal mode
		if (flags.D) {
			// Add the low nibble (the ones digit)
			result = <u16>(aLow & 0x0f) + <u16>(operand & 0x0f) + carry;
	
			// If we overflowed the ones digit, actually overflow
			if (result > 0x09) {
				result += 0x06;
			}
	
			// Calculate the new carry, depending on whether or not the ones digit overflowed
			carry = result > 0x0f ? 0x01 : 0x00;
	
			// Add the high nibble (the tens digit)
			result = <u16>(aLow & 0xf0) + <u16>(operand & 0xf0) + (carry << 4) + (result & 0x0f);
	
			// Check for a signed overflow
			overflow = ~(aLow ^ operand) & (aLow ^ <u8>result) & 0x80;
	
			// If we overflowed the tens digit, actually overflow
			if (result > 0x9f) {
				result += 0x60;
			}
		}
	
		// Otherwise, do simple binary addition
		else {
			result = aLow + operand + carry;
	
			// Check for a signed overflow
			overflow = ~(aLow ^ operand) & (aLow ^ <u8>result) & 0x80;
		}
	
		// Store the result in the accumulator
		registers.A = <u8>(result & 0xff);
	
		// Set/clear the Overflow (V) flag depending on if a signed overflow occured
		flags.V_assign(<bool>overflow);
	
		// Set/clear the Negative (N) flag depending on if the high bit is set
		flags.N_assign(<bool>(result & 0x80));
	
		// Set/clear the Zero (Z) flag depending on if the value is zero
		flags.Z_assign((result & 0xff) === 0x00);
	
		// Set/clear the Carry (C) flag depending on if an unsigned overflow occured
		flags.C_assign(result > 0xff);

		return true;
	}
	
	/** 16-bit Mode */
	function adc_u16(inst: instruction.Instruction, operand: u16) : true {
		const aFull = registers.C;
		
		let result: u32;
		let overflow: u16;
		let carry: u32 = flags.C ? 0x01 : 0x00;
	
		// Handle BCD addition if in decimal mode
		if (flags.D) {
			// Add the low nibble (the ones digit)
			result = <u32>(aFull & 0x000f) + <u32>(operand & 0x000f) + carry;
	
			// If we overflowed the ones digit, actually overflow
			result += result > 0x0009 ? 0x0006 : 0x0000;
	
			// Calculate the new carry, depending on whether or not the ones digit overflowed
			carry = result > 0x000f ? 0x01 : 0x00;
	
			// Continue repeating the process for the rest of the nibbles, summing up the results
			result = <u32>(aFull & 0x00f0) + <u32>(operand & 0x00f0) + (carry << 4) + (result & 0x000f);
	
			// Calculate overflow/carry...
			result += result > 0x009f ? 0x0060 : 0x0000;
			carry = result > 0x00ff ? 0x01 : 0x00;
			
			// Add another digit...
			result = <u32>(aFull & 0x0f00) + <u32>(operand & 0x0f00) + (carry << 8) + (result & 0x00ff);
			
			// Calculate overflow/carry...
			result += result > 0x09ff ? 0x0600 : 0x0000;
			carry = result > 0x0fff ? 0x01 : 0x00;
			
			// Add the final digit
			result = <u32>(aFull & 0xf000) + <u32>(operand & 0xf000) + (carry << 12) + (result & 0x0fff);
	
			// Check for a signed overflow
			overflow = ~(aFull ^ operand) & (aFull ^ <u16>result) & 0x8000;
	
			// Check for BCD overflow
			if (result > 0x9fff) {
				result += 0x6000;
			}
		}
	
		// Otherwise, do simple binary addition
		else {
			result = aFull + operand + carry;
	
			// Check for a signed overflow
			overflow = ~(aFull ^ operand) & (aFull ^ <u16>result) & 0x8000;
		}
	
		// Store the result in the accumulator
		registers.C = <u16>(result & 0xffff);
	
		// Set/clear the Overflow (V) flag depending on if a signed overflow occured
		flags.V_assign(<bool>overflow);
	
		// Set/clear the Negative (N) flag depending on if the high bit is set
		flags.N_assign(<bool>(result & 0x8000));
	
		// Set/clear the Zero (Z) flag depending on if the value is zero
		flags.Z_assign((result & 0xffff) === 0x0000);
	
		// Set/clear the Carry (C) flag depending on if an unsigned overflow occured
		flags.C_assign(result > 0xffff);

		// Count 1 extra cycle for 16-bit mode
		scheduler.scheduler.cpuThread.countCycles(1);

		return true;
	}
}
