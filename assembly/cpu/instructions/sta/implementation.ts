
import { bus } from '../../../bus';
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';

let is8Bit: bool = false;

export function sta(inst: instruction.Instruction, effective: u32) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
			// Check what mode we're running in (8-bit or 16-bit)
			is8Bit = flags.E || flags.M;

			// First, write the low byte of the accumulator
			bus.write.setup(effective, registers.A);
			inst.step++;
			return false;
		
		case 1:
			bus.write.exec();

			// If we're in 8-bit mode, we just want the one byte, so we're done
			if (is8Bit) {
				return true;
			}

			// Otherwise, write the high byte
			bus.write.setup(effective + 1, registers.B);
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
