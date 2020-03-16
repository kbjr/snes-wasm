
import { bus } from '../../bus';
import { addr_immediate } from './immediate';
import { instruction } from '../instruction';

/**
 * Block Move Addressing
 *
 *     op srcbk,destbk
 *
 * Used for block move operations. Returns the destination and source banks. Despite
 * assembler ordering the operands src, then dest, the actual compiled operands are
 * dest, then src.
 */
export namespace addr_blockMove {
	/** The destination bank */
	export let dest: bus.long = 0;
	
	/** The source bank */
	export let source: bus.long = 0;

	export const step0 = addr_immediate._u16.step0;
	export const step1 = addr_immediate._u16.step1;

	export function step2() : void {
		addr_immediate._u16.step2();

		dest = addr_immediate._u16.$0;
		source = addr_immediate._u16.$1;
	}

	export class Instruction extends instruction.Instruction {
		constructor(protected readonly instruction: instruction.callback.block_move_op) {
			super();
		}
	
		public step: u8 = 0;
	
		public exec() : bool {
			switch (this.step) {
				case 0:
					addr_blockMove.step0();
					this.step++;
					return false;
				
				case 1:
					addr_blockMove.step1();
					this.step++;
					return false;
				
				case 2:
					addr_blockMove.step2();
					this.step++;
					// fallthrough
	
				default:
					const finished = this.instruction(addr_blockMove.source, addr_blockMove.dest);
	
					if (finished) {
						this.step = 0;
					}
	
					return finished;
			}
		}
	}
}
