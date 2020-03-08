
import { flags } from '../flags';
import { registers } from '../registers';
import { addr_immediate_u16, addr_immediate_u8, addr_immediate_u24 } from './immediate';

/**
 * Absolute Addressing
 *
 *     op addr
 *
 * Maps absolute addressing operands (16-bits) to a bank/address in the DBR bank
 * and returns the address.
 */
// @ts-ignore: decorator
@inline export function addr_absolute() : u32 {
	// Read the operand bytes and construct the address
	return (<u32>registers.DBR << 16) | <u32>addr_immediate_u16();
}

/**
 * Absolute Indexed,X Addressing
 *
 *     op addr,X
 *
 * Maps absolute addressing operands (16-bits) to a bank/address in the DBR bank
 * and returns the address.
 */
// @ts-ignore: decorator
@inline export function addr_absoluteIndexedX() : u32 {
	let addr: u16 = addr_immediate_u16();

	// If in emulation mode, or 8-bit index register mode, we only use the low byte of X
	if (flags.E || flags.X) {
		addr += <u16>registers.X_low;
	}

	// Otherwise, we use the full 16 bits of X
	else {
		addr += registers.X;
	}

	return <u32>addr | (<u32>registers.DBR << 16);
}

/**
 * Absolute Indexed,Y Addressing
 *
 *     op addr,Y
 *
 * Maps absolute addressing operands (16-bits) to a bank/address in the DBR bank
 * and returns the address.
 */
// @ts-ignore: decorator
@inline export function addr_absoluteIndexedY() : u32 {
	let addr: u16 = addr_immediate_u16();

	// If in emulation mode, or 8-bit index register mode, we only use the low byte of Y
	if (flags.E || flags.X) {
		addr += <u16>registers.Y_low;
	}

	// Otherwise, we use the full 16 bits of Y
	else {
		addr += registers.Y;
	}

	return <u32>addr | (<u32>registers.DBR << 16);
}

/**
 * Absolute Long Addressing
 *
 *     op long
 *
 * Maps absolute long addressing operands (24-bits) to a bank/address and returns
 * the address.
 */
// @ts-ignore: decorator
@inline export function addr_absoluteLong() : u32 {
	return addr_immediate_u24();
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
// @ts-ignore: decorator
@inline export function addr_absoluteLongIndexedX() : u32 {
	let addr: u16 = addr_immediate_u16();
	const bank: u8 = addr_immediate_u8();

	// If in emulation mode, or 8-bit index register mode, we only use the low byte of X
	if (flags.E || flags.X) {
		addr += <u16>registers.X_low;
	}

	// Otherwise, we use the full 16 bits of X
	else {
		addr += registers.X;
	}

	return <u32>addr | (<u32>bank << 16);
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
// @ts-ignore: decorator
@inline export function addr_absoluteLongIndexedY() : u32 {
	let addr: u16 = addr_immediate_u16();
	const bank: u8 = addr_immediate_u8();

	// If in emulation mode, or 8-bit index register mode, we only use the low byte of Y
	if (flags.E || flags.X) {
		addr += <u16>registers.Y_low;
	}

	// Otherwise, we use the full 16 bits of Y
	else {
		addr += registers.Y;
	}

	return <u32>addr | (<u32>bank << 16);
}
