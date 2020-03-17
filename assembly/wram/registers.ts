
import { u24 } from '../u24';
import { p, alloc } from '../mem';
import { lowBank, extBank } from './wram';

const addr: p = alloc(3);

/**
 * WMDATA
 * WRAM Data Register
 * 
 * Addr: $2180
 * Read: byte, any time
 * Write: byte, any time
 *
 *   7 6 5 4 3 2 1 0
 *   x x x x x x x x
 *
 *   xxxxxxxx = The data being read / written
 *
 * This register reads from or writes to the WRAM address set in the WMADD* registers.
 * The address is then incremented.
 */
export function getWMDATA() : u8 {
	const bank = getWMADDH();
	const pointer: u16 = load<u16>(addr);

	// Store the incremented address back in the registers
	store<u16>(addr, pointer + 1);

	// If the high register has the low bit set, we are writing to the Extended RAM bank
	if (bank & 0x01) {
		return load<u8>(extBank + pointer);
	}

	// Otherwise, we are writing to the Low RAM bank
	else {
		return load<u8>(lowBank + pointer);
	}
}

export function setWMDATA(value: u8) : void {
	const bank = getWMADDH();
	const pointer: u16 = load<u16>(addr);

	// Store the incremented address back in the registers
	store<u16>(addr, pointer + 1);

	// If the high register has the low bit set, we are writing to the Extended RAM bank
	if (bank & 0x01) {
		store<u8>(extBank + pointer, value);
	}

	// Otherwise, we are writing to the Low RAM bank
	else {
		store<u8>(lowBank + pointer, value);
	}
}


/**
 * Get the full u24 value of the WMADD Address Registers
 */
// @ts-ignore: decorator
@inline export function getWMADD() : u24 {
	return u24._load(addr);
}

// @ts-ignore: decorator
@inline export function setWMADD(value: u24) : void {
	u24._store(addr, value);
}


/**
 * WMADDL
 * WRAM Address Registers
 * 
 * Addr: $2181
 * Read: N/A
 * Write: byte, any time
 *
 *   7 6 5 4 3 2 1 0
 *   x x x x x x x x
 *
 *   xxxxxxxx = The low byte of the address
 *
 * The low byte of the address pointer used by the WMDATA register
 */
// @ts-ignore: decorator
@inline export function getWMADDL() : u8 {
	return load<u8>(addr);
}

// @ts-ignore: decorator
@inline export function setWMADDL(value: u8) : void {
	store<u8>(addr, value);
}


/**
 * WMADDM
 * WRAM Address Registers
 * 
 * Addr: $2182
 * Read: N/A
 * Write: byte, any time
 *
 *   7 6 5 4 3 2 1 0
 *   x x x x x x x x
 *
 *   xxxxxxxx = The middle byte of the address
 *
 * The middle byte of the address pointer used by the WMDATA register
 */
// @ts-ignore: decorator
@inline export function getWMADDM() : u8 {
	return load<u8>(addr, 1);
}

// @ts-ignore: decorator
@inline export function setWMADDM(value: u8) : void {
	store<u8>(addr, value, 1);
}


/**
 * WMADDH
 * WRAM Address Registers
 * 
 * Addr: $2183
 * Read: N/A
 * Write: byte, any time
 *
 *   7 6 5 4 3 2 1 0
 *   - - - - - - - x
 *
 *   x = The high bit of the address
 *
 * The high bit of the address pointer used by the WMDATA register
 */
// @ts-ignore: decorator
@inline export function getWMADDH() : u8 {
	return load<u8>(addr, 2);
}

// @ts-ignore: decorator
@inline export function setWMADDH(value: u8) : void {
	store<u8>(addr, value, 2);
}
