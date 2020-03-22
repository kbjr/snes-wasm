
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import { bus } from '../../../bus';

let buffer: u8 = 0;
let is8Bit: bool = false;

export function cmp(inst: instruction.Instruction, effective: u32) : bool {
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
				return cmp_u8(inst, bus.read.fetch());
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

			return cmp_u16(inst, operand);
		
		// This should never happen
		default:
			return true;
	}
}

export function cmp_u8(inst: instruction.Instruction, operand: u8) : true {
	const result: u16 = registers.A - operand;

	// Set/clear the Negative (N) flag depending on if the high bit is set
	flags.N_assign(<bool>(result & 0x80));

	// Set/clear the Zero (Z) flag depending on if the value is zero
	flags.Z_assign((result & 0xff) === 0x00);

	// Set/clear the Carry (C) flag depending on if an unsigned overflow occured
	flags.C_assign(result > 0xff);

	return true;
}

export function cmp_u16(inst: instruction.Instruction, operand: u16) : true {
	const result: u32 = registers.C - operand;

	// Set/clear the Negative (N) flag depending on if the high bit is set
	flags.N_assign(<bool>(result & 0x8000));

	// Set/clear the Zero (Z) flag depending on if the value is zero
	flags.Z_assign((result & 0xffff) === 0x0000);

	// Set/clear the Carry (C) flag depending on if an unsigned overflow occured
	flags.C_assign(result > 0xffff);

	return true;
}
