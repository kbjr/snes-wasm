
import { flags } from '../flags';
import { registers } from '../registers';
import { cpuThread } from '../../_scheduler';
import { stack_pull } from '../stack';
import { u16_from_u8 } from '../../types/u16';

/**
 * pla
 * Pull Accumulator Instruction
 *
 * Opcode:     0x68
 * Flags:      N-----Z--
 * Addressing: Stack (Implied)
 * Bytes:      1
 * Cycles:     4 [1]
 *
 *   pla
 *
 * Pulls the top of the stack and stores it in the accumulator
 *
 * [1]: Add 1 cycle if M = 0 (16-bit memory/accumulator)
 */
export namespace pla {
	export function $68() : bool {
		if (flags.E || flags.M) {
			const byte = stack_pull();

			registers.A = byte;

			flags.N_assign(byte & 0x80);
			flags.Z_assign(byte === 0x00);
		}

		else {
			const low = stack_pull();
			const high = stack_pull();

			registers.A = low;
			registers.B = high;

			flags.N_assign(high & 0x80);
			flags.Z_assign(low === 0x00 && high === 0x00);

			// Count 1 extra cycle for 16-bit mode
			cpuThread.countCycles(1);
		}

		// Count 4 cycles for the instruction
		cpuThread.countCycles(4);

		return false;
	}
}

/**
 * plb
 * Pull Data Bank Register Instruction
 *
 * Opcode:     0xAB
 * Flags:      N-----Z--
 * Addressing: Stack (Implied)
 * Bytes:      1
 * Cycles:     4
 *
 *   plb
 *
 * Pulls the top of the stack and stores it in the Data Bank Register
 */
export namespace plb {
	export function $AB() : bool {
		// Pull the value from the stack and store it in DBR
		const byte = stack_pull();

		registers.DBR = byte;

		flags.N_assign(byte & 0x80);
		flags.Z_assign(byte === 0x00);

		// Add the 4 cycles for the instruction
		cpuThread.countCycles(4);

		return false;
	}
}

/**
 * pld
 * Pull Direct Page Register Instruction
 *
 * Opcode:     0x2B
 * Flags:      N-----Z--
 * Addressing: Stack (Push)
 * Bytes:      1
 * Cycles:     5
 *
 *   pld
 *
 * Pulls the top of the stack and stores it in the Direct Page Register
 */
export namespace pld {
	export function $2B() : bool {
		// Pull the value from the stack and store it in DBR
		const low = stack_pull();
		const high = stack_pull();
		const value = u16_from_u8(low, high);

		registers.D = value;

		flags.N_assign(value & 0x8000);
		flags.Z_assign(value === 0x0000);

		// Add the 5 cycles for the instruction
		cpuThread.countCycles(5);

		return false;
	}
}

/**
 * plp
 * Pull Status Flags Instruction
 *
 * Opcode:     0x2B
 * Flags:      NVMXDIZC- (NV-BDIZC- if E = 1)
 * Addressing: Stack (Push)
 * Bytes:      1
 * Cycles:     4
 *
 *   plp
 *
 * Pulls the top of the stack and stores it in the Processor Status Flags Register
 */
export namespace plp {
	export function $28() : bool {
		// Pull the value from the stack and store it in P
		registers.P = stack_pull();

		// Add the 4 cycles for the instruction
		cpuThread.countCycles(4);

		return false;
	}
}

/**
 * plx
 * Pull Accumulator Instruction
 *
 * Opcode:     0xFA
 * Flags:      N-----Z--
 * Addressing: Stack (Push)
 * Bytes:      1
 * Cycles:     4 [1]
 *
 *   pla
 *
 * Pulls the top of the stack and stores it in the Index Register X
 *
 * [1]: Add 1 cycle if X = 0 (16-bit index registers)
 */
export namespace plx {
	export function $FA() : bool {
		if (flags.E || flags.X) {
			// Pull the value from the stack and store it in X
			const byte = stack_pull();

			registers.X_low = byte;

			flags.N_assign(byte & 0x80);
			flags.Z_assign(byte === 0x00);
		}

		else {
			// Pull the bytes from the stack and store it in X
			const low = stack_pull();
			const high = stack_pull();
			const value = u16_from_u8(low, high);

			registers.X = value;

			flags.N_assign(value & 0x8000);
			flags.Z_assign(value === 0x0000);

			// Count +1 cycle for 16-bit mode
			cpuThread.countCycles(1);
		}

		// Add the 4 cycles for the instruction
		cpuThread.countCycles(4);

		return false;
	}
}

/**
 * ply
 * Pull Accumulator Instruction
 *
 * Opcode:     0x7A
 * Flags:      N-----Z--
 * Addressing: Stack (Push)
 * Bytes:      1
 * Cycles:     4 [1]
 *
 *   ply
 *
 * Pulls the top of the stack and stores it in the Index Register Y
 *
 * [1]: Add 1 cycle if X = 0 (16-bit index registers)
 */
export namespace ply {
	export function $7A() : bool {
		if (flags.E || flags.X) {
			// Pull the value from the stack and store it in Y
			const byte = stack_pull();

			registers.Y = byte;
			flags.N_assign(byte & 0x80);
			flags.Z_assign(byte === 0x00);
		}

		else {
			// Pull the bytes from the stack and store it in Y
			const low = stack_pull();
			const high = stack_pull();
			const value = u16_from_u8(low, high);

			registers.Y = value;
			flags.N_assign(value & 0x8000);
			flags.Z_assign(value === 0x0000);

			// Count +1 cycle for 16-bit mode
			cpuThread.countCycles(1);
		}

		// Add the 4 cycles for the instruction
		cpuThread.countCycles(4);

		return false;
	}
}
