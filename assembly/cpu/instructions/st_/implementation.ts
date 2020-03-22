
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import { bus } from '../../../bus';

let is8Bit: bool = false;

export function stx_(inst: instruction.Instruction, effective: u32) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
			// Check what mode we're running in (8-bit or 16-bit)
			is8Bit = flags.E || flags.X;

			// First, write the low byte of the accumulator
			bus.write.setup(effective, registers.X_low);
			inst.step++;
			return false;
		
		case 1:
			bus.write.exec();

			// If we're in 8-bit mode, we just want the one byte, so we're done
			if (is8Bit) {
				return true;
			}

			// Otherwise, write the high byte
			bus.write.setup(effective + 1, <u8>(registers.X >>> 8));
			inst.step++;
			return false;
		
		case 2:
			bus.write.exec();
			return true;
		
		// This should never happen
		default:
			return true;
	}
}

export function sty_(inst: instruction.Instruction, effective: u32) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
			// Check what mode we're running in (8-bit or 16-bit)
			is8Bit = flags.E || flags.X;

			// First, write the low byte of the accumulator
			bus.write.setup(effective, registers.Y_low);
			inst.step++;
			return false;
		
		case 1:
			bus.write.exec();

			// If we're in 8-bit mode, we just want the one byte, so we're done
			if (is8Bit) {
				return true;
			}

			// Otherwise, write the high byte
			bus.write.setup(effective + 1, <u8>(registers.Y >>> 8));
			inst.step++;
			return false;
		
		case 2:
			bus.write.exec();
			return true;
		
		// This should never happen
		default:
			return true;
	}
}

export function stz_(inst: instruction.Instruction, effective: u32) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
			// Check what mode we're running in (8-bit or 16-bit)
			is8Bit = flags.E || flags.M;

			// First, write the low byte of the accumulator
			bus.write.setup(effective, 0x00);
			inst.step++;
			return false;
		
		case 1:
			bus.write.exec();

			// If we're in 8-bit mode, we just want the one byte, so we're done
			if (is8Bit) {
				return true;
			}

			// Otherwise, write the high byte
			bus.write.setup(effective + 1, 0x00);
			inst.step++;
			return false;
		
		case 2:
			bus.write.exec();
			return true;
		
		// This should never happen
		default:
			return true;
	}
}
