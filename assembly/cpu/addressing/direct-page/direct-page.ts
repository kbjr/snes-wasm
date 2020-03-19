
import { u24 } from '../../../u24';
import { bus } from '../../../bus';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import * as addr_immediate_u8 from '../immediate/u8';

export let effective: u24.native = 0;

export function step0() : void {
	addr_immediate_u8.step0();
}

export function step1() : void {
	addr_immediate_u8.step1();

	const D = registers.D;
	
	// Count 1 extra cycle if the low byte of `D` is non-zero
	if (D & 0x00ff) {
		bus.cycles++;
	}

	effective = <u32>(D + addr_immediate_u8.operand) & 0xffff;
}

/**
 * Direct Page Addressing
 * 
 *     op dp
 *
 * Returns the DP Address. The byte in the operand is added to the 16-bits
 * in D, and the data is read from that calculated address. Always reads data from bank $00.
 */
export class Instruction_addr_directPage extends instruction.Instruction {
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
