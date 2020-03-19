
import { scheduler } from '../../../scheduler';
import { instruction } from '../../instruction';

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function wai(inst: instruction.Instruction) : true {
	scheduler.scheduler.cpuThread.idle = true;

	// Count 3 cycles (18 master cycles) for the instruction
	scheduler.scheduler.cpuThread.countCycles(18);

	return true;
}
