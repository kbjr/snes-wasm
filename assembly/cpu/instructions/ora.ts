
import { flags } from '../flags';
import { registers } from '../registers';
import { cpuThread } from '../../scheduler';
import { read_u8, read_u16 } from '../../system-bus';
import { u24_high_u8, u24_low_u16 } from '../../types/u24';
import { addr_directPageIndexedIndirectX, addr_stackRelative, addr_directPage, addr_directPageIndirectLong, addr_immediate_u8, addr_immediate_u16, addr_absolute, addr_absoluteLong, addr_directPageIndexedY, addr_directPageIndirect, addr_stackRelativeIndirectIndexedY, addr_directPageIndexedX, addr_directPageIndirectLongIndexedY, addr_absoluteIndexedY, addr_absoluteIndexedX, addr_absoluteLongIndexedX } from '../addressing';

/**
 * #### OR Accumulator with Memory Instruction (`ora`)
 *
 * Perform a bitwise logical OR of the contents at the effective address against the
 * Accumulator. In 8-bit mode (M = 1) or Emulation mode (E = 1), the data from the
 * effective address is 1 byte, and it is OR'ed against the low byte of the Accumulator (A).
 * Otherwise, both the data and Accumulator are 16-bit.
 * 
 *     | OpCode | Syntax       | Addressing                  | Flags     | Bytes | Cycles        |
 *     |--------|--------------|-----------------------------|-----------|-------|---------------|
 *     | 0x01   | ora (dp,X)   | DP Indexed Indirect, X      | N-----Z-- | 2     | 6 [2],[3]     |
 *     | 0x03   | ora sr,S     | Stack Relative              | N-----Z-- | 2     | 4 [2]         |
 *     | 0x05   | ora dp       | Direct Page                 | N-----Z-- | 2     | 3 [2],[3]     |
 *     | 0x07   | ora [dp]     | DP Indirect Long            | N-----Z-- | 2     | 6 [2],[3]     |
 *     | 0x09   | ora #const   | Immediate                   | N-----Z-- | 2 [1] | 2 [2]         |
 *     | 0x0D   | ora addr     | Absolute                    | N-----Z-- | 3     | 4 [2]         |
 *     | 0x0F   | ora long     | Absolute Long               | N-----Z-- | 4     | 5 [2]         |
 *     | 0x11   | ora (dp),Y   | DP Indirect Indexed, Y      | N-----Z-- | 2     | 5 [2],[3],[4] |
 *     | 0x12   | ora (dp)     | DP Indirect                 | N-----Z-- | 2     | 5 [2],[3]     |
 *     | 0x13   | ora (sr,S),Y | SR Indirect Indexed, Y      | N-----Z-- | 2     | 7 [2]         |
 *     | 0x15   | ora dp,X     | DP Indexed, X               | N-----Z-- | 2     | 4 [2],[3]     |
 *     | 0x17   | ora [dp],Y   | DP Indirect Long Indexed, Y | N-----Z-- | 2     | 6 [2],[3]     |
 *     | 0x19   | ora addr,Y   | Absolute Indexed, Y         | N-----Z-- | 3     | 4 [2],[4]     |
 *     | 0x1D   | ora addr,X   | Absolute Indexed, X         | N-----Z-- | 3     | 4 [2],[4]     |
 *     | 0x1F   | ora long,X   | Absolute Long Indexed, X    | N-----Z-- | 4     | 5 [2]         |
 *
 * [1]: Add 1 byte if m = 0 (16-bit memory/accumulator)
 * [2]: Add 1 cycle if m = 0 (16-bit memory/accumulator)
 * [3]: Add 1 cycle if low byte of Direct Page register is not zero
 * [4]: Add 1 cycle if adding index crosses a page boundary
 * 
 * TODO: Implement [4]
 */
export namespace ora {
	/** 0x01 - DP Indexed Indirect, X */
	export function $01() : bool {
		const pointer = addr_directPageIndexedIndirectX();

		ora(pointer);

		// Count 6 cycles for the instruction
		cpuThread.countCycles(6);

		return false;
	}

