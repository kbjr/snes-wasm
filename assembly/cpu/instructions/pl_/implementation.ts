
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import { stack } from '../../stack';
import { u16_util } from '../../../u16';

export function pull_acc(inst: instruction.Instruction) : bool {
	// Check what mode we're running in (8-bit or 16-bit)
	if (inst.step === 0) {
		is8Bit = flags.E || flags.M;
	}

	if (! pull_usize(inst)) {
		return false;
	}

	registers.A = lowBuffer;

	if (! is8Bit) {
		registers.B = highBuffer;
	}

	return true;
}

export function pull_dbr(inst: instruction.Instruction) : bool {
	if (! pull_u8(inst)) {
		return false;
	}

	registers.DBR = lowBuffer;

	return true;
}

export function pull_dp(inst: instruction.Instruction) : bool {
	if (! pull_u16(inst)) {
		return false;
	}

	registers.D = u16_util.from_u8(lowBuffer, highBuffer);

	return true;
}

export function pull_p(inst: instruction.Instruction) : bool {
	if (! pull_u8(inst)) {
		return false;
	}

	registers.P = lowBuffer;

	return true;
}

export function pull_x(inst: instruction.Instruction) : bool {
	if (inst.step === 0) {
		is8Bit = flags.E || flags.X;
	}

	if (! pull_usize(inst)) {
		return false;
	}

	if (is8Bit) {
		registers.X_low = lowBuffer;
	}

	else {
		registers.X = u16_util.from_u8(lowBuffer, highBuffer);
	}

	return true;
}

export function pull_y(inst: instruction.Instruction) : bool {
	if (inst.step === 0) {
		is8Bit = flags.E || flags.X;
	}

	if (! pull_usize(inst)) {
		return false;
	}

	if (is8Bit) {
		registers.Y_low = lowBuffer;
	}

	else {
		registers.Y = u16_util.from_u8(lowBuffer, highBuffer);
	}

	return true;
}





let is8Bit: bool = false;
let lowBuffer: u8 = 0;
let highBuffer: u8 = 0;


function pull_u8(inst: instruction.Instruction) : bool {
	switch (inst.step) {
		case 0:
			// Prepare to pull the first value off the stack
			stack.pull.step0();
			inst.step++;
			return false;
		
		case 1:
			// Grab the byte from the stack and store it
			lowBuffer = stack.pull.step1();

			// Set the appropriate flags
			flags.N_assign(<bool>(lowBuffer & 0x80));
			flags.Z_assign(lowBuffer === 0x00);

			return true;

		// This should never happen
		default: return true;
	}
}

function pull_u16(inst: instruction.Instruction) : bool {
	switch (inst.step) {
		case 0:
			// Prepare to pull the first value off the stack
			stack.pull.step0();
			inst.step++;
			return false;
		
		case 1:
			// Grab the byte from the stack and store it in the buffer
			lowBuffer = stack.pull.step1();

			// Otherwise, we need to grab another byte
			stack.pull.step0();
			inst.step++;
			return false;
		
		case 2:
			highBuffer = stack.pull.step1();

			flags.N_assign(<bool>(highBuffer & 0x80));
			flags.Z_assign(lowBuffer === 0x00 && highBuffer === 0x00);

			return true;

		// This should never happen
		default: return true;
	}
}

function pull_usize(inst: instruction.Instruction) : bool {
	switch (inst.step) {
		case 0:
			// Prepare to pull the first value off the stack
			stack.pull.step0();
			inst.step++;
			return false;
		
		case 1:
			// Grab the byte from the stack and store it in the buffer
			lowBuffer = stack.pull.step1();

			// If we're in 8-bit mode, that's all we need, we can finish
			if (is8Bit) {
				flags.N_assign(<bool>(lowBuffer & 0x80));
				flags.Z_assign(lowBuffer === 0x00);

				return true;
			}

			// Otherwise, we need to grab another byte
			stack.pull.step0();
			inst.step++;
			return false;
		
		case 2:
			// If we get to step 2, we must be in 16-bit mode
			highBuffer = stack.pull.step1();

			flags.N_assign(<bool>(highBuffer & 0x80));
			flags.Z_assign(lowBuffer === 0x00 && highBuffer === 0x00);

			return true;

		// This should never happen
		default: return true;
	}
}
