
import { u24 } from '../../../u24';
import { u16_util } from '../../../u16';
import { bus } from '../../../bus';
import { stack } from '../../stack';
import { flags, flag } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';

const brk_vector_emu: u24.native = 0x00fffe;

const brk_vector_native: u24.native = 0x00ffe6;

let buffer: u8 = 0;

export function brk(inst: instruction.Instruction) : bool {
	if (flags.E) {
		return brk_6502(inst);
	}

	else {
		return brk_65816(inst);
	}
}

// @ts-ignore: decorator
@inline function brk_6502(inst: instruction.Instruction) : bool {
	switch (inst.step) {
		case 0:
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
			stack.push.step0(registers.P | flag.B);
			inst.step++;
			return false;
		
		case 3:
			stack.push.step1();
			flags.I_set();
			bus.read.setup(brk_vector_emu);
			inst.step++;
			return false;
		
		case 4:
			buffer = bus.read.fetch();
			bus.read.setup(brk_vector_emu + 1);
			inst.step++;
			return false;
		
		case 5:
			registers.PC = u16_util.from_u8(buffer, bus.read.fetch());
			flags.D_clear();
			return true;
		
		// This should never happen
		default: return true;
	}
}

// @ts-ignore: decorator
@inline function brk_65816(inst: instruction.Instruction) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
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
			stack.push.step0(registers.P);
			inst.step++;
			return false;
		
		case 4:
			stack.push.step1();
			flags.I_set();
			bus.read.setup(brk_vector_native);
			inst.step++;
			return false;
		
		case 5:
			buffer = bus.read.fetch();
			bus.read.setup(brk_vector_native + 1);
			inst.step++;
			return false;
		
		case 6:
			registers.PBR = 0;
			registers.PC = u16_util.from_u8(buffer, bus.read.fetch());
			flags.D_clear();
			return true;
		
		// This should never happen
		default: return true;
	}
}
