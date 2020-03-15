
import { Scheduler } from './scheduler';

export let scheduler: Scheduler | null = null;

/**
 * The main interface for interacting with the system in a simple way (normally expected I/O only)
 */
export namespace system {
	/** Get the current system clock value, measured in seconds since system start */
	export function getClock() : f64 {
		return scheduler!.clock;
	}

	/** Get the currently active interrupt */
	export function getInterrupt() : u8 {
		return scheduler!.activeInterrupt;
	}

	/** Start the system */
	export function start(frequency: f64) : void {
		assert(! scheduler, 'Cannot start machine when one is already running');

		scheduler = new Scheduler(frequency);

		scheduler.start();
	}

	/** Stop the system */
	export function stop() : void {
		scheduler!.stop();

		scheduler = null;
	}

	/** Reset the system */
	export function reset() : void {
		// TODO: reset
	}

	/** Pause the system (stops the system clock) */
	export function pause() : void {
		scheduler!.pause();
	}

	/** Unpause the system */
	export function unpause() : void {
		scheduler!.unpause();
	}
}
