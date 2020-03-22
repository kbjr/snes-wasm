
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import { bus } from '../../../bus';

let buffer: u8 = 0;
let is8Bit: bool = false;

export function trb_(inst: instruction.Instruction, effective: u32) : bool {
	return t_b_(inst, effective, trb_u8, trb_u16);
}

export function tsb_(inst: instruction.Instruction, effective: u32) : bool {
	return t_b_(inst, effective, tsb_u8, tsb_u16);
}

function t_b_(inst: instruction.Instruction, effective: u32, u8_op: instruction.callback.u8_map, u16_op: instruction.callback.u16_map) : bool {
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
				const result = u8_op(bus.read.fetch());

				bus.write.setup(effective, result);
				bus.write.exec();

				return true;
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

			const result = u16_op(operand);

			// Write the low byte first
			bus.write.setup(effective, <u8>(result & 0xff));
			bus.write.exec();

			// Stash the high byte for next cycle
			buffer = <u8>(result >> 8)

			return false;
		
		case 3:
			// Write the high byte
			bus.write.setup(effective + 1, buffer);
			bus.write.exec();

			return true;
		
		// This should never happen
		default:
			return true;
	}
}

function trb_u8(value: u8) : u8 {
	flags.Z_assign((registers.A & value) === 0x00);

	return (registers.A ^ 0xff) & value;
}

function trb_u16(value: u16) : u16 {
	flags.Z_assign((registers.C & value) === 0x0000);

	return (registers.C ^ 0xffff) & value;
}

function tsb_u8(value: u8) : u8 {
	flags.Z_assign((registers.A & value) === 0x00);

	return registers.A | value;
}

function tsb_u16(value: u16) : u16 {
	flags.Z_assign((registers.C & value) === 0x0000);

	return registers.C | value;
}
