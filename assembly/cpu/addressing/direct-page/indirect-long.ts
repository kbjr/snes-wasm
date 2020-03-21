
import { u24 } from '../../../u24';
import { bus } from '../../../bus';
import { instruction } from '../../instruction';
import * as addr_directPage_indirect from './indirect';

export let indirect: u24.native = 0;
export let effective: u24.native = 0;

export function step0() : void {
	addr_directPage_indirect.step0();
}

export function step1() : void {
	addr_directPage_indirect.step1();
}

export function step2() : void {
	addr_directPage_indirect.step2();
}

export function step3() : void {
	addr_directPage_indirect.step3();

	indirect = addr_directPage_indirect.indirect;
	effective = addr_directPage_indirect.effective;

	// Prepare to read the third byte from the indirect address
	bus.read.setup(indirect + 2);
}

export function step4() : void {
	// Pull in the third byte as the bank of the effective address
	effective &= 0x00ffff;
	effective |= <u32>bus.read.fetch() << 16;
}

/**
 * Direct Page Indirect Long Addressing
 *
 *     op [dp]
 *
 * Returns the DP Indirect Long Address. The byte in the operand is added to the 16-bits in D, and
 * fetches the 24-bit address stored at $00:{D + operand}.
 */
export class Instruction_addr_directPage_indirect_long extends instruction.Instruction {
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
