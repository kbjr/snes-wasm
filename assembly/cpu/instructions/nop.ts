
import { cpuThread } from '../../_scheduler';

/**
 * nop
 * No Operation Instruction
 *
 * Opcode:     0xEA
 * Flags:      ---------
 * Addressing: Implied
 * Bytes:      1
 * Cycles:     2
 *
 *     nop
 *
 * Takes no action at all.
 */
export namespace nop {
	export function $EA() : bool {
		cpuThread.countCycles(2);

		return false;
	}
}
