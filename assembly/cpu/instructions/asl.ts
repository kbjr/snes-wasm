
import { exec } from '../utils';
import { flags } from '../flags';
import { registers } from '../registers';
import { cpuThread } from '../../_scheduler';
import { u24_high_u8, u24_low_u16 } from '../../types/u24';
import { read_u8, write_u8, read_u16, write_u16 } from '../../system-bus';
import { addr_directPage, addr_absolute, addr_directPageIndexedX, addr_absoluteIndexedX } from '../addressing';

/**
 * #### Shift Memory or Accumulator Left Instruction (`asl`)
 *
 * Shift the memory or accumulator reference by the operand left 1 bit. In 8-bit mode (M = 1)
 * or Emulation mode (E = 1), the data shifted is 1 byte. Otherwise, the data is 16-bit.
 * 
 *     | OpCode | Syntax     | Addressing                  | Flags     | Bytes | Cycle      |
 *     |--------|------------|-----------------------------|-----------|-------|------------|
 *     | 0x06   | asl dp     | Direct Page                 | N-----ZC- | 2     | 5 [1],[2]  |
 *     | 0x0A   | asl A      | Accumulator                 | N-----ZC- | 1     | 2 [1]      |
 *     | 0x0E   | asl addr   | Absolute                    | N-----ZC- | 3     | 6 [1]      |
 *     | 0x16   | asl dp,X   | DP Indexed, X               | N-----ZC- | 2     | 6 [1],[2]  |
 *     | 0x1E   | asl addr,X | Absolute Indexed, X         | N-----ZC- | 3     | 4 [1]      |
 *
 * [1]: Add 2 cycle if m = 0 (16-bit memory/accumulator)
 * [2]: Add 1 cycle if low byte of Direct Page register is not zero
 */
export namespace asl {
	/** 0x06 - Direct Page */
	export function $06() : bool {
		return exec(asl, addr_directPage, 5);
	}

	/** 0x0A - Accumulator */
	export function $0A() : bool {
		if (flags.E || flags.M) {
			registers.A = asl_u8(registers.A);
		}

		else {
			registers.C = asl_u16(registers.C);
		}

		// Count 2 cycles for the instruction
		cpuThread.countCycles(2);

		return false;
	}

	/** 0x0E - Absolute */
	export function $0E() : bool {
		return exec(asl, addr_absolute, 6);
	}

	/** 0x16 - DP Indexed, X */
	export function $16() : bool {
		return exec(asl, addr_directPageIndexedX, 6);
	}

	/** 0x1E - Absolute Indexed, X */
	export function $1E() : bool {
		return exec(asl, addr_absoluteIndexedX, 4);
	}





	// ===== Actual Implementation

	function asl(pointer: u32) : void {
		const bank = u24_high_u8(pointer);
		const addr = u24_low_u16(pointer);

		if (flags.E || flags.M) {
			const value = read_u8(bank, addr);
			const result = asl_u8(value);

			write_u8(bank, addr, result);
		}

		else {
			const value = read_u16(bank, addr);
			const result = asl_u16(value);

			write_u16(bank, addr, result);
		}
	}

	// @ts-ignore: decorator
	@inline function asl_u8(value: u8) : u8 {
		const shifted = <u16>value << 1;
		const result = <u8>(shifted & 0xff);

		flags.C_assign(shifted & 0x100);
		flags.Z_assign(result === 0x00);
		flags.N_assign(result & 0x80);

		return result;
	}

	// @ts-ignore: decorator
	@inline function asl_u16(value: u16) : u16 {
		const shifted = <u32>value << 1;
		const result = <u16>(shifted & 0xffff);

		flags.C_assign(shifted & 0x10000);
		flags.Z_assign(result === 0x0000);
		flags.N_assign(result & 0x8000);
		
		// Count 2 extra cycles for 16-bit mode
		cpuThread.countCycles(2);

		return result;
	}

}
