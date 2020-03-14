
import { registers } from '../registers';
import { addr_immediate_u8, addr_immediate_u16 } from './immediate';

/**
 * Program Counter Relative Addressing
 *
 *     op nearlabel
 *
 * Points to an address relative to the Program Counter (PC). Returns the bank/address.
 */
// @ts-ignore: decorator
@inline export function addr_programCounterRelative() : u32 {
	// Read the operand to get our relative offset
	const offset = reinterpret<i8>(addr_immediate_u8());

	return (<u32>registers.PBR << 16) | (<u32>reinterpret(registers.PC + offset) & 0xffff);
}

/**
 * Program Counter Relative Long Addressing
 *
 *     op label
 *
 * Points to an address relative to the Program Counter (PC). Returns the bank/address.
 */
// @ts-ignore: decorator
@inline export function addr_programCounterRelativeLong() : u32 {
	// Read the operand to get our relative offset
	const offset = reinterpret<i16>(addr_immediate_u16());

	return (<u32>registers.PBR << 16) | (reinterpret<u32>(registers.PC + offset) & 0xffff);
}
