
import { interrupt } from '../constants';

export namespace callback {
	export type main = () => void;
	export type interrupt = (interrupt: u8) => void;
}

export class Thread {
	/** The number of cycles the thread has executed since starting */
	public cycles: f64;

	/** While this flag is set, the thread will continue to count cycles while doing nothing */
	public idle: bool = false;

	constructor(
		/** The thread's main loop */
		public readonly main: callback.main,
		/** The thread's interrupt handler */
		public readonly interrupt: callback.interrupt
	) { }

	/** Add the given number of master clock cycles to the thread's clock */
	@inline public countCycles(cycles: u8) : void {
		this.cycles += cycles;
	}

	public step() : void {
		if (this.idle) {
			this.countCycles(1);
		}

		else {
			this.main();
		}
	}
}
