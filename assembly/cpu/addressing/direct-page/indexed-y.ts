
import { u24 } from '../../../u24';
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import * as addr_directPage from './direct-page';

export let effective: u24.native = 0;

export function step0() : void {
	addr_directPage.step0();
}

export function step1() : void {
	addr_directPage.step1();

	effective = addr_directPage.effective;

	if (flags.X || flags.E) {
		effective += registers.Y_low;
	}

	else {
		effective += registers.Y;
	}

	effective &= 0xffff;
}

/**
 * Direct Page Indexed,Y Addressing
 * 
 *     op dp,Y
 *
 * Returns the DP Address + Y. The byte in the operand is added to the 16-bits
 * in D and the (8 or) 16 bits in Y.
 */
export class Instruction_addr_directPage_indexedY extends instruction.Instruction {
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
