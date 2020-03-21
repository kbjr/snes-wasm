
import { flags } from '../../flags';
import { scheduler } from '../../../scheduler';
import { instruction } from '../../instruction';
import { registers } from '../../registers';

export function sec_(inst: instruction.Instruction) : true {
	flags.C_set();

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function sed_(inst: instruction.Instruction) : true {
	flags.D_set();

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function sei_(inst: instruction.Instruction) : true {
	flags.I_set();

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function sep_(inst: instruction.Instruction, operand: u8) : true {
	registers.P |= operand;

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}
