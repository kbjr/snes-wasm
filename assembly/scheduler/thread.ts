
import { Instruction } from './instruction';
import { interrupt } from './interrupts';
import { Scheduler } from './scheduler';

export abstract class Thread {
	protected cycles: u32 = 0;

	protected idle: bool = false;

	protected instruction: Instruction | null = null;

	protected activeInterrupt: u8 = interrupt.NONE;

	constructor(
		protected readonly scheduler: Scheduler,
		protected readonly frequency: f64
	) { }

	/** Runs the thread until the clock for this thread catches up to the master clock */
	public sync() : void {
		while (this.clock < this.scheduler.clock) {
			this.step();
		}
	}

	/** Execute a single step, whether that be running an instruction step, or entering the main loop */
	public step() : void {
		if (this.instruction === null) {
			if (this.activeInterrupt !== interrupt.NONE) {
				this.onInterupt();
	
				return;
			}

			if (this.idle) {
				this.countCycles(1);

				return;
			}

			this.instruction = this.next();
		}

		const done = this.instruction.step();

		if (done) {
			this.instruction = null;
		}
	}

	/** Continue executing until the current instruction is fully handled */
	public finishInstruction() : void {
		while (this.instruction !== null) {
			this.step();
		}
	}

	/** Determine the correct next instruction to execute */
	protected abstract next() : Instruction;

	/** Event handler for interrupts. No-op unless overriden by sub-class */
	protected onInterupt() : void {
		// pass
	}

	/** The current time since start-up (in seconds), according to thread time */
	// @ts-ignore: decorator
	@inline public get clock() : f64 {
		return <f64>this.cycles * this.frequency;
	}

	/** Increment the thread clock by the given number of cycles */
	// @ts-ignore: decorator
	@inline public countCycles(cycles: u8) : void {
		this.cycles += cycles;
	}
}
