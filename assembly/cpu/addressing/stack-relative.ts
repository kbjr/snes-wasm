
import { flags } from '../flags';
import { registers } from '../registers';
import { addr_immediate_u8 } from './immediate';
import { read_u16 } from '../../system-bus';

/**
 * Stack Relative Addressing
 *
 *     op sr,S
 *
 * Points to an address relative to the Stack Pointer (S): `$00:${S + operand}`
 */
export function addr_stackRelative() : u32 {
	// Add the operand to the stack pointer, and return it as a bank $00 address
	return <u32>(registers.S + addr_immediate_u8()) & 0xffff;
}

/**
 * Stack Relative Indirect Indexed,X Addressing
 *
 *     op (sr,S),X
 *
 * Points to an indirect address relative to the Stack Pointer (S). The u16 at the
 * indirect address `$00:${S + operand}` is then added to X in the DBR bank to get
 * the effective address.
 * 
 * TODO: Does this not exist? Get rid of this?
 */
export function addr_stackRelativeIndirectIndexedX() : u32 {
	const indirectAddr = addr_stackRelative();

	const bank = <u32>registers.DBR << 16;
	const addr = <u32>read_u16(0x00, indirectAddr);

	// If we're in Emulation mode, or 8-bit index register mode, add the X low byte
	if (flags.E || flags.X) {
		return (bank | addr) + registers.X_low;
	}

	// Otherwise, add the full 16-bit value of X
	return (bank | addr) + registers.X;
}

/**
 * Stack Relative Indirect Indexed,Y Addressing
 *
 *     op (sr,S),Y
 *
 * Points to an indirect address relative to the Stack Pointer (S). The u16 at the
 * indirect address `$00:${S + operand}` is then added to Y in the DBR bank to get
 * the effective address.
 */
export function addr_stackRelativeIndirectIndexedY() : u32 {
	const indirectAddr = addr_stackRelative();

	const bank = <u32>registers.DBR << 16;
	const addr = <u32>read_u16(0x00, indirectAddr);

	// If we're in Emulation mode, or 8-bit index register mode, add the Y low byte
	if (flags.E || flags.X) {
		return (bank | addr) + registers.Y_low;
	}

	// Otherwise, add the full 16-bit value of Y
	return (bank | addr) + registers.Y;
}
