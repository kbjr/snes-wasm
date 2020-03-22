
import { scheduler } from '../../../scheduler';
import { instruction } from '../../instruction';
import { status } from '../../thread';

export function wai(inst: instruction.Instruction) : true {
	scheduler.scheduler.cpuThread.idle = true;
	status.current = status.waiting;

	// Count 3 cycles (18 master cycles) for the instruction
	scheduler.scheduler.cpuThread.countCycles(18);

	return true;
}
