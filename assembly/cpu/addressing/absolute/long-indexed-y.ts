
import { u16_util } from '../../../u16';
import { u24 } from '../../../u24';
import { bus } from '../../../bus';
import { flags } from '../../flags';
import { registers } from '../../registers';
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

	let addr: bus.addr = u16_util.from_u8(addr_immediate_u24.$0, addr_immediate_u24.$1);

	if (flags.E || flags.X) {
		addr += registers.Y_low;
	}

	else {
		addr += registers.Y;
	}

	effective = u24.from_bank_addr(addr_immediate_u24.$2, addr);
}

/**
 * Absolute Long Indexed,Y Addressing
 *
 *     op long,Y
 *
 * Maps absolute long addressing operands (24-bits) to a bank/address and returns
 * the address.
 *
 * TODO: Verify overflow behavior (does overflow in addr when adding increment bank?)
 */
export class Instruction_addr_absolute_long_indexedY extends instruction.Instruction {
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
