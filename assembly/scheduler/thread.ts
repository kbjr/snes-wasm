
import { clock } from './scheduler';
import { Interrupt } from './interrupts';

/**
 * The primary callback function for a thread. Any time a thread does not have
 * an active instruction, the main loop function will be called instead. Some other
 * handlers, like the destroy method, also have this type
 */
export type Callback = () => void;

/**
 * An instruction is a generator that receives a incrementing step counter
 * each time its called, until it returns false.
 */
export type Instruction = (step: u8) => bool;

export class Thread {
	/** The total number of cycles executed on this thread since start */
	protected cycles: u64 = 0;

	/** The current step in the current instruction */
	protected instructionStep: u8 = 0;

	/** The current instruction being executed */
	public instruction: Instruction | null = null;

	/** The currently raised interrupt. Will remain here until it is cleared by the thread */
	public activeInterrupt: u8 = Interrupt.NONE;

	constructor(
		/** The frequency of the thread (cycles / second) */
		protected frequency: f64,
		/** The main loop function that is called for the thread when no instruction is active */
		protected readonly mainLoop: Callback,
		/** Called when the thread is removed from the scheduler */
		protected readonly onDestroy: Callback
	) { }

	/** The current clock time for this thread, in seconds */
	@inline public get clock() : f64 {
		return <f64>this.cycles / this.frequency;
	}

	/** Sets the instruction to be run */
	public runInstruction(instruction: Instruction) : void {
		this.instruction = instruction;
		this.instructionStep = 0;
	}

	/** Execute a single step, whether that be running an instruction step, or entering the main loop */
	public step() : void {
		if (this.instruction !== null) {
			const hasMoreSteps: bool = this.instruction(this.instructionStep++);

			if (! hasMoreSteps) {
				this.instruction = null;
			}
		}

		else {
			this.mainLoop();
		}
	}

	/** Runs the thread until the clock for this thread catches up to the master clock */
	public sync() : void {
		while (this.clock < clock) {
			this.step();
		}
	}

	/** Continue executing until the current instruction is fully handled */
	public finishInstruction() : void {
		while (this.instruction !== null) {
			this.step();
		}
	}

	public reset() : void {
		this.cycles = 0;
		this.instructionStep = 0;
		this.instruction = null;
	}

	public resetWithNewFrequency(frequency: f64) : void {
		this.reset();
		this.frequency = frequency;
	}

	public countCycles(cycles: u8) : void {
		this.cycles += cycles;
	}

	public interrupt(interrupt: u8) : void {
		this.activeInterrupt = interrupt;
	}

	public clearInterrupt() : void {
		this.activeInterrupt = Interrupt.NONE;
	}
}

export function noop() : void { }

export const NullThread = new Thread(0, noop, noop);
