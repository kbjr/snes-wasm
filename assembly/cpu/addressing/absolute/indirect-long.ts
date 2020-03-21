
import { bus } from '../../../bus';
import { instruction } from '../../instruction';
import * as addr_absolute_indirect from './indirect';

/** The resolved, effective address */
export let effective: bus.long = 0;
	
export function step0() : void {
	addr_absolute_indirect.step0();
}

export function step1() : void {
	addr_absolute_indirect.step1();
}

export function step2() : void {
	addr_absolute_indirect.step2();
}

export function step3() : void {
	addr_absolute_indirect.step3();
}

export function step4() : void {
	addr_absolute_indirect.step4();

	effective = addr_absolute_indirect.effective & 0xffff;

	bus.read.setup(addr_absolute_indirect.indirect + 2);
}

export function step5() : void {
	effective |= <u32>bus.read.fetch() << 16;
}

/**
 * Absolute Indirect Long Addressing
 *
 *     op [addr]
 *
 * Maps absolute addressing operands (16-bits) to an indirect address in bank $00,
 * and resolves the 16-bit effective address from the indirect in PBR bank.
 */
export class Instruction_addr_absolute_indirect_long extends instruction.Instruction {
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
				this.step++;
				return false;
			
			case 5:
				step5();
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
