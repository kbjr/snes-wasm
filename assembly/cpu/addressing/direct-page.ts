
import { flags } from '../flags';
import { registers } from '../registers';
import { addr_immediate_u8 } from './immediate';
import { read_u16, read_u8 } from '../../system-bus';
import { cpuThread } from '../../scheduler/threads';

/**
 * Direct Page Addressing
 * 
 *     op dp
 *
 * Returns the DP Address. The byte in the operand is added to the 16-bits
 * in D, and the data is read from that calculated address. Always reads data from bank $00.
 *
 * TODO: Verify overflow behavior (does overflow in addr when adding increment bank?)
 */
// @ts-ignore: decorator
@inline export function addr_directPage() : u32 {
	// Count 1 extra cycle if the low byte of `D` is non-zero
	if (registers.D & 0xff) {
		cpuThread.countCycles(1);
	}

	return <u32>(registers.D + addr_immediate_u8()) & 0xffff;
}

/**
 * Direct Page Indexed,X Addressing
 * 
 *     op dp,X
 *
 * Returns the DP Address + X. The byte in the operand is added to the 16-bits
 * in D and the (8 or) 16 bits in X.
 *
 * TODO: Verify overflow behavior (does overflow in addr when adding increment bank?)
 */
// @ts-ignore: decorator
@inline export function addr_directPageIndexedX() : u32 {
	// Count 1 extra cycle if the low byte of `D` is non-zero
	if (registers.D & 0xff) {
		cpuThread.countCycles(1);
	}

	let addr: u16 = registers.D + addr_immediate_u8();

	// If in emulation mode, or 8-bit index register mode, we only use the low byte of X
	if (flags.E || flags.X) {
		addr += registers.X_low;
	}

	// Otherwise, we use the full 16 bits of X
	else {
		addr += registers.X;
	}

	return <u32>addr;
}

/**
 * Direct Page Indexed,Y Addressing
 * 
 *     op dp,Y
 *
 * Returns the DP Address + Y. The byte in the operand is added to the 16-bits
 * in D and the (8 or) 16 bits in Y.
 *
 * TODO: Verify overflow behavior (does overflow in addr when adding increment bank?)
 */
// @ts-ignore: decorator
@inline export function addr_directPageIndexedY() : u32 {
	// Count 1 extra cycle if the low byte of `D` is non-zero
	if (registers.D & 0xff) {
		cpuThread.countCycles(1);
	}

	let addr: u16 = registers.D + addr_immediate_u8();

	// If in emulation mode, or 8-bit index register mode, we only use the low byte of Y
	if (flags.E || flags.X) {
		addr += registers.Y_low;
	}

	// Otherwise, we use the full 16 bits of Y
	else {
		addr += registers.Y;
	}

	return <u32>addr;
}

/**
 * Direct Page Indirect Addressing
 *
 *     op (dp)
 *
 * Returns the DP Indirect Address. The byte in the operand is added to the 16-bits in D, and
 * fetches the 16-bit address stored at $00:{D + operand}.
 */
// @ts-ignore: decorator
@inline export function addr_directPageIndirect() : u32 {
	// Count 1 extra cycle if the low byte of `D` is non-zero
	if (registers.D & 0xff) {
		cpuThread.countCycles(1);
	}

	 // Read the operand byte and add it to D to get the first address
	const operand: u8 = addr_immediate_u8();
	const indirectAddr: u16 = registers.D + operand;

	// Read the 16-bit address stored at that address in bank $00
	const effectiveAddr: u16 = read_u16(0x00, indirectAddr);

	return <u32>effectiveAddr | <u32>(registers.DBR << 16);
}

/**
 * Direct Page Indexed Indirect,X Addressing
 * 
 *     op (dp,X)
 *
 * Locates an indirect address at $00:${DP + X + Operand}. The effective address (the return
 * value) is the indirect address, in the DBR bank.
 */
