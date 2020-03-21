
import { instruction } from '../../instruction';
import { flags } from '../../flags';
import { registers } from '../../registers';
import { bus } from '../../../bus';

export function cpx_(inst: instruction.Instruction, effective: u32) : bool {
	return cp__(inst, effective, cpx_u8, cpx_u16);
}

export function cpx_u8(inst: instruction.Instruction, operand: u8) : true {
	return cp__u8(registers.X_low - operand);
}

export function cpx_u16(inst: instruction.Instruction, operand: u16) : true {
	return cp__u16(registers.X - operand);
}

export function cpy_(inst: instruction.Instruction, effective: u32) : bool {
	return cp__(inst, effective, cpy_u8, cpy_u16);
}

export function cpy_u8(inst: instruction.Instruction, operand: u8) : true {
	return cp__u8(registers.Y_low - operand);
}

export function cpy_u16(inst: instruction.Instruction, operand: u16) : true {
	return cp__u16(registers.Y - operand);
}

let buffer: u8 = 0;
let is8Bit: bool = false;

// @ts-ignore: decorator
@inline function cp__(inst: instruction.Instruction, effective: u32, u8_op: instruction.callback.u8_op, u16_op: instruction.callback.u16_op) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
			// Check what mode we're running in (8-bit or 16-bit)
			is8Bit = flags.E || flags.M;

			// Prepare to read the first byte from the effective address
			bus.read.setup(effective);
			
			inst.step++;
			return false;
		
		case 1:
			// If we're in 8-bit mode, we just want the one byte, so we can finish up
			if (is8Bit) {
				return u8_op(inst, bus.read.fetch());
			}

			// Otherwise, grab our one byte, and prepare to grab second
			else {
				buffer = bus.read.fetch();

				bus.read.setup(effective + 1);

				inst.step++;
				return false;
			}
		
		case 2:
			// If we're here on step 2, that can only mean we're in 16-bit mode.
			// Read the next byte from the effective address to construct our operand
			let operand = <u16>bus.read.fetch() << 8;

			// Add on the byte we read last time to get the full u16
			operand |= buffer;

			return u16_op(inst, operand);
		
		// This should never happen
		default:
			return true;
	}
}

// @ts-ignore: decorator
@inline function cp__u8(result: u16) : true {
	// Set/clear the Negative (N) flag depending on if the high bit is set
	flags.N_assign(<bool>(result & 0x80));

	// Set/clear the Zero (Z) flag depending on if the value is zero
	flags.Z_assign((result & 0xff) === 0x00);

	// Set/clear the Carry (C) flag depending on if an unsigned overflow occured
	flags.C_assign(result > 0xff);

	return true;
}

// @ts-ignore: decorator
@inline function cp__u16(result: u32) : true {
	// Set/clear the Negative (N) flag depending on if the high bit is set
	flags.N_assign(<bool>(result & 0x8000));

	// Set/clear the Zero (Z) flag depending on if the value is zero
	flags.Z_assign((result & 0xffff) === 0x0000);

	// Set/clear the Carry (C) flag depending on if an unsigned overflow occured
	flags.C_assign(result > 0xffff);

	return true;
}
