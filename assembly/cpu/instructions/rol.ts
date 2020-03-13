
import { flags } from '../flags';
import { registers } from '../registers';
import { cpuThread } from '../../scheduler';

/**
 * rol
 * Rotate Memory or Accumulator Left Instruction
 *
 * Rotate the contents of the operand (op) left one bit. The carry flag is used for
 * the 17th (or 9th) bit, the highest bit, when rotating. The high bit from op will
 * end up in the carry flag, and the carry flag will end up in bit 0 of op
 */
export namespace rol {
	/**
	 * rol
	 * Rotate Memory or Accumulator Left Instruction
	 *
	 * Opcode:     0x2A
	 * Flags:      n-----zc-
	 * Addressing: Accumulator
	 * Bytes:      1
	 * Cycles:     2
	 *
	 *   rol A
	 *
	 * Rotate the contents of the accumulator register left one bit. The carry
	 * flag is used for the 17th (or 9th) bit, the highest bit, when rotating.
	 * The high bit from A will end up in the carry flag, and the carry flag will
	 * end up in bit 0 of A
	 */
	export function $2A() : bool {
		if (this.flag_E || this.flag_M) {
			this.registers.C = this.rol$___ui8(this.registers.A);
		}

		else {
			this.registers.C = this.rol$___ui16(this.registers.C);
		}

		// Add 2 cycles for the instruction
		cpuThread.countCycles(2);
	}

	/**
	 * rol
	 * Rotate Memory or Accumulator Left Instruction
	 *
	 * Opcode:     0x2E
	 * Flags:      n-----zc-
	 * Addressing: Absolute
	 * Bytes:      3
	 * Cycles:     6 [1]
	 *
	 *   rol addr
	 *
	 * Rotate the contents stored at the given address left one bit. The carry
	 * flag is used for the 17th (or 9th) bit, the highest bit, when rotating.
	 * The high bit will end up in the carry flag, and the carry flag will
	 * end up in bit 0
	 *
	 * [1]: Add 2 cycles if M = 0 (16-bit memory/accumulator)
	 */
	export function $2E() : bool {
		const [ bank, addr ] = this.addr.absolute_map();

		this.rol$__(bank, addr);

		// Count 6 cycles for the instruction
		cpuThread.countCycles(6);
	}

	/**
	 * rol
	 * Rotate Memory or Accumulator Left Instruction
	 *
	 * Opcode:     0x26
	 * Flags:      n-----zc-
	 * Addressing: Direct Page
	 * Bytes:      2
	 * Cycles:     5 [1], [2]
	 *
	 *   rol dp
	 *
	 * Rotate the contents stored at the given address left one bit. The carry
	 * flag is used for the 17th (or 9th) bit, the highest bit, when rotating.
	 * The high bit will end up in the carry flag, and the carry flag will
	 * end up in bit 0
	 *
	 * [1]: Add 2 cycles if M = 0 (16-bit memory/accumulator)
	 * [2]: Add 1 cycle if low byte of Direct Page register is other than 0
	 */
	export function $26() : bool {
		const [ bank, addr ] = this.addr.directPage_map();

		this.rol$__(bank, addr);

		// Count 5 cycles for the instruction
		cpuThread.countCycles(5);
	}

	/**
	 * rol
	 * Rotate Memory or Accumulator Left Instruction
	 *
	 * Opcode:     0x3E
	 * Flags:      n-----zc-
	 * Addressing: Absolute Indexed,X
	 * Bytes:      3
	 * Cycles:     7 [1]
	 *
	 *   rol addr,X
	 *
	 * Rotate the contents stored at the given address left one bit. The carry
	 * flag is used for the 17th (or 9th) bit, the highest bit, when rotating.
	 * The high bit will end up in the carry flag, and the carry flag will
	 * end up in bit 0
	 *
	 * [1]: Add 2 cycles if M = 0 (16-bit memory/accumulator)
	 */
	export function $3E() : bool {
		const [ bank, addr ] = this.addr.absoluteIndexedX_map();

		this.rol$__(bank, addr);

		// Count 7 cycles for the instruction
		cpuThread.countCycles(7);
	}

	/**
	 * rol
	 * Rotate Memory or Accumulator Left Instruction
	 *
	 * Opcode:     0x36
	 * Flags:      n-----zc-
	 * Addressing: Direct Page Indexed,X
	 * Bytes:      2
	 * Cycles:     6 [1], [2]
	 *
	 *   rol dp,X
	 *
	 * Rotate the contents stored at the given address left one bit. The carry
	 * flag is used for the 17th (or 9th) bit, the highest bit, when rotating.
	 * The high bit will end up in the carry flag, and the carry flag will
	 * end up in bit 0
	 *
	 * [1]: Add 2 cycles if M = 0 (16-bit memory/accumulator)
	 * [2]: Add 1 cycle if low byte of Direct Page register is other than 0
	 */
	export function $36() : bool {
		const [ bank, addr ] = this.addr.directPageIndexedX_map();

		this.rol$__(bank, addr);

		// Count 6 cycles for the instruction
		cpuThread.countCycles(6);
	}



	
	// /**
	//  * 8-bit mode implementation of rol$__
	//  *
	//  * Rotate the contents of the Carry flag + the value left one bit.
	//  */
	// protected rol$___ui8(operand: ui8) : ui8 {
	// 	// Shift one bit to the left and shift the carry flag into bit 0
	// 	const shifted = cast_ui8((operand << 1) | this.flag_C);

	// 	// Set/clear the C, N, and Z flags as needed
	// 	this.registers.assignFlag(FLAG.C, operand & 0x80);
	// 	this.registers.assignFlag(FLAG.N, shifted & 0x80);
	// 	this.registers.assignFlag(FLAG.Z, shifted === 0x00);

	// 	return shifted;
	// }

	// /**
	//  * 16-bit mode implementation of rol$__
	//  *
	//  * Rotate the contents of the Carry flag + the value left one bit.
	//  */
	// protected rol$___ui16(operand: ui16) : ui16 {
	// 	// Shift one bit to the left and shift the carry flag into bit 0
	// 	const shifted = cast_ui16((operand << 1) | this.flag_C);

	// 	// Set/clear the C, N, and Z flags as needed
	// 	this.registers.assignFlag(FLAG.C, operand & 0x8000);
	// 	this.registers.assignFlag(FLAG.N, shifted & 0x8000);
	// 	this.registers.assignFlag(FLAG.Z, shifted === 0x0000);

	// 	return shifted;
	// }

	// /** Underlying implementation of the rol instruction  */
	// protected rol$__(bank: ui8, addr: ui16) {
	// 	if (this.flag_E || this.flag_M) {
	// 		const operand = this.snes.bus.read_ui8(bank, addr);
	// 		const shifted = this.rol$___ui8(operand);

	// 		this.snes.bus.write_ui8(bank, addr, shifted);
	// 	}

	// 	else {
	// 		const operand = this.snes.bus.read_ui16_le(bank, addr);
	// 		const shifted = this.rol$___ui16(operand);

	// 		this.snes.bus.write_ui16_le(bank, addr, shifted);

	// 		// Count 2 extra cycles for 16-bit mode
	// 		this.cycles += 2;
	// 	}
	// }

}
