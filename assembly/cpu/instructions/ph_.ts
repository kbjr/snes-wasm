
import { stack_push } from '../stack';
import { cpuThread } from '../../scheduler';
import { flags } from '../flags';
import { registers } from '../registers';
import {
	addr_immediate_u8,
	addr_directPageIndirect,
	addr_programCounterRelativeLong
} from '../addressing';
import { u16_low, u16_high } from '../../types/u16';

/**
 * pea
 * Push Effective Absolute Address Instruction
 *
 * Opcode:     0xF4
 * Flags:      ---------
 * Addressing: Stack (Absolute)
 * Bytes:      3
 * Cycles:     5
 *
 *     pea addr
 *
 * Pushes the given constant value onto the stack.
 */
export namespace pea {
	export function $F4() : bool {
		const low = addr_immediate_u8();
		const high = addr_immediate_u8();

		// Write the high byte to the stack first, then the low byte
		stack_push(high);
		stack_push(low);

		// Count 5 cycles for the instruction
		cpuThread.countCycles(5);

		return false;
	}
}

/**
 * pei
 * Push Effective Indirect Address Instruction
 *
 * Opcode:     0xD4
 * Flags:      ---------
 * Addressing: Stack (Direct Page Indirect)
 * Bytes:      2
 * Cycles:     6 [1]
 *
 *     pei (dp)
 *
 * Pushes the given indirect address onto the stack.
 *
 * [1]: Add 1 cycle if low byte of Direct Page register is non-zero
 */
export namespace pei {
	export function $D4() : bool {
		const addr = <u16>addr_directPageIndirect() & 0xffff;

		// Write the high byte to the stack first, then the low byte
		stack_push(u16_high(addr));
		stack_push(u16_low(addr));

		// Count 6 cycles for the instruction
		cpuThread.countCycles(6);

		return false;
	}
}

/**
 * per
 * Push Effective PC Relative Indirect Address Instruction
 *
 * Opcode:     0x62
 * Flags:      ---------
 * Addressing: Stack (Program Counter Relative Long)
 * Bytes:      3
 * Cycles:     6
 *
 *     per label
 *
 * Pushes the given PC relative indirect address onto the stack.
 */
export namespace per {
	export function $62() : bool {
		const addr = <u16>addr_programCounterRelativeLong() & 0xffff;

		// Write the high byte to the stack first, then the low byte
		stack_push(u16_high(addr));
		stack_push(u16_low(addr));

		// Count 6 cycles for the instruction
		cpuThread.countCycles(6);

		return false;
	}
}

/**
 * pha
 * Push Accumulator Instruction
 *
 * Opcode:     0x48
 * Flags:      ---------
 * Addressing: Stack (Implied)
 * Bytes:      1
 * Cycles:     3 [1]
 *
 *     pha
 *
 * Pushes the contents of the Accumulator (A) onto the stack.
 *
 * [1]: Add 1 cycle if M = 0 (16-bit memory/accumulator)
 */
export namespace pha {
	export function $48() : bool {
		if (flags.E || flags.M) {
			// Write the accumulator to the stack
			stack_push(registers.A);
		}

		else {
			// Write the accumulator to the stack
			stack_push(registers.B);
			stack_push(registers.A);

			// Count 1 extra cycle for 16-bit mode
			cpuThread.countCycles(1);
		}

		// Count 3 cycles for the instruction
		cpuThread.countCycles(3);

		return false;
	}
}

/**
 * phb
 * Push Data Bank Register Instruction
 *
 * Opcode:     0x8B
 * Flags:      ---------
 * Addressing: Stack (Implied)
 * Bytes:      1
 * Cycles:     3
 *
 *     phb
 *
 * Pushes the Data Bank Register onto the stack.
 */
export namespace phb {
	export function $8B() : bool {
		// Write the DBR to the stack
		stack_push(registers.DBR);

		// Count 3 cycles for the instruction
		cpuThread.countCycles(3);

		return false;
	}
}

/**
 * phd
 * Push Direct Page Register Instruction
 *
 * Opcode:     0x0B
 * Flags:      ---------
 * Addressing: Stack (Implied)
 * Bytes:      1
 * Cycles:     4
 *
 *     phd
 *
 * Pushes the Direct Page Register onto the stack.
 */
export namespace phd {
	export function $0B() : bool {
		const addr = registers.D;

		// Write the high byte of the DBR to the stack first, then the low byte
		stack_push(u16_high(addr));
		stack_push(u16_low(addr));

		// Add the 4 cycles for the instruction
		cpuThread.countCycles(4);

		return false;
	}
}

/**
 * phk
 * Push Program Bank Register Instruction
 *
 * Opcode:     0x4B
 * Flags:      ---------
 * Addressing: Stack (Implied)
 * Bytes:      1
 * Cycles:     3
 *
 *     phk
 *
 * Pushes the Program Bank Register onto the stack.
 */
export namespace phk {
	export function $4B() : bool {
		// Write the PBR register to the stack
		stack_push(registers.PBR);

		// Add the 3 cycles for the instruction
		cpuThread.countCycles(3);

		return false;
	}
}

/**
 * php
 * Push Processor Status Register Instruction
 *
 * Opcode:     0x08
 * Flags:      ---------
 * Addressing: Stack (Implied)
 * Bytes:      1
 * Cycles:     3
 *
 *     php
 *
 * Pushes the Processor Status Register onto the stack.
 */
export namespace php {
	export function $08() : bool {
		// Write the P register to the stack
		stack_push(registers.P);

		// Add 3 cycles for the instruction
		cpuThread.countCycles(3);

		return false;
	}
}

/**
 * phx
 * Push X Index Register Instruction
 *
 * Opcode:     0xDA
 * Flags:      ---------
 * Addressing: Stack (Implied)
 * Bytes:      1
 * Cycles:     3 [1]
 *
 *     phx
 *
 * Pushes the X Index Register onto the stack.
 *
 * [1]: Add 1 cycle if X = 0 (16-bit index registers)
 */
export namespace phx {
	export function $DA() : bool {
		if (flags.E || flags.X) {
			// Write the X register to the stack
			stack_push(registers.X_low);
		}

		else {
			const x = registers.X;

			// Write the high byte of the X to the stack first, then the low byte
			stack_push(u16_high(x));
			stack_push(u16_low(x));

			// Count 1 extra cycle for 16-bit mode
			cpuThread.countCycles(1);
		}

		// Count 3 cycles for the instruction
		cpuThread.countCycles(3);

		return false;
	}
}

/**
 * phy
 * Push Y Index Register Instruction
 *
 * Opcode:     0x5A
 * Flags:      ---------
 * Addressing: Stack (Implied)
 * Bytes:      1
 * Cycles:     3 [1]
 *
 *     phy
 *
 * Pushes the Y Index Register onto the stack.
 *
 * [1]: Add 1 cycle if X = 0 (16-bit index registers)
 */
export namespace phy {
	export function $5A() : bool {
		if (flags.E || flags.X) {
			// Write the Y register to the stack
			stack_push(registers.Y_low);
		}

		else {
			const y = registers.Y;

			// Write the high byte of the Y to the stack first, then the low byte
			stack_push(u16_high(y));
			stack_push(u16_low(y));

			// Count 1 extra cycle for 16-bit mode
			cpuThread.countCycles(1);
		}

		// Count 3 cycles for the instruction
		cpuThread.countCycles(3);

		return false;
	}
}
