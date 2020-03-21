
import { scheduler } from '../../../scheduler';
import { instruction } from '../../instruction';

export function nop(inst: instruction.Instruction) : true {
	// Idle for 1 I/O cycle (6 master cycles)
	scheduler.scheduler.cpuThread.countCycles(6);
	
	return true;
}
