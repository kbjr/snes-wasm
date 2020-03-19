
import { u16_util } from '../../../u16';
import { stack } from '../../stack';
import { flags, Flag } from '../../flags';
import { registers } from '../../registers';
import { scheduler } from '../../../scheduler';
import { interrupt } from '../../../constants';

export function brk() : bool {
	if (flags.E) {
		brk_6502();
	}

	else {
		brk_65816();
	}

	return false;
}

// @ts-ignore: decorator
@inline function brk_6502() {
	registers.PC++;

	stack.push(registers.PBR);
	stack.push(u16_util.high(registers.PC));
	stack.push(u16_util.low(registers.PC));
	stack.push(registers.P | Flag.B);

	flags.D_clear();
	flags.I_set();

	registers.PBR = 0;

	// Raise the interrupt
	scheduler.scheduler.interrupt(interrupt.brk);

	// Count 3 more I/O cycles (18 master cycles) for the instruction in Emulation mode
	scheduler.scheduler.cpuThread.countCycles(18);
}

// @ts-ignore: decorator
@inline function brk_65816() {
	registers.PC++;

	stack.push(registers.PBR);
	stack.push(u16_util.high(registers.PC));
	stack.push(u16_util.low(registers.PC));
	stack.push(registers.P);

	flags.D_clear();
	flags.I_set();

	registers.PBR = 0;

	// Raise the interrupt
	scheduler.scheduler.interrupt(interrupt.brk);

	// Count 4 more I/O cycles (24 master cycles) for the instruction in Native mode
	scheduler.scheduler.cpuThread.countCycles(24);
}
