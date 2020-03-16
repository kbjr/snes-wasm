
import { u24 } from '../../u24';
import { bus } from '../../bus';
import { flags } from '../flags';
import { registers } from '../registers';
import { addr_immediate_u16, addr_immediate_u24 } from './immediate';

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

	export const step0 = addr_immediate_u16.step0;

	export function step1() : void {
		addr_immediate_u16.step1();

		effective = u24.from_bank_addr(registers.DBR, addr_immediate_u16.operand);
	}
}

/**
 * Absolute Indexed,X Addressing
 *
 *     op addr,X
 *
 * Maps absolute addressing operands (16-bits) to a bank/address in the DBR bank
 * and returns the address.
 */
export namespace addr_absoluteIndexedX {
	/** The resolved, effective address */
	export let effective: bus.long = 0;

	export const step0 = addr_immediate_u16.step0;

	export function step1() : void {
		addr_immediate_u16.step1();

		let addr: bus.addr = addr_immediate_u16.operand;

		if (flags.E || flags.X) {
			addr += registers.X_low;
		}

		else {
			addr += registers.X;
		}

		effective = u24.from_bank_addr(registers.DBR, addr);
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
export namespace addr_absoluteIndexedY {
	/** The resolved, effective address */
	export let effective: bus.long = 0;

	export const step0 = addr_immediate_u16.step0;

	export function step1() : void {
		addr_immediate_u16.step1();

		let addr: bus.addr = addr_immediate_u16.operand;

		if (flags.E || flags.X) {
			addr += registers.Y_low;
		}

		else {
			addr += registers.Y;
		}

		effective = u24.from_bank_addr(registers.DBR, addr);
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
export namespace addr_absoluteLong {
	/** The resolved, effective address */
	export let effective: bus.long = 0;

	export const step0 = addr_immediate_u24.step0;
	export const step1 = addr_immediate_u24.step1;
	export function step2() : void {
		addr_immediate_u24.step2();
		effective = addr_immediate_u24.operand;
	}
}
