
import { u16 } from '../../u16';
import { u24 } from '../../u24';
import { bus } from '../../bus';
import { registers } from '../registers';
import { instruction } from '../instruction';
import { flags } from '../flags';

export namespace addr_immediate {
	/**
	 * Immediate Addressing
	 *
	 *     op #const
	 *
	 * In immediate addressing, the data is read from the operand(s). This reads
	 * the next u8 from the PC, and increments the PC.
	 */
	export namespace _u8 {
		/** The operand byte */
		export let operand: u8 = 0;
	
		export function step0() : void {
			bus.read.setup(u24.from_bank_addr(registers.PBR, registers.PC++));
		}
	
		export function step1() : void {
			operand = bus.read.fetch();
		}
	}
	
	/**
	 * Immediate Addressing
	 *
	 *     op #const
	 *
	 * In immediate addressing, the data is read from the operand(s). This reads
	 * the next u16 from the PC, and increments the PC twice.
	 */
	export namespace _u16 {
		/** The first operand byte */
		export let $0: u8 = 0;
	
		/** The second operand byte */
		export let $1: u8 = 0;
	
		/** The full 16-bit operand */
		export let operand: u16 = 0;
	
		/** Write the first address to the bus and wait for a response */
		export function step0() : void {
			bus.read.setup(u24.from_bank_addr(registers.PBR, registers.PC++));
		}
	
		/** Grab the byte we read, and write the next address */
		export function step1() : void {
			$0 = bus.read.fetch();
			bus.read.setup(u24.from_bank_addr(registers.PBR, registers.PC++));
		}
	
		/** Grab the second byte, and clean up */
		export function step2() : void {
			$1 = bus.read.fetch();
			operand = u16.from_u8($0, $1);
		}
	}
	
	/**
	 * Immediate Addressing
	 *
	 *     op #const
	 *
	 * In immediate addressing, the data is read from the operand(s). This reads
	 * the next u24 from the PC, and increments the PC three times.
	 */
	export namespace _u24 {
		/** The first operand byte */
		export let $0: u8 = 0;
	
		/** The second operand byte */
		export let $1: u8 = 0;
	
		/** The third operand byte */
		export let $2: u8 = 0;
	
		/** The full 24-bit operand */
		export let operand: u24.native = 0;
	
		/** Write the first address to the bus and wait for a response */
		export function step0() : void {
			bus.read.setup(u24.from_bank_addr(registers.PBR, registers.PC++));
		}
	
		/** Grab the byte we read, and write the next address */
		export function step1() : void {
			$0 = bus.read.fetch();
			bus.read.setup(u24.from_bank_addr(registers.PBR, registers.PC++));
		}
	
		/** Grab the second byte, and write the next address */
		export function step2() : void {
			$1 = bus.read.fetch();
			bus.read.setup(u24.from_bank_addr(registers.PBR, registers.PC++));
		}
	
		/** Grab the third byte, and clean up */
		export function step3() : void {
			$2 = bus.read.fetch();
			operand = u24.from_u8($0, $1, $2);
		}
	}

	/**
	 * Represents an instruction that uses Immediate addressing
	 */
	export class Instruction extends instruction.Instruction {
		constructor(
			protected readonly u8_instruction: instruction.callback.u8_op,
			protected readonly u16_instruction: instruction.callback.u16_op
		) {
			super();
		}
	
		public step: u8 = 0;
	
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
					addr_immediate._u8.step0();
					this.step++;
					return false;
				
				case 1:
					addr_immediate._u8.step1();
					this.step++;
					// fallthrough
	
				default:
					const finished = this.u8_instruction(addr_immediate._u8.operand);
	
					if (finished) {
						this.step = 0;
					}
	
					return finished;
			}
		}
	
		public exec_u16() : bool {
			switch (this.step) {
				case 0:
					addr_immediate._u16.step0();
					this.step++;
					return false;
				
				case 1:
					addr_immediate._u16.step1();
					this.step++;
					return false;
				
				case 2:
					addr_immediate._u16.step2();
					this.step++;
					// fallthrough
	
				default:
					const finished = this.u16_instruction(addr_immediate._u16.operand);
	
					if (finished) {
						this.step = 0;
					}
	
					return finished;
			}
		}
	}
	
}
