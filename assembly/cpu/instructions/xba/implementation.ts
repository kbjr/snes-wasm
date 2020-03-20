
import { scheduler } from '../../../scheduler';
import { instruction } from '../../instruction';
import { registers } from '../../registers';

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function xba(inst: instruction.Instruction) : true {
	const temp = registers.A;

	registers.A = registers.B;
	registers.B = temp;

	// Count 3 cycles (18 master cycles) for the instruction
	scheduler.scheduler.cpuThread.countCycles(18);

	return true;
}
