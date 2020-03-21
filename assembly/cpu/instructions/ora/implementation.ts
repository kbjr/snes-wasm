
import { bus } from '../../../bus';
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';

let buffer: u8 = 0;
let is8Bit: bool = false;

/** Given a fully resolved effective address, performs the ora instruction */
export function ora(inst: instruction.Instruction, effective: u32) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
			// Check what mode we're running in (8-bit or 16-bit)
			is8Bit = flags.E || flags.M;

			// Prepare to read the first byte from the effective address
			bus.read.setup(effective);
			
			return false;
		
		case 1:
			// If we're in 8-bit mode, we just want the one byte, so we can finish up
			if (is8Bit) {
				return ora_u8(inst, bus.read.fetch());
			}

			// Otherwise, grab our one byte, and prepare to grab second
			else {
				buffer = bus.read.fetch();

				bus.read.setup(effective + 1);

				return false;
			}
		
		case 2:
			// If we're here on step 2, that can only mean we're in 16-bit mode.
			// Read the next byte from the effective address to construct our operand
			let operand = <u16>bus.read.fetch() << 8;

			// Add on the byte we read last time to get the full u16
			operand |= buffer;

			return ora_u16(inst, operand);
		
		// This should never happen
		default:
			return true;
	}
}

// @ts-ignore: decorator
@inline export function ora_u8(inst: instruction.Instruction, operand: u8) : true {
	registers.A |= operand;

	return true;
}

// @ts-ignore: decorator
@inline export function ora_u16(inst: instruction.Instruction, operand: u16) : true {
	registers.C |= operand;

	return true;
}
