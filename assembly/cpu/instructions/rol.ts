
import { flags } from '../flags';
import { registers } from '../registers';
import { cpuThread } from '../../scheduler';
import { addr_absolute, addr_directPage, addr_absoluteIndexedX, addr_directPageIndexedX } from '../addressing';
import { read_u8, write_u8, read_u16, write_u16 } from '../../system-bus';

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
		if (flags.E || flags.M) {
			registers.C = rol_u8(registers.A);
		}

		else {
			registers.C = rol_u16(registers.C);
		}

		// Add 2 cycles for the instruction
		cpuThread.countCycles(2);

		return false;
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
		rol(addr_absolute());

		// Count 6 cycles for the instruction
		cpuThread.countCycles(6);

		return false;
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
		rol(addr_directPage());

		// Count 5 cycles for the instruction
		cpuThread.countCycles(5);

		return false;
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
		rol(addr_absoluteIndexedX());

		// Count 7 cycles for the instruction
		cpuThread.countCycles(7);

		return false;
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
		rol(addr_directPageIndexedX());

		// Count 6 cycles for the instruction
		cpuThread.countCycles(6);

		return false;
	}

	/**
	 * 8-bit mode implementation of rol
	 *
	 * Rotate the contents of the Carry flag + the value left one bit.
	 */
	function rol_u8(operand: u8) : u8 {
		// Shift one bit to the left and shift the carry flag into bit 0
		const shifted = <u8>((operand << 1) | flags.C);

		// Set/clear the C, N, and Z flags as needed
		flags.C_assign(operand & 0x80);
		flags.N_assign(shifted & 0x80);
		flags.Z_assign(shifted === 0x00);

		return shifted;
	}

	/**
	 * 16-bit mode implementation of rol
	 *
	 * Rotate the contents of the Carry flag + the value left one bit.
	 */
	function rol_u16(operand: u16) : u16 {
		// Shift one bit to the left and shift the carry flag into bit 0
		const shifted = <u16>((operand << 1) | flags.C);

		// Set/clear the C, N, and Z flags as needed
		flags.C_assign(operand & 0x8000);
		flags.N_assign(shifted & 0x8000);
		flags.Z_assign(shifted === 0x0000);

		return shifted;
	}

	/** Underlying implementation of the rol instruction  */
	function rol(pointer: u32) {
		const bank = <u8>(pointer >> 16);
		const addr = <u16>(pointer & 0xffff);

		if (flags.E || flags.M) {
			const operand = read_u8(bank, addr);
			const shifted = rol_u8(operand);

			write_u8(bank, addr, shifted);
		}

		else {
			const operand = read_u16(bank, addr);
			const shifted = rol_u16(operand);

			write_u16(bank, addr, shifted);

			// Count 2 extra cycles for 16-bit mode
			cpuThread.countCycles(2);
		}
	}
}
