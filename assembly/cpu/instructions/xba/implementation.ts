
import { scheduler } from '../../../scheduler';
import { instruction } from '../../instruction';
import { registers } from '../../registers';

export function xba(inst: instruction.Instruction) : true {
	const temp = registers.A;

	registers.A = registers.B;
	registers.B = temp;

	// Count 3 cycles (18 master cycles) for the instruction
	scheduler.scheduler.cpuThread.countCycles(18);

	return true;
}
