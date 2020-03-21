
import { registers } from '../../registers';
import { scheduler } from '../../../scheduler';
import { instruction } from '../../instruction';

export function wdm(inst: instruction.Instruction) : true {
	// Move the PC forward one as this is treated as a two-byte "opcode"
	registers.PC++;

	// Idle for 2 I/O cycles (12 master cycles)
	scheduler.scheduler.cpuThread.countCycles(12);
	
	return true;
}
