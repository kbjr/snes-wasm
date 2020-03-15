
import { exec } from '../utils';
import { flags } from '../flags';
import { registers } from '../registers';
import { cpuThread } from '../../_scheduler/threads';
import { read_u8, read_u16 } from '../../system-bus';
import {
	addr_directPageIndexedIndirectX,
	addr_stackRelative,
	addr_directPage,
	addr_directPageIndirectLong,
	addr_immediate_u8,
	addr_immediate_u16,
	addr_absolute,
	addr_absoluteLong,
	addr_directPageIndirectIndexedY,
	addr_directPageIndirect,
	addr_stackRelativeIndirectIndexedY,
	addr_directPageIndexedX,
	addr_directPageIndirectLongIndexedY,
	addr_absoluteIndexedY,
	addr_absoluteIndexedX,
	addr_absoluteLongIndexedX
} from '../addressing';

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
 */
export namespace adc {
	/** 0x61 - Direct Page Indirect Indexed,X */
	export function $61() : bool {
		return exec(adc, addr_directPageIndexedIndirectX, 6);
	}
	
	/** 0x63 - Stack Relative */
	export function $63() : bool {
		return exec(adc, addr_stackRelative, 4);
	}
	
	/** 0x65 - Direct Page */
	export function $65() : bool {
		return exec(adc, addr_directPage, 3);
	}
	
	/** 0x67 - Direct Page Indirect Long */
	export function $67() : bool {
		return exec(adc, addr_directPageIndirectLong, 6);
	}
	
	/** 0x69 - Immediate */
	export function $69() : bool {
		if (flags.E || flags.M) {
			adc_u8(addr_immediate_u8());
		}

		else {
			adc_u16(addr_immediate_u16());
		}
	
		// Count 2 cycles for the instruction
		cpuThread.countCycles(2);

		return false;
	}
	
	/** 0x6D - Absolute */
	export function $6D() : bool {
		return exec(adc, addr_absolute, 4);
	}
	
	/** 0x6F - Absolute Long */
	export function $6F() : bool {
		return exec(adc, addr_absoluteLong, 5);
	}
	
	/** 0x71 - Direct Page Indirect Indexed,Y */
	export function $71() : bool {
		return exec(adc, addr_directPageIndirectIndexedY, 5);
	}
	
	/** 0x72 - Direct Page Indirect */
	export function $72() : bool {
		return exec(adc, addr_directPageIndirect, 5);
	}
	
	/** 0x73 - Stack Relative Indirect Indexed,Y */
	export function $73() : bool {
		return exec(adc, addr_stackRelativeIndirectIndexedY, 7);
	}
	
	/** 0x75 - Direct Page Indexed,X */
	export function $75() : bool {
		return exec(adc, addr_directPageIndexedX, 4);
	}
	
	/** 0x77 - Direct Indirect Long Indexed,Y */
	export function $77() : bool {
		return exec(adc, addr_directPageIndirectLongIndexedY, 6);
	}
	
	/** 0x79 - Absolute Indexed,Y */
	export function $79() : bool {
		return exec(adc, addr_absoluteIndexedY, 4);
	}
	
	/** 0x7D - Absolute Indexed,X */
	export function $7D() : bool {
		return exec(adc, addr_absoluteIndexedX, 4);
	}
	
	/** 0x7F - Absolute Long Indexed,X */
	export function $7F() : bool {
		return exec(adc, addr_absoluteLongIndexedX, 5);
	}
	
	
	
	
	
	// ===== Actual Add With Carry implementation
	
	/** Given a fully resolved effective address, performs the adc instruction */
	function adc(long: u32) : void {
		const bank = <u8>(long >> 16);
		const addr = <u16>(long & 0xffff);
	
		// If we're in Emulation mode (E) or 8-bit mode (M), only read an 8-bit operand,
		// and add to the accumulator
		if (flags.E || flags.M) {
			adc_u8(read_u8(bank, addr));
		}
	
		// Otherwise, read a 16-bit operand
		else {
			adc_u16(read_u16(bank, addr));
		}
	}
	
	/** 8-bit Mode */
	function adc_u8(operand: u8) : void {
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
		flags.V_assign(overflow);
	
		// Set/clear the Negative (N) flag depending on if the high bit is set
		flags.N_assign(result & 0x80);
	
		// Set/clear the Zero (Z) flag depending on if the value is zero
		flags.Z_assign((result & 0xff) === 0x00);
	
		// Set/clear the Carry (C) flag depending on if an unsigned overflow occured
		flags.C_assign(result > 0xff);
	}
	
	/** 16-bit Mode */
	function adc_u16(operand: u16) : void {
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
		flags.V_assign(overflow);
	
		// Set/clear the Negative (N) flag depending on if the high bit is set
		flags.N_assign(result & 0x8000);
	
		// Set/clear the Zero (Z) flag depending on if the value is zero
		flags.Z_assign((result & 0xffff) === 0x0000);
	
		// Set/clear the Carry (C) flag depending on if an unsigned overflow occured
		flags.C_assign(result > 0xffff);

		// Count 1 extra cycle for 16-bit mode
		cpuThread.countCycles(1);
	}
}
