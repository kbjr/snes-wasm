
export namespace instruction {
	export type Step = () => void;
	export type Exec = () => bool;

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
