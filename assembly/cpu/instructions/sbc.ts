
/**
 * sbc
 * Subtract with Borrow Instruction
 *
 * Subtract the data located at the effective address specified by the operand from the
 * contexts of the accumulator; Subtract one more if the carry flag is clear, and store
 * the result in the accumulator.
 */
export namespace sbc {
	/**
	 * sbc
	 * Subtract with Borrow Instruction
	 *
	 * Opcode:     0xE1
	 * Flags:      nv----zc-
	 * Addressing: Direct Page Indexed Indirect,X
	 * Bytes:      2
	 * Cycles:     6 [1],[2]
	 *
	 *   sbc (dp,X)
	 *
	 * Subtract the data located at the effective address specified by the operand from the
	 * contexts of the accumulator; Subtract one more if the carry flag is clear, and store
	 * the result in the accumulator.
	 *
	 * [1]: Add 1 cycle if m=0 (16-bit memory/accumulator)
	 * [2]: Add 1 cycle if low byte of Direct Page Register is non-zero
	 */
	export function $E1() : bool {
		const [ bank, addr ] = this.addr.directPageIndexedIndirectX_map();

		this.sbc$__(bank, addr);

		// Count 6 cycles for the instruction
		this.cycles += 6;

		// If the low byte of the Direct Page Register (D) is non-zero, count one extra cycle
		if (this.registers.D & 0xff) {
			this.cycles++;
		}
	}

	export function $E3() : bool {
		// TODO: sbc sr,S
		return false;
	}

	export function $E5() : bool {
		// TODO: sbc dp
		return false;
	}

	export function $E7() : bool {
		// TODO: sbc [dp]
		return false;
	}

	/**
	 * sbc
	 * Subtract with Borrow Instruction
	 *
	 * Opcode:     0xE9
	 * Flags:      nv----zc-
	 * Addressing: Immediate
	 * Bytes:      2 [2]
	 * Cycles:     2 [1]
	 *
	 *   sbc #const
	 *
	 * Subtract the data located at the effective address specified by the operand from the
	 * contexts of the accumulator; Subtract one more if the carry flag is clear, and store
	 * the result in the accumulator.
	 *
	 * [1]: Add 1 cycle if m=0 (16-bit memory/accumulator)
	 * [2]: Add 1 byte if m=0 (16-bit memory/accumulator)
	 */
	export function $E9() : bool {
		if (this.flag_E || this.flag_M) {
			this.sbc$___ui8(this.addr.immediate_read_ui8());
		}

		else {
			this.sbc$___ui16(this.addr.immediate_read_ui16());
		}

		// Count 2 cycles for the instruction
		this.cycles += 2;
	}

	export function $ED() : bool {
		// TODO: sbc addr
		return false;
	}

	export function $EF() : bool {
		// TODO: sbc long
		return false;
	}

	export function $F1() : bool {
		// TODO: sbc (dp),Y
		return false;
	}

	export function $F2() : bool {
		// TODO: sbc (dp)
		return false;
	}

	export function $F3() : bool {
		// TODO: sbc (sr,S),Y
		return false;
	}

	export function $F5() : bool {
		// TODO: sbc dp,X
		return false;
	}

	export function $F7() : bool {
		// TODO: sbc [dp],Y
		return false;
	}

	export function $F9() : bool {
		// TODO: sbc addr,Y
		return false;
	}

	export function $FD() : bool {
		// TODO: sbc addr,X
		return false;
	}

	export function $FF() : bool {
		// TODO: sbc long,X
		return false;
	}






	// /** Perform the actual sbc operation in 8-bit mode */
	// protected sbc$___ui8(operand: ui8) {
	// 	// Invert the operand, so operand is now negative operand minus 1
	// 	operand = ~operand;

	// 	const aLow = this.registers.mem_A[0];
		
	// 	let result: number;
	// 	let overflow: number;

	// 	let carry = this.flag_C;

	// 	// Handle BCD subtraction if in decimal mode
	// 	if (this.flag_D) {
	// 		// Add the low nibble (the ones digit)
	// 		result = (aLow & 0x0f) + (operand & 0x0f) + carry;

	// 		// If we overflowed the ones digit, actually overflow
	// 		if (result <= 0x0f) {
	// 			result -= 0x06;
	// 		}

	// 		// Calculate the new carry, depending on whether or not the ones digit overflowed
	// 		carry = result > 0x0f ? 0x01 : 0x00;

	// 		// Add the high nibble (the tens digit)
	// 		result = (aLow & 0xf0) + (operand & 0xf0) + (carry << 4) + (result & 0x0f);

	// 		// Check for a signed overflow
	// 		overflow = ~(aLow ^ operand) & (aLow ^ result) & 0x80;

