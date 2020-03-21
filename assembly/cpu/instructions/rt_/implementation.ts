
import { stack } from '../../stack';
import { instruction } from '../../instruction';
import { registers } from '../../registers';
import { flags } from '../../flags';
import { scheduler } from '../../../scheduler';
import { u16_util } from '../../../u16';

let buffer: u8 = 0;

// TODO: Is this correct? The docs seem contradictary about the order of the bytes
export function rti_(inst: instruction.Instruction) : bool {
	switch (inst.step) {
		case 0:
			return setup_stack_pull(inst);
		
		case 1:
			buffer = stack.pull.step1();
			return setup_stack_pull(inst);
		
		case 2:
			registers.PC = u16_util.from_u8(buffer, stack.pull.step1());
			return setup_stack_pull(inst);
		
		case 3:
			// In emulation mode, we don't pull a bank, so the status register is all that's left
			if (flags.E) {
				registers.P = stack.pull.step1();
				scheduler.scheduler.cpuThread.countCycles(12);
				return true;
			}

			// Otherwise, this byte is the Program Bank Register
			registers.PBR = stack.pull.step1();
			return setup_stack_pull(inst);

		case 4:
			registers.P = stack.pull.step1();
			scheduler.scheduler.cpuThread.countCycles(12);
			return true;

		// This should never happen
		default: return true;
	}
}

export function rtl_(inst: instruction.Instruction) : bool {
	switch (inst.step) {
		case 0:
			return setup_stack_pull(inst);
		
		case 1:
			buffer = stack.pull.step1();
			return setup_stack_pull(inst);
		
		case 2:
			registers.PC = u16_util.from_u8(buffer, stack.pull.step1()) + 1;
			return setup_stack_pull(inst);
		
		case 3:
			registers.PBR = stack.pull.step1();
			scheduler.scheduler.cpuThread.countCycles(12);
			return true;

		// This should never happen
		default: return true;
	}
}

export function rts_(inst: instruction.Instruction) : bool {
	switch (inst.step) {
		case 0:
			return setup_stack_pull(inst);
		
		case 1:
			buffer = stack.pull.step1();
			return setup_stack_pull(inst);
		
		case 2:
			registers.PC = u16_util.from_u8(buffer, stack.pull.step1()) + 1;
			scheduler.scheduler.cpuThread.countCycles(18);
			return true;

		// This should never happen
		default: return true;
	}
}

// @ts-ignore: decorator
@inline function setup_stack_pull(inst: instruction.Instruction) : false {
	stack.pull.step0();
	inst.step++;
	return false;
}
