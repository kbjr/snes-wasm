
import { stack } from '../../stack';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import { u16_util } from '../../../u16';
import { scheduler } from '../../../scheduler';

export function jsr(inst: instruction.Instruction, effective: u32) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
			registers.PC--;

			stack.push.step0(u16_util.high(registers.PC));

			inst.step++;
			return false;
		
		case 1:
			stack.push.step1();
			stack.push.step0(u16_util.low(registers.PC));

			inst.step++;
			return false;
		
		case 2:
			stack.push.step1();
			registers.PC = <u16>(effective & 0xffff);
			scheduler.scheduler.cpuThread.countCycles(6);
			return true;
		
		// This should never happen
		default: return true;
	}
}

export function jsl(inst: instruction.Instruction, effective: u32) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
			registers.PC--;

			stack.push.step0(registers.PBR);

			inst.step++;
			return false;
		
		case 1:
			stack.push.step1();
			stack.push.step0(u16_util.high(registers.PC));

			inst.step++;
			return false;
		
		case 2:
			stack.push.step1();
			stack.push.step0(u16_util.low(registers.PC));

			inst.step++;
			return false;
		
		case 3:
			stack.push.step1();
			registers.PC = <u16>(effective & 0xffff);
			scheduler.scheduler.cpuThread.countCycles(6);
			return true;
		
		// This should never happen
		default: return true;
	}
}
