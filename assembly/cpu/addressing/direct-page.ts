
import { bus } from '../../bus';
import { instruction } from '../instruction';
import { flags } from '../flags';
import { registers } from '../registers';
import { addr_immediate } from './immediate';
import { u24 } from '../../u24';

/**
 * Direct Page Addressing
 * 
 *     op dp
 *
 * Returns the DP Address. The byte in the operand is added to the 16-bits
 * in D, and the data is read from that calculated address. Always reads data from bank $00.
 */
export namespace addr_directPage {
	export let effective: u24.native = 0;

	export function step0() : void {
		addr_immediate._u8.step0();
	}

	export function step1() : void {
		addr_immediate._u8.step1();

		const D = registers.D;
		
		// Count 1 extra cycle if the low byte of `D` is non-zero
		if (D & 0x00ff) {
			bus.cycles++;
		}

		effective = <u32>(D + addr_immediate._u8.operand) & 0xffff;
	}

	export class Instruction extends instruction.Instruction {
		constructor(protected readonly instruction: instruction.callback.u24_op) {
			super();
		}
	
		public exec() : bool {
			switch (this.step) {
				case 0:
					addr_directPage.step0();
					this.step++;
					return false;
				
				case 1:
					addr_directPage.step1();
					this.step = instruction.firstStep;
					// fallthrough
	
				default:
					const finished = this.instruction(this, addr_directPage.effective);
	
					if (finished) {
						this.step = 0;
					}
	
					return finished;
			}
		}
	}





	// ===== Sub-types =====

	/**
	 * Direct Page Indexed,X Addressing
	 * 
	 *     op dp,X
	 *
	 * Returns the DP Address + X. The byte in the operand is added to the 16-bits
	 * in D and the (8 or) 16 bits in X.
	 */
	export namespace indexedX {
		export let effective: u24.native = 0;

		export function step0() : void {
			addr_directPage.step0();
		}

		export function step1() : void {
			addr_directPage.step1();

			effective = addr_directPage.effective;

			if (flags.X || flags.E) {
				effective += registers.X_low;
			}

			else {
				effective += registers.X;
			}

			effective &= 0xffff;
		}

		export class Instruction extends instruction.Instruction {
			constructor(protected readonly instruction: instruction.callback.u24_op) {
				super();
			}
		
			public step: u8 = 0;
		
			public exec() : bool {
				switch (this.step) {
					case 0:
						addr_directPage.indexedX.step0();
						this.step++;
						return false;
					
					case 1:
						addr_directPage.indexedX.step1();
						this.step = instruction.firstStep;
						// fallthrough
		
					default:
						const finished = this.instruction(this, addr_directPage.indexedX.effective);
		
						if (finished) {
							this.step = 0;
						}
		
						return finished;
				}
			}
		}





		/**
		 * Direct Page Indexed Indirect,X Addressing
		 * 
		 *     op (dp,X)
		 *
		 * Locates an indirect address at $00:${DP + X + Operand}. The effective address (the return
		 * value) is the indirect address, in the DBR bank.
		 */
		export namespace indirect {
			export let indirect: u24.native = 0;
			export let effective: u24.native = 0;
		
			export function step0() : void {
				addr_directPage.indexedX.step0();
			}
	
			export function step1() : void {
				addr_directPage.indexedX.step1();
	
				indirect = addr_directPage.indexedX.effective;
				
				// Prepare to read the low byte of the effective address
				bus.read.setup(indirect);
			}
			
			export function step2() : void {
				// Clear the effective address to we can start writing here
				effective = 0x000000;
	
				// Write the DBR in as the bank
				effective |= <u32>registers.DBR << 16;
	
				// Read the low byte of the effective address
				effective |= bus.read.fetch();
	
				// Prepare to read the high byte
				bus.read.setup(indirect + 1);
			}
	
			export function step3() : void {
				// Read the high byte of the effective address
				effective |= bus.read.fetch();
			}
		
			export class Instruction extends instruction.Instruction {
				constructor(protected readonly instruction: instruction.callback.u24_op) {
					super();
				}
			
				public step: u8 = 0;
			
				public exec() : bool {
					switch (this.step) {
						case 0:
							addr_directPage.indexedX.indirect.step0();
							this.step++;
							return false;
						
						case 1:
							addr_directPage.indexedX.indirect.step1();
							this.step++;
							return false;
							
						case 2:
							addr_directPage.indexedX.indirect.step2();
							this.step++;
							return false;
						
						case 3:
							addr_directPage.indexedX.indirect.step3();
							this.step = instruction.firstStep;
							// fallthrough
			
						default:
							const finished = this.instruction(this, addr_directPage.indexedX.indirect.effective);
			
							if (finished) {
								this.step = 0;
							}
			
							return finished;
					}
				}
			}
		}
	}





