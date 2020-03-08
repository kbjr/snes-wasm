
import { registers } from '../registers';
import { read_u8, read_u16, read_u24 } from '../../system-bus';

/**
 * Immediate Addressing
 *
 *     op #const
 *
 * In immediate addressing, the data is read from the operand(s). This reads
 * the next u8 from the PC, and increments the PC.
 *
 * Returns the 8 bits stored in the operand.
 */
// @ts-ignore: decorator
@inline export function addr_immediate_u8() : u8 {
	return read_u8(registers.PBR, registers.PC++);
}

/**
 * Immediate Addressing
 *
 *     op #const
 *
 * In immediate addressing, the data is read from the operand(s). This reads
 * the next u16 from the PC, and increments the PC twice.
 *
 * Returns the 16 bits stored in the operand.
 */
// @ts-ignore: decorator
@inline export function addr_immediate_u16() : u16 {
	const result = read_u16(registers.PBR, registers.PC);

	registers.PC += 2;

	return result;
}

/**
 * Immediate Addressing
 *
 *     op #const
 *
 * In immediate addressing, the data is read from the operand(s). This reads
 * the next u24 from the PC, and increments the PC three times.
 *
 * Returns the 24 bits stored in the operand.
 */
// @ts-ignore: decorator
@inline export function addr_immediate_u24() : u24 {
	const result = read_u24(registers.PBR, registers.PC);

	registers.PC += 3;

	return result;
}
