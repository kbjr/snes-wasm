
import { instruction } from '../../instruction';
import { flags } from '../../flags';
import { bus } from '../../../bus';
import { registers } from '../../registers';
import { scheduler } from '../../../scheduler';

let buffer: u8 = 0;
let is8Bit: bool = false;

export function ror(inst: instruction.Instruction, effective: u32) : bool {
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
				const result = ror_u8(bus.read.fetch());

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

			const result = ror_u16(operand);

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

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function ror_acc(inst: instruction.Instruction) : bool {
	if (flags.E || flags.M) {
		registers.A = ror_u8(registers.A);
	}

	else {
		registers.C = ror_u16(registers.C);
	}

	// Count 1 I/O cycle (6 master cycles)
	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

function ror_u8(operand: u8) : u8 {
	// Shift one bit to the right and shift bit 0 into the carry flag
	const shifted = (flags.C << 7) | (operand >> 1);

	// Set/clear the C, N, and Z flags as needed
	flags.C_assign(operand & 0x01);
	flags.N_assign(shifted & 0x80);
	flags.Z_assign(shifted === 0x00);

	return shifted;
}

function ror_u16(operand: u16) : u16 {
	// Shift one bit to the left and shift the carry flag into bit 0
	const shifted = (flags.C << 15) | (operand >> 1);

	// Set/clear the C, N, and Z flags as needed
	flags.C_assign(operand & 0x0001);
	flags.N_assign(shifted & 0x8000);
	flags.Z_assign(shifted === 0x0000);

	return shifted;
}