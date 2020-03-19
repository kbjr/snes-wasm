
import { registers } from '../registers';
import { scheduler } from '../../scheduler';
import { instruction } from '../instruction';

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
class Wdm extends instruction.Instruction {
	public exec() : bool {
		// Move the PC forward one as this is treated as a two-byte "opcode"
		registers.PC++;

		// Idle for 2 I/O cycles (12 master cycles)
		scheduler.scheduler.cpuThread.countCycles(12);
		
		return true;
	}
}

export let $42: Wdm;

function init() : void {
	$42 = new Wdm();
}

init();
