
import { u24 } from '../../../u24';
import { stack } from '../../stack';
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';

export function push_u8_effective(inst: instruction.Instruction, effective: u8) : bool {
	switch (inst.step) {
		case 0:
			stack.push.step0(effective);
			inst.step++;
			return false;
			
		case 1:
			stack.push.step1();
			return true;
		
		// This should never happen
		default: return true;
	}
}

export function push_u16_effective(inst: instruction.Instruction, effective: u32) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
			const high = u24.mid_u8(effective);
	
			stack.push.step0(high);
			inst.step++;
			return false;
			
		case 1:
			stack.push.step1();
			
			const low = u24.low_u8(effective);
			
			stack.push.step0(low);
			inst.step++;
			return false;
		
		case 2:
			stack.push.step1();
			inst.step = instruction.firstStep;		
			return true;
		
		// This should never happen
		default: return true;
	}
}

export function push_acc(inst: instruction.Instruction) : bool {
	const is8Bit = flags.E || flags.M;

	switch (inst.step) {
		case 0:
			if (is8Bit) {
				stack.push.step0(registers.A);
			}

			else {
				stack.push.step0(registers.B);
			}

			inst.step++;
			return false;
		
		case 1:
			stack.push.step1();

			if (is8Bit) {
				return true;
			}

			stack.push.step0(registers.A);
			inst.step++;
			return false;
		
		case 2:
			stack.push.step1();
			return true;
		
		// This should never happen
		default: return true;
	}
}

export function push_dbr(inst: instruction.Instruction) : bool {
	return push_u8_effective(inst, registers.DBR);
}

export function push_dp(inst: instruction.Instruction) : bool {
	return push_u16_effective(inst, registers.D);
}

export function push_pbr(inst: instruction.Instruction) : bool {
	return push_u8_effective(inst, registers.PBR);
}

export function push_p(inst: instruction.Instruction) : bool {
	return push_u8_effective(inst, registers.P);
}

export function push_x(inst: instruction.Instruction) : bool {
	if (flags.E || flags.X) {
		return push_u8_effective(inst, registers.X_low);
	}

	else {
		return push_u16_effective(inst, registers.X);
	}
}

export function push_y(inst: instruction.Instruction) : bool {
	if (flags.E || flags.X) {
		return push_u8_effective(inst, registers.Y_low);
	}

	else {
		return push_u16_effective(inst, registers.Y);
	}
}
