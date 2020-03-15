
import { flags } from '../flags';
import { cpuThread } from '../../_scheduler';

/**
 * clc
 * Clear Carry Instruction
 *
 * Opcode:     0x18
 * Flags:      -------c-
 * Addressing: Implied
 * Bytes:      1
 * Cycles:     2
 *
 *     clc
 *
 * Clears the carry bit of the Processor Status (P) Register, setting it to 0
 */
export namespace clc {
	export function $18() : bool {
		flags.C_clear();

		// Count 2 cycles for the instruction
		cpuThread.countCycles(2);

		return false;
	}

}

/**
 * cld
 * Clear Decimal Instruction
 *
 * Opcode:     0xD8
 * Flags:      ----d----
 * Addressing: Implied
 * Bytes:      1
 * Cycles:     2
 *
 *     cld
 *
 * Clears the decimal bit of the Processor Status (P) Register, setting it to 0
 */
export namespace cld {
	export function $D8() : bool {
		flags.D_clear();

		// Count 2 cycles for the instruction
		cpuThread.countCycles(2);

		return false;
	}
}

export namespace cli {
	export function $58() : bool {
		// TODO: cli

		return false;
	}
}

export namespace clv {
	export function $B8() : bool {
		// TODO: clv

		return false;
	}
}