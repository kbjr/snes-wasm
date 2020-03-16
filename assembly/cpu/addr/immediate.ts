
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
		bus.store_addrA_bank(registers.PBR);
		bus.store_addrA_bank(registers.PC++);
		bus.read();
		
		operand = bus.load_data();
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

	export function step0() : void {
		bus.store_addrA_bank(registers.PBR);
		bus.store_addrA_bank(registers.PC++);
		bus.read();
		
		$0 = bus.load_data();
	}

	export function step1() : void {
		bus.store_addrA_bank(registers.PBR);
		bus.store_addrA_bank(registers.PC++);
		bus.read();
		
		$1 = bus.load_data();
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

	export function step0() : void {
		bus.store_addrA_bank(registers.PBR);
		bus.store_addrA_bank(registers.PC++);
		bus.read();
		
		$0 = bus.load_data();
	}

	export function step1() : void {
		bus.store_addrA_bank(registers.PBR);
		bus.store_addrA_bank(registers.PC++);
		bus.read();
		
		$1 = bus.load_data();
	}

	export function step2() : void {
		bus.store_addrA_bank(registers.PBR);
		bus.store_addrA_bank(registers.PC++);
		bus.read();
		
		$2 = bus.load_data();
		operand = u24.from_u8($0, $1, $2);
	}
}
