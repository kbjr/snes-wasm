
import { u24 } from '../../../u24';
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import * as addr_immediate_u8 from '../immediate/u8';

/** The effective address */
export let effective: u24.native = 0;

export function step0() : void {
	addr_immediate_u8.step0();
}

export function step1() : void {
	addr_immediate_u8.step1();

	// We read the operand as a signed integer
	const offset = <i8>addr_immediate_u8.operand;

	// Add the operand to the program counter
	effective = (<u32>registers.PBR << 16) | (<u32>(registers.PC + offset) & 0xffff);
}

/**
 * Program Counter Relative Addressing
 *
 *     op nearlabel
 *
 * Points to an address relative to the Program Counter (PC). Returns the bank/address.
 */
export class Instruction_addr_programCounterRelative extends instruction.Instruction {
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
