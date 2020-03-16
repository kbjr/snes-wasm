
import { flags } from '../flags';
import { registers } from '../registers';
import { addr_immediate } from './immediate';
import { bus } from '../../bus';
import { instruction } from '../instruction';
import { u24 } from '../../u24';



/**
 * Stack Relative Addressing
 *
 *     op sr,S
 *
 * Points to an address relative to the Stack Pointer (S): `$00:${S + operand}`
 */
export namespace addr_stackRelative {
	/** The effective address */
	export let effective: u24.native = 0;

	export const step0 = addr_immediate._u8.step0;

	export function step1() : void {
		addr_immediate._u8.step1();

		// Add the operand to the stack pointer (always addressed in bank $00)
		effective = <u32>(registers.S + addr_immediate._u8.operand) & 0xffff;
	}

	export class Instruction extends instruction.Instruction {
		constructor(protected readonly instruction: instruction.callback.u24_op) {
			super();
		}
	
		public step: u8 = 0;
	
		public exec() : bool {
			switch (this.step) {
				case 0:
					addr_stackRelative.step0();
					this.step++;
					return false;
				
				case 1:
					addr_stackRelative.step1();
					this.step++;
					// fallthrough
	
				default:
					const finished = this.instruction(addr_stackRelative.effective);
	
					if (finished) {
						this.step = 0;
					}
	
					return finished;
			}
		}
	}





	// ===== Sub-types =====

	/**
	 * Stack Relative Indirect Indexed,Y Addressing
	 *
	 *     op (sr,S),Y
	 *
	 * Points to an indirect address relative to the Stack Pointer (S). The u16 at the
	 * indirect address `$00:${S + operand}` is then added to Y in the DBR bank to get
	 * the effective address.
	 */
	export namespace indirectIndexedY {
		/** The indirect address, before it has been resolved */
		export let indirect: u24.native = 0;
		/** The effective address */
		export let effective: u24.native = 0;
	
		export const step0 = addr_immediate._u8.step0;
	
		export function step1() : void {
			addr_immediate._u8.step1();
	
			// Add the operand to the stack pointer (always addressed in bank $00)
			indirect = <u32>(registers.S + addr_immediate._u8.operand) & 0xffff;

			// Setup the read of the low byte of the resolved address
			bus.read.setup(indirect);
		}

		export function step2() : void {
			// Start preping the effective address
			effective = 0x000000;

			// Set the bank of the effective address
			effective |= <u32>registers.DBR << 16;

			// Pull in the low byte
			effective |= <u32>bus.read.fetch();

			// Setup the next read for the high address byte
			bus.read.setup(indirect + 1);
		}

		export function step3() : void {
			// Pull in the high byte of the address
			effective |= <u32>bus.read.fetch() << 8;

			// If we're in Emulation mode, or 8-bit index register mode, add only the low byte of Y
			if (flags.E || flags.X) {
				effective += registers.Y_low;
			}

			// Otherwise, use the full 16-bits
			else {
				effective += registers.Y;
			}
		}

		export class Instruction extends instruction.Instruction {
			constructor(protected readonly instruction: instruction.callback.u24_op) {
				super();
			}
		
			public step: u8 = 0;
		
			public exec() : bool {
				switch (this.step) {
					case 0:
						addr_stackRelative.indirectIndexedY.step0();
						this.step++;
						return false;

					case 1:
						addr_stackRelative.indirectIndexedY.step1();
						this.step++;
						return false;

					case 2:
						addr_stackRelative.indirectIndexedY.step2();
						this.step++;
						return false;
					
					case 3:
						addr_stackRelative.indirectIndexedY.step3();
						this.step++;
						// fallthrough
		
					default:
						const finished = this.instruction(addr_stackRelative.indirectIndexedY.effective);
		
						if (finished) {
							this.step = 0;
						}
		
						return finished;
				}
			}
		}
	}
}
