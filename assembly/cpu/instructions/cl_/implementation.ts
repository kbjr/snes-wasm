
import { flags } from '../../flags';
import { scheduler } from '../../../scheduler';
import { instruction } from '../../instruction';

export function clc_(inst: instruction.Instruction) : true {
	flags.C_clear();

	// Count 1 more cycle (6 master cycles) for the instruction
	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function cld_(inst: instruction.Instruction) : true {
	flags.D_clear();

	// Count 1 more cycle (6 master cycles) for the instruction
	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function cli_(inst: instruction.Instruction) : true {
	flags.I_clear();

	// Count 1 more cycle (6 master cycles) for the instruction
	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function clv_(inst: instruction.Instruction) : true {
	flags.V_clear();

	// Count 1 more cycle (6 master cycles) for the instruction
	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}
