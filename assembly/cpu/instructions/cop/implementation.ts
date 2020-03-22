
import { u24 } from '../../../u24';
import { u16_util } from '../../../u16';
import { bus } from '../../../bus';
import { stack } from '../../stack';
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';

const cop_vector_emu: u24.native = 0x00fff4;

const cop_vector_native: u24.native = 0x00ffe4;

let buffer: u8 = 0;

export function cop(inst: instruction.Instruction, operand: u8) : bool {
	if (flags.E) {
		return cop_6502(inst, operand);
	}

	else {
		return cop_65816(inst, operand);
	}
}

// @ts-ignore: decorator
@inline function cop_6502(inst: instruction.Instruction, operand: u8) : bool {
	switch (inst.step - instruction.firstStep) {
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
			stack.push.step0(registers.P);
			inst.step++;
			return false;
		
		case 3:
			stack.push.step1();
			flags.I_set();
			bus.read.setup(cop_vector_emu);
			inst.step++;
			return false;
		
		case 4:
			buffer = bus.read.fetch();
			bus.read.setup(cop_vector_emu + 1);
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
@inline function cop_65816(inst: instruction.Instruction, operand: u8) : bool {
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
			bus.read.setup(cop_vector_native);
			inst.step++;
			return false;
		
		case 5:
			buffer = bus.read.fetch();
			bus.read.setup(cop_vector_native + 1);
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
