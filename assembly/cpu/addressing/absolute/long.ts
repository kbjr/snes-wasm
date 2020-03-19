
import { bus } from '../../../bus';
import { instruction } from '../../instruction';
import * as addr_immediate_u24 from '../immediate/u24';

/** The resolved, effective address */
export let effective: bus.long = 0;

export function step0() : void {
	addr_immediate_u24.step0();
}

export function step1() : void {
	addr_immediate_u24.step1();
}

export function step2() : void {
	addr_immediate_u24.step2();
}

export function step3() : void {
	addr_immediate_u24.step3();

	effective = addr_immediate_u24.operand;
}

/**
 * Absolute Long Addressing
 *
 *     op long
 *
 * Maps absolute long addressing operands (24-bits) to a bank/address and returns
 * the address.
 */
export class Instruction_addr_absolute_long extends instruction.Instruction {
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