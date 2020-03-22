
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import { scheduler } from '../../../scheduler';

export function tax_(inst: instruction.Instruction) : true {
	if (flags.E || flags.X) {
		set_flags_u8(registers.A);
		registers.X_low = registers.A;
	}

	else {
		set_flags_u16(registers.C);
		registers.X = registers.C;
	}

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function tay_(inst: instruction.Instruction) : true {
	if (flags.E || flags.X) {
		registers.Y_low = registers.A;
		set_flags_u8(registers.A);
	}

	else {
		registers.Y = registers.C;
		set_flags_u16(registers.C);
	}

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function tcd_(inst: instruction.Instruction) : true {
	registers.D = registers.C;
	set_flags_u16(registers.C);
	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function tcs_(inst: instruction.Instruction) : true {
	if (flags.E) {
		registers.S_low = registers.A;
	}

	else {
		registers.S = registers.C;
	}

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function tdc_(inst: instruction.Instruction) : true {
	registers.C = registers.D;
	set_flags_u16(registers.D);
	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function tsc_(inst: instruction.Instruction) : true {
	registers.C = registers.S;
	set_flags_u16(registers.S);
	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function tsx_(inst: instruction.Instruction) : true {
	if (flags.E || flags.X) {
		registers.X_low = registers.S_low;
		set_flags_u8(registers.S_low);
	}

	else {
		registers.X = registers.S;
		set_flags_u16(registers.S);
	}

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function txa_(inst: instruction.Instruction) : true {
	if (flags.E || flags.M) {
		set_flags_u8(registers.X_low);
		registers.A = registers.X_low;
	}

	else {
		set_flags_u16(registers.X);
		registers.C = registers.X;
	}

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function txs_(inst: instruction.Instruction) : true {
	if (flags.E) {
		registers.S_low = registers.X_low;
	}

	else {
		registers.S = registers.X;
	}

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function txy_(inst: instruction.Instruction) : true {
	if (flags.E || flags.X) {
		set_flags_u8(registers.X_low);
		registers.Y_low = registers.X_low;
	}

	else {
		set_flags_u16(registers.X);
		registers.Y = registers.X;
	}

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function tya_(inst: instruction.Instruction) : true {
	if (flags.E || flags.M) {
		set_flags_u8(registers.Y_low);
		registers.A = registers.Y_low;
	}

	else {
		set_flags_u16(registers.Y);
		registers.C = registers.Y;
	}

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function tyx_(inst: instruction.Instruction) : true {
	if (flags.E || flags.X) {
		set_flags_u8(registers.Y_low);
		registers.X_low = registers.Y_low;
	}

	else {
		set_flags_u16(registers.Y);
		registers.X = registers.Y;
	}

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}





// @ts-ignore: decorator
@inline function set_flags_u8(value: u8) : void {
	flags.Z_assign(value === 0x00);
	flags.N_assign(<bool>(value & 0x80));
}

// @ts-ignore: decorator
@inline function set_flags_u16(value: u16) : void {
	flags.Z_assign(value === 0x0000);
	flags.N_assign(<bool>(value & 0x8000));
}
