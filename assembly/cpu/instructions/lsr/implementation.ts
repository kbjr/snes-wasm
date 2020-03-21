
import { bus } from '../../../bus';
import { flags } from '../../flags';
import { registers } from '../../registers';
import { scheduler } from '../../../scheduler';
import { instruction } from '../../instruction';

let buffer: u8 = 0;
let is8Bit: bool = false;

export function lsr(inst: instruction.Instruction, effective: u32) : bool {
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
				const result = lsr_u8(bus.read.fetch());

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

			const result = lsr_u16(operand);

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
	
			// Count 2 extra I/O cycles (12 master cycles) for 16-bit mode
			scheduler.scheduler.cpuThread.countCycles(12);

			return true;
		
		// This should never happen
		default:
			return true;
	}
}

export function lsr_acc(inst: instruction.Instruction) : true {
	if (flags.E || flags.M) {
		registers.A = lsr_u8(registers.A);
	}

	else {
		registers.C = lsr_u16(registers.C);
	}

	// Count 1 I/O cycle (6 master cycles)
	scheduler.scheduler.cpuThread.countCycles(6);

	return true;
}

// @ts-ignore: decorator
@inline export function lsr_u8(value: u8) : u8 {
	const shifted = value >>> 1;

	flags.C_assign(<bool>(value & 0x01));
	flags.Z_assign(shifted === 0x00);
	flags.N_assign(<bool>(shifted & 0x80));

	return shifted;
}

// @ts-ignore: decorator
@inline export function lsr_u16(value: u16) : u16 {
	const shifted = value >>> 1;

	flags.C_assign(<bool>(value & 0x0001));
	flags.Z_assign(shifted === 0x0000);
	flags.N_assign(<bool>(shifted & 0x8000));

	return shifted;
}
