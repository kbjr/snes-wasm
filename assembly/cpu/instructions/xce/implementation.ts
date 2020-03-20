
import { scheduler } from '../../../scheduler';
import { instruction } from '../../instruction';
import { flags } from '../../flags';
import { onEmulationMode, onNativeMode } from '../../modes';

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function xce(inst: instruction.Instruction) : true {
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
	scheduler.scheduler.cpuThread.countCycles(2);

	return true;
}
