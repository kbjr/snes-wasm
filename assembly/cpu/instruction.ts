
import { u24 } from '../u24';

export namespace instruction {
	
	export namespace callback {
		export type step = () => void;
		export type test = () => bool;
		export type exec = () => bool;
		export type u8_op = (value: u8) => bool;
		export type u16_op = (value: u16) => bool;
		export type u24_op = (value: u24.native) => bool;
		export type block_move_op = (source: u8, dest: u8) => bool;
	}

	/**
	 * A CPU instruction.
	 * 
	 * Functions similar to a generator function. `Instruction.exec()` will be called each
	 * time the CPU is given time so long as the function continues returning false. Once the
	 * exec method returns true, the instruction is considered "finished".
	 */
	export abstract class Instruction {
		/** Execute the instruction. Should return true if the instruction is complete */
		public abstract exec() : bool;
	}

	export class SingleStepInstruction extends Instruction {
		constructor(public exec: callback.exec) {
			super();
		}
	}

	export class MultiStepInstruction extends Instruction {
		constructor(protected readonly steps: callback.step[]) {
			super();
		}

		protected step: u32 = 0;

		public exec() : bool {
			if (this.step >= this.steps.length) {
				return true;
			}

			this.steps[this.step++]();

			return false;
		}
	}
}
