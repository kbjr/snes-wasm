
import { flags } from '../flags';
import { cpuThread } from '../../scheduler';
import { addr_immediate_u8 } from '../addressing';
import { registers } from '../registers';

/**
 * sec
 * Set Carry Flag Instruction
 *
 * Opcode:     0x38
 * Flags:      ----d----
 * Addressing: Implied
 * Bytes:      1
 * Cycles:     2
 *
 *     sec
 *
 * Sets the carry flag in the Processor Status (P) register
 */
export namespace sec {
	export function $38() : bool {
		flags.C_set();

		// Count 2 cycles for the instruction
		cpuThread.countCycles(2);

		return false;
	}
}

/**
 * sed
 * Set Decimal Mode Flag Instruction
 *
 * Opcode:     0xF8
 * Flags:      ----d----
 * Addressing: Implied
 * Bytes:      1
 * Cycles:     2
 *
 *     sed
 *
 * Sets the decimal mode flag in the Processor Status (P) register
 */
export namespace sed {
	export function $F8() : bool {
		flags.D_set();

		// Count 2 cycles for the instruction
		cpuThread.countCycles(2);
		
		return false;
	}
}

/**
 * sei
 * Set Interrupt Disable Flag Instruction
 *
 * Opcode:     0x78
 * Flags:      -----i---
 * Addressing: Implied
 * Bytes:      1
 * Cycles:     2
 *
 *     sei
 *
 * Sets the interrupt disable flag in the Processor Status (P) register
 */
export namespace sei {
	export function $78() : bool {
		flags.I_set();

		// Count 2 cycles for the instruction
		cpuThread.countCycles(2);
		
		return false;
	}
}

/**
 * sep
 * Set Processor status bits Instruction
 *
 * Opcode:     0xE2
 * Flags:      nvmxdizc-
 * Addressing: Immediate
 * Bytes:      2
 * Cycles:     3
 *
 *     sep #const
 *
 * Applies the given bit mask to the Processor Status (P1) Register with a
 * bitwise OR operation, allowing the setting of status flags.
 */
export namespace sep {
	export function $E2() : bool {
		const mask = addr_immediate_u8();

		registers.P |= mask;

		// Count 3 cycles for the instruction
		cpuThread.countCycles(3);
		
		return false;
	}
}
