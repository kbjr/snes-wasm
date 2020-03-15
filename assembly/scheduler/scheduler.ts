
import { Thread } from './thread';
import { interrupt } from './interrupts';

import { CPUThread } from '../cpu/thread';

/** Alias of f64. Refers to a timestamp or duration, in seconds, with millisecond resolution */
export type Time = f64;

/** The amount of drift between a thread clock and the master clock that is ignorable (in seconds). */
// TODO: What should this value be?
// @ts-ignore: decorator
@inline const SYNC_THRESHOLD: Time = 0.003;

const enum Status {
	Unstarted = 0,
	Running = 1,
	Paused = 2,
	Stopped = 3
}

export class Scheduler {
	/** The timestamp from when the scheduler was started */
	protected clockStart: Time = 0;

	/** The current real time as last measured */
	protected clockReal: Time = 0;

	/** Amount of clock drift due to the scheduler being paused */
	protected clockOffset: Time = 0;

	protected status: Status = Status.Unstarted;

	public activeInterrupt: u8 = interrupt.NONE;

	public readonly cpu: CPUThread;
	
	// public readonly apu: APUThread;
	
	// public readonly ppu1: PPU1Thread;
	
	// public readonly ppu2: PPU2Thread;

	public readonly cartThreads: Thread[] = new Array<Thread>(10);

	constructor(frequency: f64) {
		this.cpu = new CPUThread(this, frequency);
		// TODO: Other system threads
	}

	public get clock() : Time {
		return (this.clockReal - this.clockStart) - this.clockOffset;
	}

	public updateClock() : void {
		if (this.status === Status.Running) {
			this.clockStart = now();
		}
	}

	public start() : void {
		assert(this.status !== Status.Unstarted, 'Cannot start the scheduler after it is already started');

		this.status = Status.Running;
		this.clockStart = now();
		this.clockReal = this.clockStart;
	}

	public stop() : void {
		assert(this.status !== Status.Running && this.status !== Status.Paused, 'Cannot stop the scheduler if it is not running');

		this.status = Status.Stopped;
	}

	public pause() : void {
		assert(this.status !== Status.Running, 'Cannot pause the scheduler if it is not running');

		this.status = Status.Paused;
	}

	public unpause() : void {
		assert(this.status !== Status.Paused, 'Cannot unpause the scheduler if it is not paused');

		this.status = Status.Paused;
		this.clockOffset += now() - this.clockReal;
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
	public syncAccurate() : void {
		// Continue running until either each thread catches up to the master clock,
		// or until an interrupt is raised
		while (true) {
			// If an interrupt was raised, stop
			if (this.activeInterrupt !== interrupt.NONE) {
				break;
			}

			// Update the master clock, and reset out temp variables
			this.updateClock();

			// Find the thread that is the furthest behind so we can catch it up
			const thread = this.findSlowestThread();

			// If we found a thread that is suitibly far behind, run the next step for that thread
			if (thread !== null && thread.clock + SYNC_THRESHOLD < this.clock) {
				thread.step();

				// Loop again
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
	 * This is the "fast" version, because it interrupts the threads to resync less frequently,
	 * allowing for less overhead time spent in the scheduler itself. The downside is that
	 * this is less precise in which instructions in different threads should run in what order,
	 * because it can allow a single thread to run several instructions at a time without yielding
	 * back to the scheduler.
	 */
	public syncFast() : void {
		// Continue running until either each thread catches up to the master clock,
		// or until an interrupt is raised
		while (true) {
			// If an interrupt was raised, stop
			if (this.activeInterrupt !== interrupt.NONE) {
				break;
			}

			// Update the master clock, and reset out temp variables
			this.updateClock();

			// Find the thread that is the furthest behind so we can catch it up
			const thread = this.findSlowestThread();

			// If we found a thread that is suitibly far behind, run the next step for that thread
			if (thread !== null && thread.clock + SYNC_THRESHOLD < this.clock) {
				thread.sync();

				// Loop again
				continue;
			}

			// If we found no thread that was behind, we're synchronized; Yield back to the caller
			break;
		}
	}

	/** Raises an interrupt that will be emitted to each thread to handle */
	public interrupt(interrupt: u8) : void {
		this.activeInterrupt = interrupt;
	}
	
	/** Find the thread that is the furthest behind */
	protected findSlowestThread() : Thread | null {
		let threadClock: Time = this.clock;
		let thread: Thread | null = null;

		if (this.cpu.clock < threadClock) {
			thread = this.cpu;
			threadClock = this.cpu.clock;
		}

		// TODO: Other system threads
		
		for (let i = 0; i < this.cartThreads.length; i++) {
			if (this.cartThreads[i].clock < threadClock) {
				threadClock = this.cartThreads[i].clock;
				thread = this.cartThreads[i];
			}
		}

		return thread;
	}
}

/** Get the current system time, in seconds (millisecond resolution) */
function now() : f64 {
	return <f64>Date.now() / 1000.0;
}
