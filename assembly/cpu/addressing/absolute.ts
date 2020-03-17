
import { u16_util } from '../../u16';
import { u24 } from '../../u24';
import { bus } from '../../bus';
import { flags } from '../flags';
import { registers } from '../registers';
import { addr_immediate } from './immediate';
import { instruction } from '../instruction';

/**
 * Absolute Addressing
 *
 *     op addr
 *
 * Maps absolute addressing operands (16-bits) to a bank/address in the DBR bank
 * and returns the address.
 */
export namespace addr_absolute {
	/** The resolved, effective address */
	export let effective: bus.long = 0;

	export function step0() : void {
		addr_immediate._u16.step0();
	}

	export function step1() : void {
		addr_immediate._u16.step1();
	}

	export function step2() : void {
		addr_immediate._u16.step2();

		effective = u24.from_bank_addr(registers.DBR, addr_immediate._u16.operand);
	}

	export class Instruction extends instruction.Instruction {
		constructor(protected readonly instruction: instruction.callback.u24_op) {
			super();
		}
	
		public exec() : bool {
			switch (this.step) {
				case 0:
					addr_absolute.step0();
					this.step++;
					return false;
				
				case 1:
					addr_absolute.step1();
					this.step++;
					return false;
				
				case 2:
					addr_absolute.step2();
					this.step = instruction.firstStep;
					// fallthrough
	
				default:
					const finished = this.instruction(this, addr_absolute.effective);
	
					if (finished) {
						this.step = 0;
					}
	
					return finished;
			}
		}
	}





	// ===== Sub-types =====

	/**
	 * Absolute Indexed,X Addressing
	 *
	 *     op addr,X
	 *
	 * Maps absolute addressing operands (16-bits) to a bank/address in the DBR bank
	 * and returns the address.
	 */
	export namespace indexedX {
		/** The resolved, effective address */
		export let effective: bus.long = 0;
	
		export function step0() : void {
			addr_immediate._u16.step0();
		}

		export function step1() : void {
			addr_immediate._u16.step1();
		}
	
		export function step2() : void {
			addr_immediate._u16.step2();
	
			let addr: bus.addr = addr_immediate._u16.operand;
	
			if (flags.E || flags.X) {
				addr += registers.X_low;
			}
	
			else {
				addr += registers.X;
			}
	
			effective = u24.from_bank_addr(registers.DBR, addr);
		}

		export class Instruction extends instruction.Instruction {
			constructor(protected readonly instruction: instruction.callback.u24_op) {
				super();
			}
		
			public exec() : bool {
				switch (this.step) {
					case 0:
						addr_absolute.indexedX.step0();
						this.step++;
						return false;
					
					case 1:
						addr_absolute.indexedX.step1();
						this.step++;
						return false;
					
					case 2:
						addr_absolute.indexedX.step2();
						this.step = instruction.firstStep;
						// fallthrough
		
					default:
						const finished = this.instruction(this, addr_absolute.indexedX.effective);
		
						if (finished) {
							this.step = 0;
						}
		
						return finished;
				}
			}
		}
	}

	/**
	 * Absolute Indexed,Y Addressing
	 *
	 *     op addr,Y
	 *
	 * Maps absolute addressing operands (16-bits) to a bank/address in the DBR bank
	 * and returns the address.
	 */
	export namespace indexedY {
		/** The resolved, effective address */
		export let effective: bus.long = 0;
	
		export function step0() : void {
			addr_immediate._u16.step0();
		}

		export function step1() : void {
			addr_immediate._u16.step1();
		}
	
		export function step2() : void {
			addr_immediate._u16.step2();
	
			let addr: bus.addr = addr_immediate._u16.operand;
	
			if (flags.E || flags.X) {
				addr += registers.Y_low;
			}
	
			else {
				addr += registers.Y;
			}
	
			effective = u24.from_bank_addr(registers.DBR, addr);
		}

		export class Instruction extends instruction.Instruction {
			constructor(protected readonly instruction: instruction.callback.u24_op) {
				super();
			}
		
			public exec() : bool {
				switch (this.step) {
					case 0:
						addr_absolute.indexedY.step0();
						this.step++;
						return false;
					
					case 1:
						addr_absolute.indexedY.step1();
						this.step++;
						return false;
					
					case 2:
						addr_absolute.indexedY.step2();
						this.step = instruction.firstStep;
						// fallthrough
		
					default:
						const finished = this.instruction(this, addr_absolute.indexedY.effective);
		
						if (finished) {
							this.step = 0;
						}
		
						return finished;
				}
			}
		}
	}

	/**
	 * Absolute Long Addressing
	 *
	 *     op long
	 *
	 * Maps absolute long addressing operands (24-bits) to a bank/address and returns
	 * the address.
	 */
	export namespace long {
		/** The resolved, effective address */
		export let effective: bus.long = 0;
	
