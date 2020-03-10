
import { flags } from '../flags';
import { read_u8, read_u16 } from '../../system-bus';
import { registers } from '../registers';
import { countCycles, countCyclesIf } from '../cycle-counter';
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
 */
export namespace adc {
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x61
	 * Flags:      nv----zc-
	 * Addressing: Direct Page Indirect Indexed,X
	 * Bytes:      2
	 * Cycles:     6 [1],[2]
	 *
	 *     adc (dp,X)
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if `C` is set
	 *
	 * [1]: Add 1 cycle if M = 0
	 * [2]: Add 1 cycle if low byte of D is non-zero
	 */
	export function $61() : void {
		adc(addr_directPageIndexedIndirectX());
		
		// Count 6 cycles for the instruction
		countCycles(6);

		// Count 1 extra cycle if the low byte of `D` is non-zero
		countCyclesIf(<bool>(registers.D & 0xff), 1);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x63
	 * Flags:      nv----zc-
	 * Addressing: Stack Relative
	 * Bytes:      2
	 * Cycles:     4 [1]
	 *
	 *     adc sr,S
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if `C` is set
	 *
	 * [1]: Add 1 cycle if M = 0
	 */
	export function $63() : void {
		adc(addr_stackRelative());
		
		// Count 4 cycles for the instruction
		countCycles(4);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x65
	 * Flags:      nv----zc-
	 * Addressing: Direct Page
	 * Bytes:      2
	 * Cycles:     3 [1],[2]
	 *
	 *     adc dp
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if C=1
	 *
	 * [1]: Add 1 cycle if M = 0
	 * [2]: Add 1 cycle if low byte of Direct Page Register is non-zero
	 */
	export function $65() : void {
		adc(addr_directPage());
		
		// Count 3 cycles for the instruction
		countCycles(3);

		// Count 1 extra cycle if the low byte of `D` is non-zero
		countCyclesIf(<bool>(registers.D & 0xff), 1);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x67
	 * Flags:      nv----zc-
	 * Addressing: Direct Page Indirect Long
	 * Bytes:      2
	 * Cycles:     6 [1],[2]
	 *
	 *     adc [dp]
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if C=1
	 *
	 * [1]: Add 1 cycle if M = 0
	 * [2]: Add 1 cycle if low byte of Direct Page Register is non-zero
	 */
	export function $67() : void {
		adc(addr_directPageIndirectLong());
	
		// Count 6 cycles for the instruction
		countCycles(6);

		// Count 1 extra cycle if the low byte of `D` is non-zero
		countCyclesIf(<bool>(registers.D & 0xff), 1);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x69
	 * Flags:      nv----zc-
	 * Addressing: Immediate
	 * Bytes:      2 [2]
	 * Cycles:     2 [1]
	 *
	 *     adc #const
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if C = 1
	 *
	 * [1]: Add 1 cycle if M = 0
	 * [2]: Add 1 byte if M = 0
	 */
	export function $69() : void {
		if (flags.E || flags.M) {
			adc_u8(addr_immediate_u8());
		}

		else {
			adc_u16(addr_immediate_u16());
		}
	
		// Count 2 cycles for the instruction
		countCycles(2);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x6D
	 * Flags:      nv----zc-
	 * Addressing: Absolute
	 * Bytes:      3
	 * Cycles:     4 [1]
	 *
	 *     adc addr
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if C=1
	 *
	 * [1]: Add 1 cycle if M = 0
	 */
	export function $6D() : void {
		adc(addr_absolute());
	
		// Count 4 cycles for the instruction
		countCycles(4);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x6F
	 * Flags:      nv----zc-
	 * Addressing: Absolute Long
	 * Bytes:      4
	 * Cycles:     5 [1]
	 *
	 *     adc long
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if C=1
	 *
	 * [1]: Add 1 cycle if M = 0
	 */
	export function $6F() : void {
		adc(addr_absoluteLong());
	
		// Count 5 cycles for the instruction
		countCycles(5);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x71
	 * Flags:      nv----zc-
	 * Addressing: Direct Page Indirect Indexed,Y
	 * Bytes:      2
	 * Cycles:     5 [1],[2],[3]
	 *
	 *     adc (dp),Y
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if C=1
	 *
	 * [1]: Add 1 cycle if M = 0
	 * [2]: Add 1 cycle if low byte of Direct Page Register is non-zero
	 * [3]: Add 1 cycle if adding index crosses a page boundary or x=0 (16-bit index registers)
	 *
	 * FIXME: Implement [3]
	 */
	export function $71() : void {
		adc(addr_directPageIndirectIndexedY());
	
		// Count 5 cycles for the instruction
		countCycles(5);

		// Count 1 extra cycle if the low byte of `D` is non-zero
		countCyclesIf(<bool>(registers.D & 0xff), 1);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x72
	 * Flags:      nv----zc-
	 * Addressing: Direct Page Indirect
	 * Bytes:      2
	 * Cycles:     5 [1],[2]
	 *
	 *     adc (dp)
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if C=1
	 *
	 * [1]: Add 1 cycle if M = 0
	 * [2]: Add 1 cycle if low byte of Direct Page Register is non-zero
	 */
	export function $72() : void {
		adc(addr_directPageIndirect());
	
		// Count 5 cycles for the instruction
		countCycles(5);

		// Count 1 extra cycle if the low byte of `D` is non-zero
		countCyclesIf(<bool>(registers.D & 0xff), 1);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x73
	 * Flags:      nv----zc-
	 * Addressing: Stack Relative Indirect Indexed,Y
	 * Bytes:      2
	 * Cycles:     7 [1]
	 *
	 *     adc (sr,S),Y
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if C=1
	 *
	 * [1]: Add 1 cycle if M = 0
	 */
	export function $73() : void {
		adc(addr_stackRelativeIndirectIndexedY());
	
		// Count 7 cycles for the instruction
		countCycles(7);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x75
	 * Flags:      nv----zc-
	 * Addressing: Direct Page Indexed,X
	 * Bytes:      2
	 * Cycles:     4 [1],[2]
	 *
	 *     adc dp,X
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if C=1
	 *
	 * [1]: Add 1 cycle if M = 0
	 * [2]: Add 1 cycle if low byte of Direct Page Register is non-zero
	 */
	export function $75() : void {
		adc(addr_directPageIndexedX());
	
		// Count 4 cycles for the instruction
		countCycles(4);

		// Count 1 extra cycle if the low byte of `D` is non-zero
		countCyclesIf(<bool>(registers.D & 0xff), 1);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x77
	 * Flags:      nv----zc-
	 * Addressing: Direct Indirect Long Indexed,Y
	 * Bytes:      2
	 * Cycles:     6 [1],[2]
	 *
	 *     adc [dp],Y
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if C=1
	 *
	 * [1]: Add 1 cycle if M = 0
	 * [2]: Add 1 cycle if low byte of Direct Page Register is non-zero
	 */
	export function $77() : void {
		adc(addr_directPageIndirectLongIndexedY());
	
		// Count 6 cycles for the instruction
		countCycles(6);

		// Count 1 extra cycle if the low byte of `D` is non-zero
		countCyclesIf(<bool>(registers.D & 0xff), 1);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x79
	 * Flags:      nv----zc-
	 * Addressing: Absolute Indexed,Y
	 * Bytes:      3
	 * Cycles:     4 [1],[2]
	 *
	 *     adc addr,Y
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if C=1
	 *
	 * [1]: Add 1 cycle if M = 0
	 * [2]: Add 1 cycle if adding index crosses a page boundary or x=0 (16-bit index registers)
	 *
	 * FIXME: Implement [2]
	 */
	export function $79() : void {
		adc(addr_absoluteIndexedY());
	
		// Count 4 cycles for the instruction
		countCycles(4);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x7D
	 * Flags:      nv----zc-
	 * Addressing: Absolute Indexed,X
	 * Bytes:      3
	 * Cycles:     4 [1],[2]
	 *
	 *     adc addr,X
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if C=1
	 *
	 * [1]: Add 1 cycle if M = 0
	 * [2]: Add 1 cycle if adding index crosses a page boundary or x=0 (16-bit index registers)
	 *
	 * FIXME: Implement [2]
	 */
	export function $7D() : void {
		adc(addr_absoluteIndexedX());
	
		// Count 4 cycles for the instruction
		countCycles(4);
	}
	
	/**
	 * Add With Carry Instruction (`adc`)
	 *
	 * Opcode:     0x7F
	 * Flags:      nv----zc-
	 * Addressing: Absolute Long Indexed,X
	 * Bytes:      4
	 * Cycles:     5 [1]
	 *
	 *     adc long,X
	 *
	 * Adds operand to the Accumulator; adds an additional 1 if C=1
	 *
	 * [1]: Add 1 cycle if M = 0
	 */
	export function $7F() : void {
		adc(addr_absoluteLongIndexedX());
	
		// Count 5 cycles for the instruction
		countCycles(5);
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
		if (overflow) {
			flags.V_set();
		}
	
		else {
			flags.V_clear();
		}
	
		// Set/clear the Negative (N) flag depending on if the high bit is set
		if (result & 0x80) {
			flags.N_set();
		}
	
		else {
			flags.N_clear();
		}
	
		// Set/clear the Zero (Z) flag depending on if the value is zero
		if ((result & 0xff) === 0x00) {
			flags.Z_set();
		}
	
		else {
			flags.Z_clear();
		}
	
		// Set/clear the Carry (C) flag depending on if an unsigned overflow occured
		if (result > 0xff) {
			flags.C_set();
		}
	
		else {
			flags.C_clear();
		}
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
		if (overflow) {
			flags.V_set();
		}
	
		else {
			flags.V_clear();
		}
	
		// Set/clear the Negative (N) flag depending on if the high bit is set
		if (result & 0x8000) {
			flags.N_set();
		}
	
		else {
			flags.N_clear();
		}
	
		// Set/clear the Zero (Z) flag depending on if the value is zero
		if ((result & 0xffff) === 0x0000) {
			flags.Z_set();
		}
	
		else {
			flags.Z_clear();
		}
	
		// Set/clear the Carry (C) flag depending on if an unsigned overflow occured
		if (result > 0xffff) {
			flags.C_set();
		}
	
		else {
			flags.C_clear();
		}

		// Count 1 extra cycle for 16-bit mode
		countCycles(1);
	}
}
