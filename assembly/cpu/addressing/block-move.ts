
import { bus } from '../../bus';
import { instruction } from '../instruction';
import * as addr_immediate_u16 from './immediate/u16';

/** The destination bank */
export let dest: bus.long = 0;

/** The source bank */
export let source: bus.long = 0;

export function step0() : void {
	addr_immediate_u16.step0();
}

export function step1() : void {
	addr_immediate_u16.step1();
}

export function step2() : void {
	addr_immediate_u16.step2();

	dest = addr_immediate_u16.$0;
	source = addr_immediate_u16.$1;
}

/**
 * Block Move Addressing
 *
 *     op srcbk,destbk
 *
 * Used for block move operations. Returns the destination and source banks. Despite
 * assembler ordering the operands src, then dest, the actual compiled operands are
 * dest, then src.
 */
export class Instruction_addr_blockMove extends instruction.Instruction {
	constructor(protected readonly instruction: instruction.callback.block_move_op) {
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
				const finished = this.instruction(this, source, dest);

				if (finished) {
					this.step = 0;
				}

				return finished;
		}
	}
}
