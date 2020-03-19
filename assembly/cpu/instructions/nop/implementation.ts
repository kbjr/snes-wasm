
import { scheduler } from '../../../scheduler';
import { instruction } from '../../instruction';

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
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function nop(inst: instruction.Instruction) : true {
	// Idle for 1 I/O cycle (6 master cycles)
	scheduler.scheduler.cpuThread.countCycles(6);
	
	return true;
}
