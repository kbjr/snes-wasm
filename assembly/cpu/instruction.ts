
export namespace instruction {
	export type Step = () => void;
	export type Exec = () => bool;

	/** Generic 16-bit storage register for instructions to use between steps */
	export let r1: u16 = 0;
	
	/** Generic 16-bit storage register for instructions to use between steps */
	export let r2: u16 = 0;
	
	/** Generic 8-bit storage register for instructions to use between steps */
	export let r3: u8 = 0;
	
	/** Generic 8-bit storage register for instructions to use between steps */
	export let r4: u8 = 0;

	export abstract class Instruction {
		/** Execute the instruction. Should return true if the instruction is complete */
		public abstract exec() : bool;
	}

	export class SingleStepInstruction extends Instruction {
		constructor(public exec: Exec) {
			super();
		}
	}

	export class MultiStepInstruction extends Instruction {
		constructor(protected readonly steps: Step[]) {
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