// @ts-ignore: decorator
@inline export function addr_directPageIndexedIndirectX() : u32 {
	// Count 1 extra cycle if the low byte of `D` is non-zero
	if (registers.D & 0xff) {
		cpuThread.countCycles(1);
	}

	// Read the operand byte and add it to D to get the first address
	const operand: u8 = addr_immediate_u8();
	let indirectAddr: u16 = registers.D + operand;

	// If in emulation mode, or 8-bit index register mode, we only use the low byte of X
	if (flags.E || flags.X) {
	   indirectAddr += registers.X_low;
	}

	// Otherwise, we use the full 16 bits of X
	else {
	   indirectAddr += registers.X;
	}

	// Read the 16-bit address stored at that address in bank $00
	const effectiveAddr: u16 = read_u16(0x00, indirectAddr);

	return <u32>effectiveAddr | <u32>(registers.DBR << 16);
}

/**
 * Direct Page Indirect Indexed,Y Addressing
 * 
 *     op (dp),Y
 *
 * Locates an indirect address at $00:${DP + Operand}. The effective address (the return value)
 * is the indirect address, in the DBR bank + Y.
 */
// @ts-ignore: decorator
@inline export function addr_directPageIndirectIndexedY() : u32 {
	// Count 1 extra cycle if the low byte of `D` is non-zero
	if (registers.D & 0xff) {
		cpuThread.countCycles(1);
	}

	// Read the operand byte and add it to D to get the first address
	const operand: u8 = addr_immediate_u8();
	const indirectAddr: u16 = registers.D + operand;

	// Read the 16-bit address stored at that address in bank $00
	let effectiveAddr: u16 = read_u16(0x00, indirectAddr);

	// If in emulation mode, or 8-bit index register mode, we only use the low byte of Y
	if (flags.E || flags.X) {
	   effectiveAddr += registers.Y_low;
	}

	// Otherwise, we use the full 16 bits of Y
	else {
	   effectiveAddr += registers.Y;
	}

	return (<u32>registers.DBR << 16) + <u32>effectiveAddr;
}

/**
 * Direct Page Indirect Long Addressing
 *
 *     op [dp]
 *
 * Returns the DP Indirect Long Address. The byte in the operand is added to the 16-bits in D, and
 * fetches the 24-bit address stored at $00:{D + operand}.
 */
// @ts-ignore: decorator
@inline export function addr_directPageIndirectLong() : u32 {
	// Count 1 extra cycle if the low byte of `D` is non-zero
	if (registers.D & 0xff) {
		cpuThread.countCycles(1);
	}

	// Read the operand byte and add it to D to get the first address
	const operand: u8 = addr_immediate_u8();
	const indirectAddr: u16 = registers.D + operand;

	// Read the 24-bit address stored at $00:${dp + operand}
	const addr = <u32>read_u16(0x00, indirectAddr);
	const bank = <u32>read_u8(0x00, indirectAddr + 2);

	return (bank << 16) | addr;
}

/**
 * Direct Page Indirect Long Indexed,X Addressing
 *
 *     op [dp],X
 *
 * Returns the DP Indirect Long Address + X. The byte in the operand is added to the 16-bits
 * in D, and fetches the 24-bit address stored at $00:{D + operand}. X is then added onto the
 * 24-bit address.
 * 
 * TODO: This doesn't seem to exist? Delete it?
 */
// @ts-ignore: decorator
@inline export function addr_directPageIndirectLongIndexedX() : u32 {
	const long = addr_directPageIndirectLong();

	// If in emulation mode, or 8-bit index register mode, we only use the low byte of X
	if (flags.E || flags.X) {
		return (long + registers.X_low) & 0x00ffffff;
	}
 
	// Otherwise, we use the full 16 bits of X
	return (long + registers.X) & 0x00ffffff;
}

/**
 * Direct Page Indirect Long Indexed,Y Addressing
 *
 *     op [dp],Y
 *
 * Returns the DP Indirect Long Address + Y. The byte in the operand is added to the 16-bits
 * in D, and fetches the 24-bit address stored at $00:{D + operand}. X is then added onto the
 * 24-bit address.
 */
// @ts-ignore: decorator
@inline export function addr_directPageIndirectLongIndexedY() : u32 {
	const long = addr_directPageIndirectLong();

	// If in emulation mode, or 8-bit index register mode, we only use the low byte of Y
	if (flags.E || flags.X) {
		return (long + registers.Y_low) & 0x00ffffff;
	}
 
	// Otherwise, we use the full 16 bits of Y
	return (long + registers.Y) & 0x00ffffff;
}