	/**
	 * Direct Page Indexed,Y Addressing
	 * 
	 *     op dp,Y
	 *
	 * Returns the DP Address + Y. The byte in the operand is added to the 16-bits
	 * in D and the (8 or) 16 bits in Y.
	 */
	export namespace indexedY {
		export let effective: u24.native = 0;

		export function step0() : void {
			addr_directPage.step0();
		}

		export function step1() : void {
			addr_directPage.step1();

			effective = addr_directPage.effective;

			if (flags.X || flags.E) {
				effective += registers.Y_low;
			}

			else {
				effective += registers.Y;
			}

			effective &= 0xffff;
		}

		export class Instruction extends instruction.Instruction {
			constructor(protected readonly instruction: instruction.callback.u24_op) {
				super();
			}
		
			public exec() : bool {
				switch (this.step) {
					case 0:
						addr_directPage.indexedY.step0();
						this.step++;
						return false;
					
					case 1:
						addr_directPage.indexedY.step1();
						this.step = instruction.firstStep;
						// fallthrough
		
					default:
						const finished = this.instruction(this, addr_directPage.indexedY.effective);
		
						if (finished) {
							this.step = 0;
						}
		
						return finished;
				}
			}
		}
	}





	/**
	 * Direct Page Indirect Addressing
	 *
	 *     op (dp)
	 *
	 * Returns the DP Indirect Address. The byte in the operand is added to the 16-bits in D, and
	 * fetches the 16-bit address stored at $00:{D + operand}.
	 */
	export namespace indirect {
		export let indirect: u24.native = 0;
		export let effective: u24.native = 0;
	
		export function step0() : void {
			addr_directPage.step0();
		}

		export function step1() : void {
			addr_directPage.step1();

			indirect = addr_directPage.effective;
			
			// Prepare to read the low byte of the effective address
			bus.read.setup(indirect);
		}
		
		export function step2() : void {
			// Clear the effective address to we can start writing here
			effective = 0x000000;

			// Write the DBR in as the bank
			effective |= <u32>registers.DBR << 16;

			// Read the low byte of the effective address
			effective |= bus.read.fetch();

			// Prepare to read the high byte
			bus.read.setup(indirect + 1);
		}

		export function step3() : void {
			// Read the high byte of the effective address
			effective |= bus.read.fetch();
		}
	
		export class Instruction extends instruction.Instruction {
			constructor(protected readonly instruction: instruction.callback.u24_op) {
				super();
			}
		
			public exec() : bool {
				switch (this.step) {
					case 0:
						addr_directPage.indirect.step0();
						this.step++;
						return false;
					
					case 1:
						addr_directPage.indirect.step1();
						this.step++;
						return false;
						
					case 2:
						addr_directPage.indirect.step2();
						this.step++;
						return false;
					
					case 3:
						addr_directPage.indirect.step3();
						this.step = instruction.firstStep;
						// fallthrough
		
					default:
						const finished = this.instruction(this, addr_directPage.indirect.effective);
		
						if (finished) {
							this.step = 0;
						}
		
						return finished;
				}
			}
		}





		/**
		 * Direct Page Indirect Indexed,Y Addressing
		 * 
		 *     op (dp),Y
		 *
		 * Locates an indirect address at $00:${DP + Operand}. The effective address (the return value)
		 * is the indirect address, in the DBR bank + Y.
		 */
		export namespace indexedY {
			export let effective: u24.native = 0;
		
			export function step0() : void {
				addr_directPage.indirect.step0();
			}

			export function step1() : void {
				addr_directPage.indirect.step1();
			}

			export function step2() : void {
				addr_directPage.indirect.step2();
			}
	
			export function step3() : void {
				addr_directPage.indirect.step3();

				effective = addr_directPage.indirect.effective;

				if (flags.E || flags.X) {
					effective += registers.Y_low;
				}

				else {
					effective += registers.Y;
				}

				// TODO: Is preventing overflow into the bank correct here?
				effective &= 0x00ffff;
				effective |= registers.DBR;
			}
		
			export class Instruction extends instruction.Instruction {
				constructor(protected readonly instruction: instruction.callback.u24_op) {
					super();
				}
			
