
import { Interrupt } from './interrupts';
import { Thread, Callback } from './thread';

const threads: Array<Thread> = [ ];

/** The amount of drift between a thread clock and the master clock that is ignorable (in seconds). */
// TODO: What should this value be?
// @ts-ignore: decorator
@inline const SYNC_THRESHOLD: f64 = 0.003;

/** The internal clock, starts at zero, counting milliseconds */
export let clock: f64 = 0;

/** The starting timestamp, in milliseconds, when the scheduler was started */
let clock_start: f64 = 0;

/** When an interrupt is raised, it is stored here until it is handled */
export let activeInterrupt: u8 = Interrupt.NONE;

/**
 * Registers a new thread with the scheduler
 * 
 * @param frequency The frequency (cycles per second) that this thread should run at
 * @param mainLoop The main loop function that is called for the thread
 * @param onDestroy Called when the thread is removed from the scheduler
 */
export function createThread(frequency: f64, mainLoop: Callback, onDestroy: Callback) : Thread {
	const thread = new Thread(frequency, mainLoop, onDestroy);

	threads.push(thread);

	return thread;
}

/**
 * Raises an interrupt
 * 
 * @param interrupt The interrupt to raise
 */
export function interrupt(interrupt: u8) : void {
	activeInterrupt = interrupt;
}

/**
 * Handles the active interrupt, if one exists
 */
export function handleInterrupt() : void {
	// If an interrupt has been raised, but not handled, handle it
	if (activeInterrupt !== Interrupt.NONE) {
		// We raise the interrupt on each thread so they can each handle it as they see fit
		for (let i = 0; i < threads.length; i++) {
			threads[i].interrupt(activeInterrupt);
		}

		// Clear the interrupt once it has propagated to each thread
		activeInterrupt = Interrupt.NONE;
	}
}

/**
 * Synchronize all the threads in the scheduler with the master clock. Will stop early
 * (before all threads are synchronized) if an interrupt is raised, to allow the
 * interrupt to be handled.
 * 
 * This is the "fast" version, because it interrupts the threads to resync less frequently,
 * allowing for less overhead time spent in the scheduler itself. The downside is that
 * this is less precise in which instructions in different threads should run in what order,
 * because it can allow a single thread to run several instructions at a time without yielding
 * back to the scheduler.
 */
export function sync_fast() : void {
	let thread: Thread | null = null;
	let thread_clock: f64 = clock;

	// Continue running until either each thread catches up to the master clock,
	// or until an interrupt is raised
	while (true) {
		// If an interrupt was raised, stop
		if (activeInterrupt !== Interrupt.NONE) {
			break;
		}

		// Update the master clock, and reset out temp variables
		syncClock();
		thread_clock = clock;
		thread = null;

		// Go through the threads, looking for the one that is the furthest behind
		// the master clock
		for (let i = 0; i < threads.length; i++) {
			if (threads[i].clock < thread_clock) {
				thread_clock = threads[i].clock;
				thread = threads[i];
			}
		}

		// If we found a thread that is suitibly far behind, run it until its synchronized
		if (thread !== null && thread_clock + SYNC_THRESHOLD < clock) {
			thread.sync();

			// When this thread is synchronized, loop again
			continue;
		}

		// If we found no thread that was behind, we're synchronized; Yield back to the caller
		break;
	}
}

/**
 * Synchronize all the threads in the scheduler with the master clock. Will stop early
 * (before all threads are synchronized) if an interrupt is raised, to allow the
 * interrupt to be handled.
 * 
 * This is the "accurate" version because it yields back to the scheduler much more frequently,
 * allowing for the individual threads to stay more in sync with each other at all times. The
 * downside is that much more time is spent in the scheduler itself, adding performance overhead.
 */
export function sync_accurate() : void {
	let thread: Thread | null = null;
	let thread_clock: f64 = clock;

	// Continue running until either each thread catches up to the master clock,
	// or until an interrupt is raised
	while (true) {
		// If an interrupt was raised, stop
		if (activeInterrupt !== Interrupt.NONE) {
			break;
		}

		// Update the master clock, and reset out temp variables
		syncClock()
		thread_clock = clock;
		thread = null;

		// Go through the threads, looking for the one that is the furthest behind
		// the master clock
		for (let i = 0; i < threads.length; i++) {
			if (threads[i].clock < thread_clock) {
				thread_clock = threads[i].clock;
				thread = threads[i];
			}
		}

		// If we found a thread that is suitibly far behind, run the next step for that thread
		if (thread !== null && thread_clock + SYNC_THRESHOLD < clock) {
			thread.step();

			// Loop again
			continue;
		}

		// If we found no thread that was behind, we're synchronized; Yield back to the caller
		break;
	}
}

/**
 * Starts the clock on the scheduler. This happens at system start (ie. when the SNES is turned on)
 */
export function start() : void {
	clock_start = now();
}

/**
 * Updates the master clock
 */
// @ts-ignore: decorator
@inline export function syncClock() : void {
	clock = now() - clock_start;
}

export function reset() : void {
	// TODO: Write the scheduler reset function
}

/** Get the current system time, in seconds (millisecond resolution) */
function now() : f64 {
	return <f64>Date.now() / 1000.0;
}
