
import { u24 } from '../../u24';
import { registers } from '../registers';
import { addr_immediate } from './immediate';
import { instruction } from '../instruction';

/**
 * Program Counter Relative Addressing
 *
 *     op nearlabel
 *
 * Points to an address relative to the Program Counter (PC). Returns the bank/address.
 */
export namespace addr_programCounterRelative {
	/** The effective address */
	export let effective: u24.native = 0;

	export const step0 = addr_immediate._u8.step0;

	export function step1() : void {
		addr_immediate._u8.step1();

		// We read the operand as a signed integer
		const offset = <i8>addr_immediate._u8.operand;

		// Add the operand to the program counter
		effective = (<u32>registers.PBR << 16) | (<u32>(registers.PC + offset) & 0xffff);
	}

	export class Instruction extends instruction.Instruction {
		constructor(protected readonly instruction: instruction.callback.u24_op) {
			super();
		}
	
		public exec() : bool {
			switch (this.step) {
				case 0:
					addr_programCounterRelative.step0();
					this.step++;
					return false;
				
				case 1:
					addr_programCounterRelative.step1();
					this.step = instruction.firstStep;
					// fallthrough
	
				default:
					const finished = this.instruction(this, addr_programCounterRelative.effective);
	
					if (finished) {
						this.step = 0;
					}
	
					return finished;
			}
		}
	}





	// ===== Sub-types =====

	/**
	 * Program Counter Relative Long Addressing
	 *
	 *     op label
	 *
	 * Points to an address relative to the Program Counter (PC). Returns the bank/address.
	 */
	export namespace long {
		/** The effective address */
		export let effective: u24.native = 0;

		export const step0 = addr_immediate._u16.step0;
		export const step1 = addr_immediate._u16.step1;

		export function step2() : void {
			addr_immediate._u16.step2();

			// We read the operand as a signed integer
			const offset = <i16>addr_immediate._u16.operand;

			// Add the operand to the program counter
			effective = (<u32>registers.PBR << 16) | (<u32>(registers.PC + offset) & 0xffff);
		}

		export class Instruction extends instruction.Instruction {
			constructor(protected readonly instruction: instruction.callback.u24_op) {
				super();
			}
		
			public exec() : bool {
				switch (this.step) {
					case 0:
						addr_programCounterRelative.long.step0();
						this.step++;
						return false;

					case 1:
						addr_programCounterRelative.long.step1();
						this.step++;
						return false;
					
					case 2:
						addr_programCounterRelative.long.step2();
						this.step = instruction.firstStep;
						// fallthrough
		
					default:
						const finished = this.instruction(this, addr_programCounterRelative.long.effective);
		
						if (finished) {
							this.step = 0;
						}
		
						return finished;
				}
			}
		}
	}
}
