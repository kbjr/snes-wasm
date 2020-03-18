
import { Clock } from './clock';
import { Thread } from './thread';
import { interrupt, apu_freq, cpu_freq } from '../constants';

import { createThread_cpu } from '../cpu';

export class Scheduler {
	protected masterClockFrequency: f64 = cpu_freq.NTSC;


	/** The real-time clock that the threads are synced against */
	public readonly clock: Clock = new Clock();



	/** The number of cycles on the master clock (used by CPU/PPU) */
	protected cpuCycles: f64 = 0;

	/** The number of cycles on the APU clock */
	protected apuCycles: f64 = 0;



	/** The CPU thread */
	public readonly cpuThread: Thread = createThread_cpu();

	/** The PPU thread */
	public readonly ppuThread: Thread;

	/** The APU thread */
	public readonly apuThread: Thread;

	/** How close is the CPU thread to being synced (1 = synced) */
	protected cpuFraction: f64 = 0;

	/** How close is the PPU thread to being synced (1 = synced) */
	protected ppuFraction: f64 = 0;

	/** How close is the APU thread to being synced (1 = synced) */
	protected apuFraction: f64 = 0;



	/** The last interrupt fired is stored here until delegated */
	protected _interrupt: u8 = interrupt.none;



	/** Resets the scheduler, sending a reset signal to each thread and reseting the clock */
	public reset(freq: f64) : void {
		this.masterClockFrequency = freq;

		this.clock.stop();
		
		// TODO: How do we reset the threads?
	}

	/** Synchronize all threads to the current clock time */
	public sync() : void {
		// Update all the clocks so we know what our target is
		this.updateClocks();

		// Keep looping until everything is synced up
		while (true) {
			// If the CPU thread is behind (< 1) and is further behind than the other threads, run it
			if (this.cpuFraction < 1 /* && this.cpuFraction <= this.ppuFraction && this.cpuFraction <= this.apuFraction */) {
				this.step_cpu();
				continue;
			}
			
			// If the PPU thread is behind (< 1) and is further behind than the other threads, run it
			// else if (this.ppuFraction < 1 && this.ppuFraction <= this.apuFraction) {
			// 	this.step_ppu();
			// 	continue;
			// }
			
			// If the APU thread is behind (< 1), run it
			// else if (this.apuFraction < 1) {
			// 	this.step_apu();
			// 	continue;
			// }

			break;
		}
	}

	@inline protected step_cpu() : void {
		this.cpuThread.step();
		this.cpuFraction = this.cpuThread.cycles / this.cpuCycles;
	}

	@inline protected step_ppu() : void {
		this.ppuThread.step();
		this.ppuFraction = this.ppuThread.cycles / this.cpuCycles;
	}

	@inline protected step_apu() : void {
		this.apuThread.step();
		this.apuFraction = this.apuThread.cycles / this.apuCycles;
	}

	/** Update all of the internal clocks */
	@inline protected updateClocks() : void {
		const now = this.clock.now;

		this.cpuCycles = now * this.masterClockFrequency;
		this.apuCycles = now * apu_freq;
		
		this.cpuFraction = this.cpuThread.cycles / this.cpuCycles;
		this.ppuFraction = this.ppuThread.cycles / this.cpuCycles;
		this.apuFraction = this.apuThread.cycles / this.apuCycles;
	}



	/** Raises an interrupt on all threads */
	public interrupt(interrupt: u8) : void {
		this.cpuThread.interrupt(interrupt);
		this.ppuThread.interrupt(interrupt);
		this.apuThread.interrupt(interrupt);
	}
}
