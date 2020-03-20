
import { bus } from '../../../bus';
import { u24 } from '../../../u24';
import { registers } from '../../registers';
import { instruction } from '../../instruction';

/** The operand byte */
export let operand: u8 = 0;

export function step0() : void {
	bus.read.setup(u24.from_bank_addr(registers.PBR, registers.PC++));
}

export function step1() : void {
	operand = bus.read.fetch();
}

/**
 * Immediate Addressing
 *
 *     op #const
 *
 * In immediate addressing, the data is read from the operand(s). This reads
 * the next u8 from the PC, and increments the PC for each byte read.
 */
export class Instruction_addr_immediate_u8 extends instruction.Instruction {
	constructor(
		protected readonly instruction: instruction.callback.u8_op
	) {
		super();
	}

	protected is8Bit: bool = false;

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
				const finished = this.instruction(this, operand);

				if (finished) {
					this.step = 0;
				}

				return finished;
		}
	}
}
