
import { u16 } from '../../u16';
import { u24 } from '../../u24';
import { bus } from '../../bus';
import { registers } from '../registers';

/**
 * Immediate Addressing
 *
 *     op #const
 *
 * In immediate addressing, the data is read from the operand(s). This reads
 * the next u8 from the PC, and increments the PC.
 */
export namespace addr_immediate_u8 {
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
export namespace addr_immediate_u16 {
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
export namespace addr_immediate_u24 {
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
