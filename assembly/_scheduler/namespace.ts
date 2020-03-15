
import { clock, sync_fast, activeInterrupt, handleInterrupt } from './scheduler';

export namespace Scheduler {
	/** Get the current master clock time (in milliseconds) */
	export function getClock() : f64 {
		return clock;
	}

	/**
	 * Run until all threads are synchronized with the master clock, or
	 * until an interrupt is raised.
	 *
	 * TODO: sync_fast() or sync_accurate() ?
	 */
	export function sync() : void {
		// If there is an active interrupt, handle it before continuing
		handleInterrupt();

		// Synchronize all the threads
		sync_fast();
	}

	/**
	 * Checks if there is a currently active interrupt. This can be used, for example,
	 * to determine when the host can read from the video out to update a display.
	 */
	export function getInterrupt() : u8 {
		return activeInterrupt;
	}
}
