
import { u24 } from '../../../u24';
import { bus } from '../../../bus';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import * as addr_directPage from './direct-page';

export let indirect: u24.native = 0;
export let effective: u24.native = 0;

export function step0() : void {
	addr_directPage.step0();
}

export function step1() : void {
	addr_directPage.step1();

	indirect = addr_directPage.effective;
	
	// Prepare to read the low byte of the effective address
	bus.read.setup(indirect);
}

export function step2() : void {
	// Clear the effective address to we can start writing here
	effective = 0x000000;

	// Write the DBR in as the bank
	effective |= <u32>registers.DBR << 16;

	// Read the low byte of the effective address
	effective |= bus.read.fetch();

	// Prepare to read the high byte
	bus.read.setup(indirect + 1);
}

export function step3() : void {
	// Read the high byte of the effective address
	effective |= bus.read.fetch();
}

/**
 * Direct Page Indirect Addressing
 *
 *     op (dp)
 *
 * Returns the DP Indirect Address. The byte in the operand is added to the 16-bits in D, and
 * fetches the 16-bit address stored at $00:{D + operand}.
 */
export class Instruction_addr_directPage_indirect extends instruction.Instruction {
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
