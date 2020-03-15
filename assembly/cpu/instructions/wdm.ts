
import { registers } from '../registers';
import { cpuThread } from '../../_scheduler';

/**
 * wdm
 * Reserved for Future Expansion
 *
 * Opcode:     0x42
 * Flags:      ---------
 * Addressing: N/A
 * Bytes:      2
 * Cycles:     2
 *
 *     wdm
 *
 * The WDM "instruction" is a placeholder in case of future use of two-byte opcodes. In
 * the context of a SNES, there's no reason this instruction should ever be executed. If
 * the WDM instruction is accidentally executed, it acts like a two-byte NOP instuctions,
 * as the 65816 did.
 */
export namespace wdm {
	export function $42() : bool {
		// Move the PC forward one as this is treated as a two-byte "opcode"
		registers.PC++;

		// Count 2 cycles for the instruction
		cpuThread.countCycles(2);

		return false;
	}
}
