
/**
 * ror
 * Rotate Memory or Accumulator Right Instruction
 *
 * Rotate the contents stored at the given address right one bit. The carry
 * flag is used for the 17th (or 9th) bit, the highest bit, when rotating.
 * The low bit will end up in the carry flag, and the carry flag will
 * end up in bit 16 (or 8)
 */
export namespace ror {
	/**
	 * ror
	 * Rotate Memory or Accumulator Right Instruction
	 *
	 * Opcode:     0x6A
	 * Flags:      n-----zc-
	 * Addressing: Accumulator
	 * Bytes:      1
	 * Cycles:     2
	 *
	 *   ror A
	 *
	 * Rotate the contents stored at the given address right one bit. The carry
	 * flag is used for the 17th (or 9th) bit, the highest bit, when rotating.
	 * The low bit will end up in the carry flag, and the carry flag will
	 * end up in bit 16 (or 8)
	 */
	export function $6A() : bool {
		if (this.flag_E || this.flag_M) {
			this.registers.C = this.ror$___ui8(this.registers.A);
		}

		else {
			this.registers.C = this.ror$___ui16(this.registers.C);
		}

		// Add 2 cycles for the instruction
		this.cycles += 2;
	}

	/**
	 * ror
	 * Rotate Memory or Accumulator Right Instruction
	 *
	 * Opcode:     0x6E
	 * Flags:      n-----zc-
	 * Addressing: Absolute
	 * Bytes:      3
	 * Cycles:     6 [1]
	 *
	 *   ror addr
	 *
	 * Rotate the contents stored at the given address right one bit. The carry
	 * flag is used for the 17th (or 9th) bit, the highest bit, when rotating.
	 * The low bit will end up in the carry flag, and the carry flag will
	 * end up in bit 16 (or 8)
	 *
	 * [1]: Add 2 cycles if M = 0 (16-bit memory/accumulator)
	 */
	export function $6E() : bool {
		const [ bank, addr ] = this.addr.absolute_map();

		this.ror$__(bank, addr);

		// Count 6 cycles for the instruction
		this.cycles += 6;
	}

	/**
	 * ror
	 * Rotate Memory or Accumulator Right Instruction
	 *
	 * Opcode:     0x66
	 * Flags:      n-----zc-
	 * Addressing: Direct Page
	 * Bytes:      2
	 * Cycles:     5 [1], [2]
	 *
	 *   ror dp
	 *
	 * Rotate the contents stored at the given address right one bit. The carry
	 * flag is used for the 17th (or 9th) bit, the highest bit, when rotating.
	 * The low bit will end up in the carry flag, and the carry flag will
	 * end up in bit 16 (or 8)
	 *
	 * [1]: Add 2 cycles if M = 0 (16-bit memory/accumulator)
	 * [2]: Add 1 cycle if low byte of Direct Page register is other than 0
	 */
	export function $66() : bool {
		const [ bank, addr ] = this.addr.directPage_map();

		this.ror$__(bank, addr);

		// Count 5 cycles for the instruction
		this.cycles += 5;

		// If the low byte of the Direct Page Register (D) is non-zero, count one extra cycle
		if (this.registers.D & 0xff) {
			this.cycles++;
		}
	}

	/**
	 * ror
	 * Rotate Memory or Accumulator Right Instruction
	 *
	 * Opcode:     0x7E
	 * Flags:      n-----zc-
	 * Addressing: Absolute Indexed,X
	 * Bytes:      3
	 * Cycles:     7 [1]
	 *
	 *   ror addr,X
	 *
	 * Rotate the contents stored at the given address right one bit. The carry
	 * flag is used for the 17th (or 9th) bit, the highest bit, when rotating.
	 * The low bit will end up in the carry flag, and the carry flag will
	 * end up in bit 16 (or 8)
	 *
	 * [1]: Add 2 cycles if M = 0 (16-bit memory/accumulator)
	 */
	export function $7E() : bool {
		const [ bank, addr ] = this.addr.absoluteIndexedX_map();

		this.ror$__(bank, addr);

		// Count 7 cycles for the instruction
		this.cycles += 7;
	}

	/**
	 * ror
	 * Rotate Memory or Accumulator Right Instruction
	 *
	 * Opcode:     0x76
	 * Flags:      n-----zc-
	 * Addressing: Direct Page Indexed,X
	 * Bytes:      2
	 * Cycles:     6 [1], [2]
	 *
	 *   ror dp,X
	 *
	 * Rotate the contents stored at the given address right one bit. The carry
	 * flag is used for the 17th (or 9th) bit, the highest bit, when rotating.
	 * The low bit will end up in the carry flag, and the carry flag will
	 * end up in bit 16 (or 8)
	 *
	 * [1]: Add 2 cycles if M = 0 (16-bit memory/accumulator)
	 * [2]: Add 1 cycle if low byte of Direct Page register is other than 0
	 */
	export function $76() : bool {
		const [ bank, addr ] = this.addr.directPageIndexedX_map();

		this.ror$__(bank, addr);

		// Count 6 cycles for the instruction
		this.cycles += 6;

		// If the low byte of the Direct Page Register (D) is non-zero, count one extra cycle
		if (this.registers.D & 0xff) {
			this.cycles++;
		}
	}





	// /**
	//  * 8-bit mode implementation of ror$__
	//  *
	//  * Rotates the given value + the Carry flag one bit to the right.
	//  */
	// protected ror$___ui8(operand: ui8) : ui8 {
	// 	// Shift one bit to the right and shift bit 0 into the carry flag
	// 	const shifted = (this.flag_C << 7) | (operand >> 1);

	// 	// Set/clear the C, N, and Z flags as needed
	// 	this.registers.assignFlag(FLAG.C, operand & 0x01);
	// 	this.registers.assignFlag(FLAG.N, shifted & 0x80);
	// 	this.registers.assignFlag(FLAG.Z, shifted === 0x00);

	// 	return shifted;
	// }

	// /**
	//  * 16-bit mode implementation of ror$__
	//  *
	//  * Rotates the given value + the Carry flag one bit to the right.
	//  */
	// protected ror$___ui16(operand: ui16) : ui16 {
	// 	// Shift one bit to the left and shift the carry flag into bit 0
	// 	const shifted = (this.flag_C << 15) | (operand >> 1);

	// 	// Set/clear the C, N, and Z flags as needed
	// 	this.registers.assignFlag(FLAG.C, operand & 0x0001);
	// 	this.registers.assignFlag(FLAG.N, shifted & 0x8000);
	// 	this.registers.assignFlag(FLAG.Z, shifted === 0x0000);

	// 	return shifted;
	// }

	// /** Underlying implementation of the ror instruction  */
	// protected ror$__(bank: ui8, addr: ui16) {
	// 	if (this.flag_E || this.flag_M) {
	// 		const operand = this.snes.bus.read_ui8(bank, addr);
	// 		const shifted = this.ror$___ui8(operand);

	// 		this.snes.bus.write_ui8(bank, addr, shifted);
	// 	}

	// 	else {
	// 		const operand = this.snes.bus.read_ui16_le(bank, addr);
	// 		const shifted = this.ror$___ui16(operand);

	// 		this.snes.bus.write_ui16_le(bank, addr, shifted);

	// 		// Count 2 extra cycles for 16-bit mode
	// 		this.cycles += 2;
	// 	}
	// }


}
