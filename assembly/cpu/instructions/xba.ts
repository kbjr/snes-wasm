
import { registers } from '../registers';
import { cpuThread } from '../../_scheduler';

/**
 * xba
 * Exchange B and A Accumulators Instruction
 *
 * Opcode:     0xEB
 * Flags:      n-----z--
 * Addressing: Implied
 * Bytes:      1
 * Cycles:     3
 *
 *     xba
 *
 * Swaps the high and low bytes of the Accumulator
 */
export namespace xba {
	export function $EB() : bool {
		const temp = registers.A;

		registers.A = registers.B;
		registers.B = temp;

		// Count 3 cycles for the instruction
		cpuThread.countCycles(3);

		return false;
	}
}
