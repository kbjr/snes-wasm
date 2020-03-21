
import { u24 } from '../../../u24';
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import * as addr_directPage_indirect_long from './indirect-long';

export let indirect: u24.native = 0;
export let effective: u24.native = 0;

export function step0() : void {
	addr_directPage_indirect_long.step0();
}

export function step1() : void {
	addr_directPage_indirect_long.step1();
}

export function step2() : void {
	addr_directPage_indirect_long.step2();
}

export function step3() : void {
	addr_directPage_indirect_long.step3();
}

export function step4() : void {
	addr_directPage_indirect_long.step4();

	indirect = addr_directPage_indirect_long.indirect;
	effective = addr_directPage_indirect_long.effective;

	if (flags.X || flags.E) {
		effective += registers.Y_low;
	}

	else {
		effective += registers.Y;
	}
}

/**
 * Direct Page Indirect Long Indexed,Y Addressing
 *
 *     op [dp],Y
 *
 * Returns the DP Indirect Long Address + Y. The byte in the operand is added to the 16-bits
 * in D, and fetches the 24-bit address stored at $00:{D + operand}. Y is then added onto the
 * 24-bit address.
 */
export class Instruction_addr_directPage_indirect_long_indexedY extends instruction.Instruction {
	constructor(protected readonly instruction: instruction.callback.u24_op) {
		super();
	}

	public exec() : bool {
		switch (this.step) {
			case 0:
				step0();
				this.step++;
				return false;
			
			case 1:
				step1();
				this.step++;
				return false;
				
			case 2:
				step2();
				this.step++;
				return false;
				
			case 3:
				step3();
				this.step++;
				return false;
			
			case 4:
				step4();
				this.step = instruction.firstStep;
				// fallthrough

			default:
				const finished = this.instruction(this, effective);

				if (finished) {
					this.step = 0;
				}

				return finished;
		}
	}
}
