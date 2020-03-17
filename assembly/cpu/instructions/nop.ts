
import { scheduler } from '../../scheduler';
import { instruction } from '../instruction';

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
	export class Nop extends instruction.Instruction {
		public exec() : bool {
			// Idle for 1 I/O cycle (6 master cycles)
			scheduler.scheduler.cpuThread.countCycles(6);
			
			return true;
		}
	}

	export const $EA = new nop.Nop();
}
