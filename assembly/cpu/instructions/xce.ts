
import { flags } from '../flags';
import { cpuThread } from '../../_scheduler';
import { onNativeMode, onEmulationMode } from '../modes';

/**
 * xce
 * Exchange Carry with Emulation bit Instruction
 *
 * Opcode:     0xFB
 * Flags:      --mx---ce
 * Addressing: Implied
 * Bytes:      1
 * Cycles:     2
 *
 *     xce
 *
 * Swaps the value of the hidden E (Emulation) flag into the C (Carry) flag
 * location, allowing it to be inspected or set.
 */
export namespace xce {
	export function $FB() : bool {
		// If the flags already match each other, we can just do nothing
		if (flags.E !== flags.C) {
			// We already know they don't match, so we can know the value of both by just checking one
			if (flags.E) {
				// Swap the 1 from E with the 0 from C
				flags.E_clear();
				flags.C_set();
				
				// Do anything that needs to happen when entering native mode
				onNativeMode();
			}
			
			else {
				// Swap the 0 from E with the 1 from C
				flags.E_set();
				flags.C_clear();

				// Do anything that needs to happen when entering emulation mode
				onEmulationMode();
			}
		}

		// Count 2 cycles for the instruction
		cpuThread.countCycles(2);

		return false;
	}
}
