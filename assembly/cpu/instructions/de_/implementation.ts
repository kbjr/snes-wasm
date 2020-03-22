
import { bus } from '../../../bus';
import { flags } from '../../flags';
import { registers } from '../../registers';
import { scheduler } from '../../../scheduler';
import { instruction } from '../../instruction';
import { u16_util } from '../../../u16';

let buffer: u8 = 0;
let is8Bit: bool = false;

export function dec_(inst: instruction.Instruction, effective: u32) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
			// Check what mode we're running in (8-bit or 16-bit)
			is8Bit = flags.E || flags.M;

			// Prepare to read the first byte from the effective address
			bus.read.setup(effective);

			inst.step++;
			return false;
		
		case 1:
			// If we're in 8-bit mode, we just want the one byte
			if (is8Bit) {
				const result: u8 = dec_u8(bus.read.fetch());

				bus.write.setup(effective, result);
				bus.write.exec();

				return true;
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

			// Calculate the decrement result
			const result = dec_u16(operand);

			// Write back the first byte
			bus.write.setup(effective, u16_util.low(result));
			bus.write.exec();

			// Store the high byte in the buffer to write
			buffer = u16_util.high(buffer);

			inst.step++;
			return false;

		case 3:
			// Write the high byte back
			bus.write.setup(effective + 1, buffer);
			bus.write.exec();
			return true;
		
		// This should never happen
		default:
			return true;
	}
}

export function dec_acc(inst: instruction.Instruction) : bool {
	if (flags.E || flags.M) {
		registers.A = dec_u8(registers.A);
	}

	else {
		registers.C = dec_u16(registers.C);
	}

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function dex_(inst: instruction.Instruction) : true {
	if (flags.E || flags.X) {
		registers.X_low = dec_u8(registers.X_low);
	}

	else {
		registers.X = dec_u16(registers.X);
	}

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

export function dey_(inst: instruction.Instruction) : true {
	if (flags.E || flags.X) {
		registers.Y_low = dec_u8(registers.Y_low);
	}

	else {
		registers.Y = dec_u16(registers.Y);
	}

	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

function dec_u8(operand: u8) : u8 {
	const result: u8 = operand - 1;

	flags.Z_assign(result === 0x00);
	flags.N_assign(<bool>(result & 0x80));

	return result;
}

function dec_u16(operand: u16) : u16 {
	const result: u16 = operand - 1;

	flags.Z_assign(result === 0x0000);
	flags.N_assign(<bool>(result & 0x8000));

	return result;
}
