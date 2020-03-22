
import { u24 } from '../../../u24';
import { bus } from '../../../bus';
import { flags } from '../../flags';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import * as addr_absolute from './absolute';

export let indirect: bus.long = 0;

/** The resolved, effective address */
export let effective: bus.long = 0;
	
export function step0() : void {
	addr_absolute.step0();
}

export function step1() : void {
	addr_absolute.step1();
}

export function step2() : void {
	addr_absolute.step2();

	indirect = addr_absolute.effective & 0xffff;

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
 * Absolute Indirect Addressing
 *
 *     op (addr)
 *
 * Maps absolute addressing operands (16-bits) to an indirect address in bank $00,
 * and resolves the 16-bit effective address from the indirect in PBR bank.
 */
export class Instruction_addr_absolute_indirect extends instruction.Instruction {
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
