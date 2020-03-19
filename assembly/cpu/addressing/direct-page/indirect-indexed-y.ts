
import { u24 } from '../../../u24';
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import * as addr_directPage_indirect from './indirect';

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

	effective = addr_directPage_indirect.effective;

	if (flags.E || flags.X) {
		effective += registers.Y_low;
	}

	else {
		effective += registers.Y;
	}

	// TODO: Is preventing overflow into the bank correct here?
	effective &= 0x00ffff;
	effective |= registers.DBR;
}

/**
 * Direct Page Indirect Indexed,Y Addressing
 * 
 *     op (dp),Y
 *
 * Locates an indirect address at $00:${DP + Operand}. The effective address (the return value)
 * is the indirect address, in the DBR bank + Y.
 */
export class Instruction_addr_directPage_indirect_indexedY extends instruction.Instruction {
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
