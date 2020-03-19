
import { u24 } from '../../../u24';
import { bus } from '../../../bus';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import * as addr_directPage_indexedX from './indexed-x';

export let indirect: u24.native = 0;
export let effective: u24.native = 0;

export function step0() : void {
	addr_directPage_indexedX.step0();
}

export function step1() : void {
	addr_directPage_indexedX.step1();

	indirect = addr_directPage_indexedX.effective;
	
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
 * Direct Page Indexed Indirect,X Addressing
 * 
 *     op (dp,X)
 *
 * Locates an indirect address at $00:${DP + X + Operand}. The effective address (the return
 * value) is the indirect address, in the DBR bank.
 */
export class Instruction_addr_directPage_indexedX_indirect extends instruction.Instruction {
	constructor(protected readonly instruction: instruction.callback.u24_op) {
		super();
	}

	public step: u8 = 0;

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
