
import { flags } from '../../flags';
import { instruction } from '../../instruction';
import * as addr_immediate_u8 from './u8';
import * as addr_immediate_u16 from './u16';

/**
 * Immediate Addressing
 *
 *     op #const
 *
 * In immediate addressing, the data is read from the operand(s). This reads
 * the next u8 or u16 from the PC, and increments the PC for each byte read.
 */
export class Instruction_addr_immediate extends instruction.Instruction {
	constructor(
		protected readonly u8_instruction: instruction.callback.u8_op,
		protected readonly u16_instruction: instruction.callback.u16_op
	) {
		super();
	}

	protected is8Bit: bool = false;

	public exec() : bool {
		if (this.step === 0) {
			this.is8Bit = flags.E || flags.M;
		}

		if (this.is8Bit) {
			return this.exec_u8();
		}

		return this.exec_u16();
	}

	public exec_u8() : bool {
		switch (this.step) {
			case 0:
				addr_immediate_u8.step0();
				this.step++;
				return false;
			
			case 1:
				addr_immediate_u8.step1();
				this.step = instruction.firstStep;
				// fallthrough

			default:
				const finished = this.u8_instruction(this, addr_immediate_u8.operand);

				if (finished) {
					this.step = 0;
				}

				return finished;
		}
	}

	public exec_u16() : bool {
		switch (this.step) {
			case 0:
				addr_immediate_u16.step0();
				this.step++;
				return false;
			
			case 1:
				addr_immediate_u16.step1();
				this.step++;
				return false;
			
			case 2:
				addr_immediate_u16.step2();
				this.step = instruction.firstStep;
				// fallthrough

			default:
				const finished = this.u16_instruction(this, addr_immediate_u16.operand);

				if (finished) {
					this.step = 0;
				}

				return finished;
		}
	}
}
