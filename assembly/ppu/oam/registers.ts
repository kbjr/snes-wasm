
import { p, alloc } from '../../mem';
import { reset, write, read } from './oam';

export const addr: p = alloc(2);

/**
 * OAMADDRL
 * OAM Address Registers (Low)
 *
 * Addr: $00-3F:$2102
 * Read: N/A
 * Write: byte, f-blank / v-blank
 *
 *     7 6 5 4 3 2 1 0
 *     a a a a a a a a
 *  
 *     aaaaaaaa = Address to be read/written
 *
 * Controls the address to perform read / write operations on in OAM.
 */
// @ts-ignore: decorator
@inline export function getOAMADDRL() : u8 {
	return load<u8>(addr);
}

// @ts-ignore: decorator
@inline export function setOAMADDRL(value: u8) : void {
	// Store the value in the register
	store<u8>(addr, value);

	// Trigger OAM reset
	reset();
}

/**
 * OAMADDRH
 * OAM Address Registers (High)
 *
 * Addr: $00-3F:$2103
 * Read: N/A
 * Write: byte, f-blank / v-blank
 *
 *   7 6 5 4 3 2 1 0
 *   p - - - - - - b
 *   
 *   p = Object priority activation bit
 *   b = OAMADDRL address high bit (selects low table / high table)
 *
 * When Obj Priority activation bit is set, an Obj other than Sprite 0 may be given priority.
 *
 * Bit 0 acts as the high bit for the address in the OAMADDRL register.
 */
// @ts-ignore: decorator
@inline export function getOAMADDRH() : u8 {
	return load<u8>(addr, 1);
}

// @ts-ignore: decorator
@inline export function setOAMADDRH(value: u8) : void {
	// Store the value in the register
	store<u8>(addr, value, 1);

	// Trigger OAM reset
	reset();
}

/**
 * OAMDATA
 * OAM Data Write Register
 *
 * Addr: $00-3F:$2104
 * Read: N/A
 * Write: byte, f-blank / v-blank
 *
 *   7 6 5 4 3 2 1 0
 *   x x x x x x x x
 *
 *   x = The data to write to OAM
 *
 * Write to the memory located at the location pointed to by the internal address pointer and
 * increments the internal address pointer.
 */
// @ts-ignore: decorator
@inline export function setOAMDATA(value: u8) : void {
	write(value);
}

/**
 * OAMDATAREAD
 * OAM Data Read Register
 * 
 * Addr: $00-3F:$2138
 * Read: byte, f-blank / v-blank
 * Write: N/A
 *
 *   7 6 5 4 3 2 1 0
 *   x x x x x x x x
 *
 *   x = The data being read from OAM
 *
 * Reads the memory located at the location pointed to by the internal address pointer and
 * increments the internal address pointer.
 */
// @ts-ignore: decorator
@inline export function getOAMDATAREAD() : u8 {
	return read();
}