		export function step0() : void {
			addr_immediate._u24.step0();
		}

		export function step1() : void {
			addr_immediate._u24.step1();
		}

		export function step2() : void {
			addr_immediate._u24.step2();
		}

		export function step3() : void {
			addr_immediate._u24.step3();
	
			effective = addr_immediate._u24.operand;
		}

		export class Instruction extends instruction.Instruction {
			constructor(protected readonly instruction: instruction.callback.u24_op) {
				super();
			}
		
			public exec() : bool {
				switch (this.step) {
					case 0:
						addr_absolute.long.step0();
						this.step++;
						return false;
					
					case 1:
						addr_absolute.long.step1();
						this.step++;
						return false;
				
					case 2:
						addr_absolute.long.step2();
						this.step++;
						return false;
					
					case 3:
						addr_absolute.long.step3();
						this.step = instruction.firstStep;
						// fallthrough
		
					default:
						const finished = this.instruction(this, addr_absolute.long.effective);
		
						if (finished) {
							this.step = 0;
						}
		
						return finished;
				}
			}
		}

		/**
		 * Absolute Long Indexed,X Addressing
		 *
		 *     op long,X
		 *
		 * Maps absolute long addressing operands (24-bits) to a bank/address and returns
		 * the address.
		 *
		 * TODO: Verify overflow behavior (does overflow in addr when adding increment bank?)
		 */
		export namespace indexedX {
			/** The resolved, effective address */
			export let effective: bus.long = 0;
		
			export function step0() : void {
				addr_immediate._u24.step0();
			}

			export function step1() : void {
				addr_immediate._u24.step1();
			}

			export function step2() : void {
				addr_immediate._u24.step2();
			}
			
			export function step3() : void {
				addr_immediate._u24.step3();
		
				let addr: bus.addr = u16_util.from_u8(addr_immediate._u24.$0, addr_immediate._u24.$1);
		
				if (flags.E || flags.X) {
					addr += registers.X_low;
				}
		
				else {
					addr += registers.X;
				}
		
				effective = u24.from_bank_addr(addr_immediate._u24.$2, addr);
			}

			export class Instruction extends instruction.Instruction {
				constructor(protected readonly instruction: instruction.callback.u24_op) {
					super();
				}
			
				public exec() : bool {
					switch (this.step) {
						case 0:
							addr_absolute.long.indexedX.step0();
							this.step++;
							return false;
						
						case 1:
							addr_absolute.long.indexedX.step1();
							this.step++;
							return false;
					
						case 2:
							addr_absolute.long.indexedX.step2();
							this.step++;
							return false;
						
						case 3:
							addr_absolute.long.indexedX.step3();
							this.step = instruction.firstStep;
							// fallthrough
			
						default:
							const finished = this.instruction(this, addr_absolute.long.indexedX.effective);
			
							if (finished) {
								this.step = 0;
							}
			
							return finished;
					}
				}
			}
		}

		/**
		 * Absolute Long Indexed,Y Addressing
		 *
		 *     op long,Y
		 *
		 * Maps absolute long addressing operands (24-bits) to a bank/address and returns
		 * the address.
		 *
		 * TODO: Verify overflow behavior (does overflow in addr when adding increment bank?)
		 */
		export namespace indexedY {
			/** The resolved, effective address */
			export let effective: bus.long = 0;
		
			export function step0() : void {
				addr_immediate._u24.step0();
			}

			export function step1() : void {
				addr_immediate._u24.step1();
			}
			
			export function step2() : void {
				addr_immediate._u24.step2();
			}

			export function step3() : void {
				addr_immediate._u24.step3();
		
				let addr: bus.addr = u16_util.from_u8(addr_immediate._u24.$0, addr_immediate._u24.$1);
		
				if (flags.E || flags.X) {
					addr += registers.Y_low;
				}
		
				else {
					addr += registers.Y;
				}
		
				effective = u24.from_bank_addr(addr_immediate._u24.$2, addr);
			}

			export class Instruction extends instruction.Instruction {
				constructor(protected readonly instruction: instruction.callback.u24_op) {
					super();
				}
			
				public exec() : bool {
					switch (this.step) {
						case 0:
							addr_absolute.long.indexedY.step0();
							this.step++;
							return false;
						
						case 1:
							addr_absolute.long.indexedY.step1();
							this.step++;
							return false;
					
						case 2:
							addr_absolute.long.indexedY.step2();
							this.step++;
							return false;
						
						case 3:
							addr_absolute.long.indexedY.step3();
							this.step = instruction.firstStep;
							// fallthrough
			
						default:
							const finished = this.instruction(this, addr_absolute.long.indexedY.effective);
			
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
