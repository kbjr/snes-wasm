
import { u16_util } from '../../../u16';
import { stack } from '../../stack';
import { flags, flag } from '../../flags';
import { registers } from '../../registers';
import { scheduler } from '../../../scheduler';
import { interrupt } from '../../../constants';
import { instruction } from '../../instruction';

export function brk(inst: instruction.Instruction) : bool {
	if (flags.E) {
		return brk_6502(inst.step - instruction.firstStep);
	}

	else {
		return brk_65816(inst.step - instruction.firstStep);
	}
}

// @ts-ignore: decorator
@inline function brk_6502(step: u8) : bool {
	switch (step) {
		case 0:
			registers.PC++;
			stack.push.step0(registers.PBR);
			return false;

		case 1:
			stack.push.step1();
			stack.push.step0(u16_util.high(registers.PC));
			return false;

		case 2:
			stack.push.step1();
			stack.push.step0(u16_util.low(registers.PC));
			return false;
		
		case 3:
			stack.push.step1();
			stack.push.step0(registers.P | flag.B);
			return false;
		
		case 4:
			stack.push.step1();

			flags.D_clear();
			flags.I_set();

			registers.PBR = 0;

			// Raise the interrupt
			scheduler.scheduler.interrupt(interrupt.brk);
		
			// Count 3 more I/O cycles (18 master cycles) for the instruction in Emulation mode
			scheduler.scheduler.cpuThread.countCycles(18);

			return true;
		
		// This should never happen
		default: return true;
	}
}

// @ts-ignore: decorator
@inline function brk_65816(step: u8) : bool {
	switch (step) {
		case 0:
			registers.PC++;
			stack.push.step0(registers.PBR);
			return false;

		case 1:
			stack.push.step1();
			stack.push.step0(u16_util.high(registers.PC));
			return false;

		case 2:
			stack.push.step1();
			stack.push.step0(u16_util.low(registers.PC));
			return false;
		
		case 3:
			stack.push.step1();
			stack.push.step0(registers.P);
			return false;
		
		case 4:
			stack.push.step1();

			flags.D_clear();
			flags.I_set();

			registers.PBR = 0;

			// Raise the interrupt
			scheduler.scheduler.interrupt(interrupt.brk);
		
			// Count 4 more I/O cycles (24 master cycles) for the instruction in Native mode
			scheduler.scheduler.cpuThread.countCycles(24);

			return true;
		
		// This should never happen
		default: return true;
	}
}
