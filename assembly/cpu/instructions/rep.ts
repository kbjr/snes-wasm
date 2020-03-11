
import { registers } from '../registers';
import { cpuThread } from '../../scheduler';
import { addr_immediate_u8 } from '../addressing';

/**
 * rep
 * Reset Processor status bits Instruction
 *
 * Opcode:     0xC2
 * Flags:      nvmxdizc-
 * Addressing: Immediate
 * Bytes:      2
 * Cycles:     3
 *
 *     rep #const
 *
 * Applies the inverse of the given mask to the Processor Status (P1) Register
 * with a bitwise OR operation, allowing the resetting of status flags.
 */
export namespace rep {
	export function $C2() : bool {
		const mask = addr_immediate_u8();

		registers.P &= mask ^ 0xff;

		// Count 3 cycles for the instruction
		cpuThread.countCycles(3);

		return false;
	}
}