	// 		// If we overflowed the tens digit, actually overflow
	// 		if (result <= 0xff) {
	// 			result -= 0x60;
	// 		}
	// 	}

	// 	// Otherwise, do simple binary subtraction
	// 	else {
	// 		result = aLow + operand + carry;

	// 		// Check for a signed overflow
	// 		overflow = ~(aLow ^ operand) & (aLow ^ result) & 0x80;
	// 	}

	// 	// Store the result in the accumulator
	// 	this.registers.mem_A[0] = result;

	// 	// Set/clear the Overflow (V) flag depending on if a signed overflow occured
	// 	this.registers.assignFlag(FLAG.V, overflow);

	// 	// Set/clear the Negative (N) flag depending on if the high bit is set
	// 	this.registers.assignFlag(FLAG.N, result & 0x80);

	// 	// Set/clear the Zero (Z) flag depending on if the value is zero
	// 	this.registers.assignFlag(FLAG.Z, cast_ui8(result) === 0x00);

	// 	// Set/clear the Carry (C) flag depending on if an unsigned overflow occured
	// 	this.registers.assignFlag(FLAG.C, result > 0xff);
	// }

	// /** Perform the actual sbc operation in 16-bit mode */
	// protected sbc$___ui16(operand: ui16) {
	// 	// Invert the operand, so operand is now negative operand minus 1
	// 	operand = ~operand;

	// 	const accumulator = this.registers.C;
		
	// 	let result: number;
	// 	let overflow: number;

	// 	let carry = this.flag_C;

	// 	// Handle BCD subtraction if in decimal mode
	// 	if (this.flag_D) {
	// 		// Add the low nibble (the ones digit)
	// 		result = (accumulator & 0x000f) + (operand & 0x000f) + carry;

	// 		// If we overflowed the ones digit, actually overflow
	// 		result -= result <= 0x000f ? 0x0006 : 0x0000;

	// 		// Calculate the new carry, depending on whether or not the ones digit overflowed
	// 		carry = result > 0x000f ? 0x01 : 0x00;

	// 		// Continue repeating the process for the rest of the nibbles, summing up the results
	// 		result = (accumulator & 0x00f0) + (operand & 0x00f0) + (carry << 4) + (result & 0x000f);

	// 		// Calculate overflow/carry...
	// 		result -= result <= 0x00ff ? 0x0060 : 0x0000;
	// 		carry = result > 0x00ff ? 0x01 : 0x00;
			
	// 		// Add another digit...
	// 		result = (accumulator & 0x0f00) + (operand & 0x0f00) + (carry << 4) + (result & 0x00ff);
			
	// 		// Calculate overflow/carry...
	// 		result -= result <= 0x0fff ? 0x0600 : 0x0000;
	// 		carry = result > 0x0fff ? 0x01 : 0x00;
			
	// 		// Add the final digit
	// 		result = (accumulator & 0xf000) + (operand & 0xf000) + (carry << 4) + (result & 0x0fff);

	// 		// Check for a signed overflow
	// 		overflow = ~(accumulator ^ operand) & (accumulator ^ result) & 0x8000;

	// 		// Check for BCD overflow
	// 		if (result <= 0xffff) {
	// 			result -= 0x6000;
	// 		}
	// 	}

	// 	// Otherwise, do simple binary subtraction
	// 	else {
	// 		result = accumulator + operand + carry;

	// 		// Check for a signed overflow
	// 		overflow = ~(accumulator ^ operand) & (accumulator ^ result) & 0x8000;
	// 	}

	// 	// Store the result in the accumulator
	// 	this.registers.C = result;

	// 	// Set/clear the Overflow (V) flag depending on if a signed overflow occured
	// 	this.registers.assignFlag(FLAG.V, overflow);

	// 	// Set/clear the Negative (N) flag depending on if the high bit is set
	// 	this.registers.assignFlag(FLAG.N, result & 0x8000);

	// 	// Set/clear the Zero (Z) flag depending on if the value is zero
	// 	this.registers.assignFlag(FLAG.Z, cast_ui16(result) === 0x0000);

	// 	// Set/clear the Carry (C) flag depending on if an unsigned overflow occured
	// 	this.registers.assignFlag(FLAG.C, result > 0xffff);
	// }

	// protected sbc$__(bank: ui8, addr: ui16) {
	// 	if (this.flag_E || this.flag_M) {
	// 		this.sbc$___ui8(this.snes.bus.read_ui8(bank, addr));
	// 	}

	// 	else {
	// 		this.sbc$___ui16(this.snes.bus.read_ui16_le(bank, addr));

	// 		// Count 1 extra cycle for 16-bit mode
	// 		this.cycles++;
	// 	}
	// }

}