	/** 0x03 - Stack Relative */
	export function $03() : bool {
		const pointer = addr_stackRelative();

		ora(pointer);

		// Count 4 cycles for the instruction
		cpuThread.countCycles(4);

		return false;
	}

	/** 0x05 - Direct Page */
	export function $05() : bool {
		const pointer = addr_directPage();

		ora(pointer);

		// Count 4 cycles for the instruction
		cpuThread.countCycles(3);

		return false;
	}

	/** 0x07 - DP Indirect Long */
	export function $07() : bool {
		const pointer = addr_directPageIndirectLong();

		ora(pointer);

		// Count 6 cycles for the instruction
		cpuThread.countCycles(6);

		return false;
	}

	/** 0x09 - Immediate */
	export function $09() : bool {
		if (flags.E || flags.M) {
			ora_u8(addr_immediate_u8());
		}
		
		else {
			ora_u16(addr_immediate_u16());
		}
		
		// Count 2 cycles for the instruction
		cpuThread.countCycles(2);

		return false;
	}

	/** 0x0D - Absolute */
	export function $0D() : bool {
		const pointer = addr_absolute();

		ora(pointer);

		cpuThread.countCycles(4);

		return false;
	}

	/** 0x0F - Absolute Long */
	export function $0F() : bool {
		const pointer = addr_absoluteLong();

		ora(pointer);

		// Count 5 cycles for the instruction
		cpuThread.countCycles(5);

		return false;
	}

	/** 0x11 - DP Indirect Indexed, Y */
	export function $11() : bool {
		const pointer = addr_directPageIndexedY();

		ora(pointer);

		// Count 5 cycles for the instruction
		cpuThread.countCycles(5);

		return false;
	}

	/** 0x12 - DP Indirect */
	export function $12() : bool {
		const pointer = addr_directPageIndirect();

		ora(pointer);

		// Count 5 cycles for the instruction
		cpuThread.countCycles(5);

		return false;
	}

	/** 0x13 - SR Indirect Indexed, Y */
	export function $13() : bool {
		const pointer = addr_stackRelativeIndirectIndexedY();

		ora(pointer);

		// Count 7 cycles for the instruction
		cpuThread.countCycles(7);

		return false;
	}

	/** 0x15 - DP Indexed, X */
	export function $15() : bool {
		const pointer = addr_directPageIndexedX();;

		ora(pointer);

		// Count 4 cycles for the instruction
		cpuThread.countCycles(4);

		return false;
	}

	/** 0x17 - DP Indirect Long Indexed, Y */
	export function $17() : bool {
		const pointer = addr_directPageIndirectLongIndexedY();

		ora(pointer);

		// Count 6 cycles for the instruction
		cpuThread.countCycles(6);

		return false;
	}

	/** 0x19 - Absolute Indexed, Y */
	export function $19() : bool {
		const pointer = addr_absoluteIndexedY();

		ora(pointer);

		// Count 4 cycles for the instruction
		cpuThread.countCycles(4);

		return false;
	}

	/** 0x1D - Absolute Indexed, X */
	export function $1D() : bool {
		const pointer = addr_absoluteIndexedX();

		ora(pointer);

		// Count 4 cycles for the instruction
		cpuThread.countCycles(4);

		return false;
	}

	/** 0x1F - Absolute Long Indexed, X */
	export function $1F() : bool {
		const pointer = addr_absoluteLongIndexedX();

		ora(pointer);

		// Count 5 cycles for the instruction
		cpuThread.countCycles(5);

		return false;
	}





	// ===== Actual Implementation =====

	function ora(pointer: u32) : void {
		const bank = u24_high_u8(pointer);
		const addr = u24_low_u16(pointer);

		if (flags.E || flags.M) {
			ora_u8(read_u8(bank, addr));
		}

		else {
			ora_u16(read_u16(bank, addr));
		}
	}

	// @ts-ignore: decorator
	@inline function ora_u8(operand: u8) : void {
		registers.A |= operand;
	}

	// @ts-ignore: decorator
	@inline function ora_u16(operand: u16) : void {
		registers.C |= operand;

		// Count 1 extra cycle for 16-bit mode
		cpuThread.countCycles(1);
	}
}
