
import { u24 } from '../../../u24';
import { bus } from '../../../bus';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import * as addr_immediate_u16 from '../immediate/u16';

/** The resolved, effective address */
export let effective: bus.long = 0;

export function step0() : void {
	addr_immediate_u16.step0();
}

export function step1() : void {
	addr_immediate_u16.step1();
}

export function step2() : void {
	addr_immediate_u16.step2();

	effective = u24.from_bank_addr(registers.DBR, addr_immediate_u16.operand);
}

/**
 * Absolute Addressing
 *
 *     op addr
 *
 * Maps absolute addressing operands (16-bits) to a bank/address in the DBR bank
 * and returns the address.
 */
export class Instruction_addr_absolute extends instruction.Instruction {
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