
import { u24 } from '../../../u24';
import { bus } from '../../../bus';
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import * as addr_immediate_u16 from '../immediate/u16';

export let indirect: bus.long = 0;
export let effective: bus.long = 0;
	
export function step0() : void {
	addr_immediate_u16.step0();
}

export function step1() : void {
	addr_immediate_u16.step1();
}

export function step2() : void {
	addr_immediate_u16.step2();

	let addr: bus.addr = addr_immediate_u16.operand;

	if (flags.E || flags.X) {
		addr += registers.X_low;
	}

	else {
		addr += registers.X;
	}

	indirect = u24.from_bank_addr(registers.PBR, addr);

	bus.read.setup(indirect);
}

export function step3() : void {
	effective = 0x000000;

	effective |= <u32>registers.PBR << 16;
	effective |= bus.read.fetch();

	bus.read.setup(indirect + 1);
}

export function step4() : void {
	effective |= <u32>bus.read.fetch() << 8;
}

/**
 * Absolute Indexed Indirect,X Addressing
 *
 *     op (addr,X)
 *
 * Maps absolute addressing operands (16-bits) to a bank/address in the PBR bank
 * and resolves the indirect address to the effective address in the PBR bank.
 */
export class Instruction_addr_absolute_indexedX_indirect extends instruction.Instruction {
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
