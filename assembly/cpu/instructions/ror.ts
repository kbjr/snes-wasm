
import { flags } from '../flags';
import { registers } from '../registers';
import { cpuThread } from '../../scheduler';
import { addr_absolute, addr_directPage, addr_absoluteIndexedX, addr_directPageIndexedX } from '../addressing';
import { read_u8, write_u8, read_u16, write_u16 } from '../../system-bus';

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
		if (flags.E || flags.M) {
			registers.C = ror_u8(registers.A);
		}

		else {
			registers.C = ror_u16(registers.C);
		}

		// Add 2 cycles for the instruction
		cpuThread.countCycles(2);

		return false;
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
		ror(addr_absolute());

		// Count 6 cycles for the instruction
		cpuThread.countCycles(6);

		return false;
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
		ror(addr_directPage());

		// Count 5 cycles for the instruction
		cpuThread.countCycles(5);

		return false;
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
		ror(addr_absoluteIndexedX());

		// Count 7 cycles for the instruction
		cpuThread.countCycles(7);

		return false;
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
		ror(addr_directPageIndexedX());

		// Count 6 cycles for the instruction
		cpuThread.countCycles(6);

		return false;
	}

	/**
	 * 8-bit mode implementation of ror
	 *
	 * Rotates the given value + the Carry flag one bit to the right.
	 */
	function ror_u8(operand: u8) : u8 {
		// Shift one bit to the right and shift bit 0 into the carry flag
		const shifted = (flags.C << 7) | (operand >> 1);

		// Set/clear the C, N, and Z flags as needed
		flags.C_assign(operand & 0x01);
		flags.N_assign(shifted & 0x80);
		flags.Z_assign(shifted === 0x00);

		return shifted;
	}

	/**
	 * 16-bit mode implementation of ror
	 *
	 * Rotates the given value + the Carry flag one bit to the right.
	 */
	function ror_u16(operand: u16) : u16 {
		// Shift one bit to the left and shift the carry flag into bit 0
		const shifted = (flags.C << 15) | (operand >> 1);

		// Set/clear the C, N, and Z flags as needed
		flags.C_assign(operand & 0x0001);
		flags.N_assign(shifted & 0x8000);
		flags.Z_assign(shifted === 0x0000);

		return shifted;
	}

	/** Underlying implementation of the ror instruction  */
	function ror(pointer: u32) {
		const bank = <u8>(pointer >> 16);
		const addr = <u16>(pointer & 0xffff);

		if (flags.E || flags.M) {
			const operand = read_u8(bank, addr);
			const shifted = ror_u8(operand);

			write_u8(bank, addr, shifted);
		}

		else {
			const operand = read_u16(bank, addr);
			const shifted = ror_u16(operand);

			write_u16(bank, addr, shifted);

			// Count 2 extra cycles for 16-bit mode
			cpuThread.countCycles(2);
		}
	}
}
