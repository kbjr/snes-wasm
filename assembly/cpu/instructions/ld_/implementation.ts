
import { bus } from '../../../bus';
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import { u16_util } from '../../../u16';

let buffer: u8 = 0;
let is8Bit: bool = false;

export function ldx_(inst: instruction.Instruction, effective: u32) : bool {
	return ld__(inst, effective, ldx_u8, ldx_u16);
}

export function ldy_(inst: instruction.Instruction, effective: u32) : bool {
	return ld__(inst, effective, ldy_u8, ldy_u16);
}

// @ts-ignore: decorator
@inline function ld__(inst: instruction.Instruction, effective: u32, u8_op: instruction.callback.u8_op, u16_op: instruction.callback.u16_op) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
			// Check what mode we're running in (8-bit or 16-bit)
			is8Bit = flags.E || flags.X;

			// Prepare to read the first byte from the effective address
			bus.read.setup(effective);

			inst.step++;
			return false;
		
		case 1:
			// If we're in 8-bit mode, we just want the one byte
			if (is8Bit) {
				return u8_op(inst, bus.read.fetch());
			}

			// Otherwise, grab our one byte, and prepare to grab second
			buffer = bus.read.fetch();
			bus.read.setup(effective + 1);

			inst.step++;
			return false;
		
		case 2:
			// If we're here on step 2, that can only mean we're in 16-bit mode.
			// Read the next byte from the effective address to construct our operand
			const operand = u16_util.from_u8(buffer, bus.read.fetch());

			u16_op(inst, operand);
			return true;
		
		// This should never happen
		default:
			return true;
	}
}

export function ldx_u8(inst: instruction.Instruction, operand: u8) : true {
	registers.X_low = operand;
	flags.N_assign(<bool>(operand & 0x80));
	flags.Z_assign(operand === 0x00);

	return true;
}

export function ldx_u16(inst: instruction.Instruction, operand: u16) : true {
	registers.X = operand;
	flags.N_assign(<bool>(operand & 0x8000));
	flags.Z_assign(operand === 0x0000);

	return true;
}

export function ldy_u8(inst: instruction.Instruction, operand: u8) : true {
	registers.Y_low = operand;
	flags.N_assign(<bool>(operand & 0x80));
	flags.Z_assign(operand === 0x00);

	return true;
}

export function ldy_u16(inst: instruction.Instruction, operand: u16) : true {
	registers.Y = operand;
	flags.N_assign(<bool>(operand & 0x8000));
	flags.Z_assign(operand === 0x0000);

	return true;
}
