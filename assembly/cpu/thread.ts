
import { createThread, Thread } from '../scheduler';

export let thread: Thread | null = null;

/** TODO: What is this value? */
const frequency: f64 = 10;

/** Registers the CPU as a thread in the scheduler */
export function registerThread() : void {
	if (thread === null) {
		thread = createThread(frequency, mainLoop, destroy);
	}
}

/** Called when the thread is removed from the scheduler (like when the system is shut down) */
export function destroy() : void {
	thread = null;
}

/** The CPU's main loop function */
export function mainLoop() : void {
	// First, check to see if there is an interrupt to handle
	if (thread?.activeInterrupt !== null) {
		// TODO: Handle the interrupt
	}

	// Otherwise, execute the next instruction
	// TODO: Run instruction
}
