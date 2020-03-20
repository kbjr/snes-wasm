
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import { scheduler } from '../../../scheduler';

export function rep(inst: instruction.Instruction, operand: u8) : bool {
	registers.P &= operand ^ 0xff;

	scheduler.scheduler.cpuThread.countCycles(6);

	return false;
}