				public exec() : bool {
					switch (this.step) {
						case 0:
							addr_directPage.indirect.indexedY.step0();
							this.step++;
							return false;
						
						case 1:
							addr_directPage.indirect.indexedY.step1();
							this.step++;
							return false;
							
						case 2:
							addr_directPage.indirect.indexedY.step2();
							this.step++;
							return false;
						
						case 3:
							addr_directPage.indirect.indexedY.step3();
							this.step = instruction.firstStep;
							// fallthrough
			
						default:
							const finished = this.instruction(this, addr_directPage.indirect.indexedY.effective);
			
							if (finished) {
								this.step = 0;
							}
			
							return finished;
					}
				}
			}
		}





		/**
		 * Direct Page Indirect Long Addressing
		 *
		 *     op [dp]
		 *
		 * Returns the DP Indirect Long Address. The byte in the operand is added to the 16-bits in D, and
		 * fetches the 24-bit address stored at $00:{D + operand}.
		 */
		export namespace long {
			export let indirect: u24.native = 0;
			export let effective: u24.native = 0;
		
			export function step0() : void {
				addr_directPage.indirect.step0();
			}

			export function step1() : void {
				addr_directPage.indirect.step1();
			}

			export function step2() : void {
				addr_directPage.indirect.step2();
			}
	
			export function step3() : void {
				addr_directPage.indirect.step3();

				indirect = addr_directPage.indirect.indirect;
				effective = addr_directPage.indirect.effective;

				// Prepare to read the third byte from the indirect address
				bus.read.setup(indirect + 2);
			}

			export function step4() : void {
				// Pull in the third byte as the bank of the effective address
				effective &= 0x00ffff;
				effective |= <u32>bus.read.fetch() << 16;
			}
		
			export class Instruction extends instruction.Instruction {
				constructor(protected readonly instruction: instruction.callback.u24_op) {
					super();
				}
			
				public exec() : bool {
					switch (this.step) {
						case 0:
							addr_directPage.indirect.long.step0();
							this.step++;
							return false;
						
						case 1:
							addr_directPage.indirect.long.step1();
							this.step++;
							return false;
							
						case 2:
							addr_directPage.indirect.long.step2();
							this.step++;
							return false;
							
						case 3:
							addr_directPage.indirect.long.step3();
							this.step++;
							return false;
						
						case 4:
							addr_directPage.indirect.long.step4();
							this.step = instruction.firstStep;
							// fallthrough
			
						default:
							const finished = this.instruction(this, addr_directPage.indirect.long.effective);
			
							if (finished) {
								this.step = 0;
							}
			
							return finished;
					}
				}
			}





			/**
			 * Direct Page Indirect Long Indexed,Y Addressing
			 *
			 *     op [dp],Y
			 *
			 * Returns the DP Indirect Long Address + Y. The byte in the operand is added to the 16-bits
			 * in D, and fetches the 24-bit address stored at $00:{D + operand}. Y is then added onto the
			 * 24-bit address.
			 */
			export namespace indexedY {
				export let indirect: u24.native = 0;
				export let effective: u24.native = 0;
			
				export function step0() : void {
					addr_directPage.indirect.long.step0();
				}

				export function step1() : void {
					addr_directPage.indirect.long.step1();
				}

				export function step2() : void {
					addr_directPage.indirect.long.step2();
				}
				
				export function step3() : void {
					addr_directPage.indirect.long.step3();
				}
	
				export function step4() : void {
					addr_directPage.indirect.long.step4();

					indirect = addr_directPage.indirect.long.indirect;
					effective = addr_directPage.indirect.long.effective;

					if (flags.X || flags.E) {
						effective += registers.Y_low;
					}

					else {
						effective += registers.Y;
					}
				}
			
				export class Instruction extends instruction.Instruction {
					constructor(protected readonly instruction: instruction.callback.u24_op) {
						super();
					}
				
					public exec() : bool {
						switch (this.step) {
							case 0:
								addr_directPage.indirect.long.indexedY.step0();
								this.step++;
								return false;
							
							case 1:
								addr_directPage.indirect.long.indexedY.step1();
								this.step++;
								return false;
								
							case 2:
								addr_directPage.indirect.long.indexedY.step2();
								this.step++;
								return false;
								
							case 3:
								addr_directPage.indirect.long.indexedY.step3();
								this.step++;
								return false;
							
							case 4:
								addr_directPage.indirect.long.indexedY.step4();
								this.step = instruction.firstStep;
								// fallthrough
				
							default:
								const finished = this.instruction(this, addr_directPage.indirect.long.indexedY.effective);
				
								if (finished) {
									this.step = 0;
								}
				
								return finished;
						}
					}
				}
			}
		}
	}
}
