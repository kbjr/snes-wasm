
import { flags } from './flags';
import { registers } from './registers';

/** Runs when the CPU switches into Native mode */
export function onNativeMode() : void {
	flags.X_set();
	flags.M_set();
}

/** Runs when the CPU switches into Emulation mode */
export function onEmulationMode() : void {
	// Clear the high bits on some registers that are now 8-bit
	registers.X &= 0x00ff;
	registers.Y &= 0x00ff;
	registers.S &= 0x00ff;

	// Clear the Break flag if X was set
	flags.B_clear();
}
