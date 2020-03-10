
import { p, alloc } from '../../mem';
import { getOAMADDRL, getOAMADDRH } from './registers';

const size: u16 = 0x220;
const size_high: u16 = 0x200;

/** Allocate 544 bytes, the first 512 of which are the high table */
export const highTable: p = alloc(size);

/** The last 32 bytes of memory are the low table */
export const lowTable: p = highTable + size_high;

let addr: u16 = 0;
let buffer: u8 = 0;

/**
 * OAM Reset resets the internal address pointer back to what is stored
 * in the registers.
 */
export function reset() : void {
	addr = <u16>getOAMADDRL() * 2;

	if (getOAMADDRH() & 0x01) {
		addr += 0x200;
	}

	if (addr >= size) {
		// TODO: What do we do in this state?
	}
}

export function read() : u8 {
	const value = load<u8>(highTable + addr++);

	// If the internal address overflows, wrap to 0
	if (addr >= size) {
		// TODO: Is this correct?
		addr = 0;
	}

	return value;
}

export function write(value: u8) : void {
	// If we're writing to the low table, we have to implement some extra logic
	if (addr >= size_high) {
		// If the address pointer is at a low byte (even number)
		if (addr % 2) {
			// Write the value to the write buffer
			buffer = value;
		}
		
		// If the address pointer is at a high byte (odd number)
		else {
			// Write both the low byte from the buffer and the new value
			store<u8>(addr++, buffer);
			store<u8>(addr++, value);
		}
		
		// TODO: Is this order of operations correct for when to increment addr?
	}

	// Otherwise, we're writing to the high table, and everything is sane
	else {
		store<u8>(highTable + addr++, value);
	}

	// If the internal address overflows, wrap to 0
	if (addr >= size) {
		// TODO: Is this correct?
		addr = 0;
	}
}
