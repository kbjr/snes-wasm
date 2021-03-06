
import { u24 } from '../u24';
import { flags } from './flags';
import { bus } from '../bus';

export namespace instruction {
	
	export namespace callback {
		export type exec = (instruction: Instruction) => bool;
		export type u8_op = (instruction: Instruction, value: u8) => bool;
		export type u16_op = (instruction: Instruction, value: u16) => bool;
		export type u24_op = (instruction: Instruction, value: u24.native) => bool;
		export type block_move_op = (instruction: Instruction, source: u8, dest: u8) => bool;
		export type u8_map = (value: u8) => u8;
		export type u16_map = (value: u16) => u16;
	}

	/** The initial value of Instruction.step when any addressing is finished */
	export const firstStep: u8 = 10;

	/**
	 * A CPU instruction.
	 * 
	 * Functions similar to a generator function. `Instruction.exec()` will be called each
	 * time the CPU is given time so long as the function continues returning false. Once the
	 * exec method returns true, the instruction is considered "finished".
	 */
	export class Instruction {
		public step: u8 = 0;

		/** Execute the instruction. Should return true if the instruction is complete */
		public exec() : bool {
			return true;
		}
	}

	export class Instruction_custom extends instruction.Instruction {
		constructor(public _exec: instruction.callback.exec) {
			super();
		}

		public exec() : bool {
			if (this._exec(this)) {
				this.step = 0;
				return true;
			}

			return false;
		}
	}

}
