
import { u24 } from './u24';
import { p, alloc } from './mem';

export namespace bus {
	const offset: p = alloc(8);

	const addrA: u8 = 0x00;
	const addrB: u8 = 0x03;
	const data:  u8 = 0x04;



	/** Memory access speeds in master clock cycles */
	export namespace speed {
		/** Fast memory access speed (6 master cycles per access) */
		// @ts-ignore: decorator
		@inline export const fast: u8 = 6;
		/** Slow memory access speed (8 master cycles per access) */
		// @ts-ignore: decorator
		@inline export const slow: u8 = 8;
		/** XSlow memory access speed (12 master cycles per access) */
		// @ts-ignore: decorator
		@inline export const xslow: u8 = 12;
		/** ROM access speed. Set when a ROM is loaded, based on if the cart is FastROM */
		// @ts-ignore: decorator
		@inline export let rom: u8 = bus.speed.slow;
	}



	/** Alias of u8; Represents the highest 8-bits of a 24-bit SNES address */
	export type bank = u8;
	/** Alias of u16; Represents the lower 16-bits of a 24-bit SNES address */
	export type addr = u16;
	/** Alias of u24 (u32); Represents a full 24-bit SNES address */
	export type long = u24.native;



	/** Used to count the number of cycles used to perform read/write operations. */
	export let cycles: u8 = 0;





	// ===== Direct Bus Access =====

	// @ts-ignore: decorator
	@inline export function load_addrA_bank() : bus.bank {
		return load<u8>(offset, addrA + 2);
	}

	// @ts-ignore: decorator
	@inline export function load_addrA_addr() : bus.addr {
		return load<u16>(offset, addrA);
	}

	// @ts-ignore: decorator
	@inline export function load_addrA_long() : bus.long {
		return u24._load(offset + addrA);
	}
	
	// @ts-ignore: decorator
	@inline export function store_addrA_bank(value: bus.bank) : void {
		store<u8>(offset, value, addrA + 2);
	}
	
	// @ts-ignore: decorator
	@inline export function store_addrA_addr(value: bus.addr) : void {
		store<u16>(offset, value, addrA);
	}
	
	// @ts-ignore: decorator
	@inline export function store_addrA_long(value: bus.long) : void {
		u24._store(offset + addrA, value);
	}

	// @ts-ignore: decorator
	@inline export function load_addrB() : u8 {
		return load<u8>(offset, addrB);
	}
	
	// @ts-ignore: decorator
	@inline export function store_addrB(value: u8) : void {
		store<u8>(offset, value, addrB);
	}

	// @ts-ignore: decorator
	@inline export function load_data() : u8 {
		return load<u8>(offset, data);
	}
	
	// @ts-ignore: decorator
	@inline export function store_data(value: u8) : void {
		store<u8>(offset, value, data);
	}

	export function read() : void {
		// TODO: Poll for responses to the read
	}

	export function write() : void {
		// TODO: Poll for responses to the write
	}





	// ===== Shortcut Utilities =====

	// @ts-ignore: decorator
	@inline export function read_u8(pointer: bus.long) : u8 {
		bus.store_addrA_long(pointer);
		bus.read();

		return bus.load_data();
	}

	// @ts-ignore: decorator
	@inline export function write_u8(pointer: bus.long, value: u8) : void {
		bus.store_addrA_long(pointer);
		bus.store_data(value);
		bus.write();
	}
}


