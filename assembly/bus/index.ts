
import { u24 } from '../u24';
import { p, alloc } from '../mem';

import { wram_poll } from '../wram/bus';
import { cartridge_poll } from '../cartridge/bus';

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

	export namespace mem {
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
	}





	// ===== Flags =====

	export namespace flags {
		/* eslint-disable prefer-const */
		export let RD: bool = false;
		export let WR: bool = false;
		export let WRAM: bool = false;
		export let CART: bool = false;
		export let PARD: bool = false;
		export let PAWR: bool = false;
	}





	// ===== The main methods actually used for read/write operations =====

	let isRegister: bool = false;

	export namespace read {
		/**
		 * The first step of a read, puts all the correct values in the correct places, and
		 * counts the cycles that we need to wait for before getting a result.
		 * 
		 * @param pointer The SNES address to read
		 */
		export function setup(pointer: bus.long) : void {
			mapAddress(pointer, true);
		}
	
		/**
		 * The second step of a read, actually polls the various connected devices (if needed)
		 * and resolves the value to be read. Sets all the flags back to false to prepare for
		 * the next call.
		 */
		export function fetch() : u8 {
			let result: u8 = 0;

			if (isRegister) {
				// TODO: Special handling for registers
				// result = ...
			}

			else {
				poll();
				result = bus.mem.load_data();
			}
	
			bus.flags.RD = false;
			bus.flags.PARD = false;
			bus.flags.WRAM = false;
			bus.flags.CART = false;
			isRegister = false;
			
			return result;
		}
	}

	export namespace write {
		export function setup(pointer: bus.long, byte: u8) : void {
			mapAddress(pointer, false);
			bus.mem.store_data(byte);
		}

		export function exec() : void {
			if (isRegister) {
				// TODO: Special handling for registers
				// const byte: u8 = bus.mem.load_data();
			}

			else {
				poll();
			}
	
			bus.flags.WR = false;
			bus.flags.PAWR = false;
			bus.flags.WRAM = false;
			bus.flags.CART = false;
			isRegister = false;
		}
	}





	// ===== Internal Utilities =====

	function mapAddress(long: bus.long, read: bool) : void {
		const bank = u24.high_u8(long);
		const addr = u24.low_u16(long);

		// Banks $00-$3F
		if (bank < 0x40) {
			// Addresses $0000-$1FFF: Address Bus A + /WRAM (Slow)
			if (addr < 0x2000) {
				busA(bank, addr, speed.slow, read);
				bus.flags.WRAM = true;
			}

			// Addresses $2000-$20FF: Address Bus A (Fast)
			else if (addr < 0x2100) {
				busA(bank, addr, speed.fast, read);
			}

			// Addresses $2100-$21FF: Address Bus B (Fast)
			else if (addr < 0x2200) {
				busB(addr, speed.fast, read);
			}

			// Addresses $2200-$3FFF: Address Bus A (Fast)
			else if (addr < 0x4000) {
				busA(bank, addr, speed.fast, read);
			}

			// Addresses $4000-$41FF: Internal CPU Registers (XSlow)
			else if (addr < 0x4200) {
				cpuRegister(bank, addr, speed.xslow, read);
			}

			// Addresses $4200-$43FF: Internal CPU Registers (Fast)
			else if (addr < 0x4400) {
				cpuRegister(bank, addr, speed.fast, read);
			}

			// Addresses $4400-$5FFF: Address Bus A (Fast)
			else if (addr < 0x6000) {
				busA(bank, addr, speed.fast, read);
			}

			// Addresses $6000-$7FFF: Address Bus A (Slow)
			else if (addr < 0x8000) {
				busA(bank, addr, speed.slow, read);
			}
			// Addresses $6000-$7FFF: Address Bus A + /CART (Slow)
			else {
				busA(bank, addr, speed.slow, read);
				bus.flags.CART = true;
			}
		}

		// Banks $40-$7D
		else if (bank < 0x7e) {
			// Addresses $0000-$FFFF: Address Bus A + /CART (Slow)
			busA(bank, addr, speed.slow, read);
			bus.flags.CART = true;
		}

		// Banks $7E-$7F
		else if (bank < 0x80) {
			// Addresses $0000-$FFFF: Address Bus A + /WRAM (Slow)
			busA(bank, addr, speed.slow, read);
			bus.flags.WRAM = true;
		}

		// Banks $80-$BF
		else if (bank < 0xc0) {
			// Addresses $0000-$1FFF: Address Bus A + /WRAM (Slow)
			if (addr < 0x2000) {
				busA(bank, addr, speed.slow, read);
				bus.flags.WRAM = true;
			}

			// Addresses $2000-$20FF: Address Bus A (Fast)
			else if (addr < 0x2100) {
				busA(bank, addr, speed.fast, read);
			}

			// Addresses $2100-$21FF: Address Bus B (Fast)
			else if (addr < 0x2200) {
				busB(addr, speed.fast, read);
			}

			// Addresses $2200-$3FFF: Address Bus A (Fast)
			else if (addr < 0x4000) {
				busA(bank, addr, speed.fast, read);
			}

			// Addresses $4000-$41FF: Internal CPU Registers (XSlow)
			else if (addr < 0x4200) {
				cpuRegister(bank, addr, speed.xslow, read);
			}

			// Addresses $4200-$43FF: Internal CPU Registers (Fast)
			else if (addr < 0x4400) {
				cpuRegister(bank, addr, speed.fast, read);
			}

			// Addresses $4400-$5FFF: Address Bus A (Fast)
			else if (addr < 0x6000) {
				busA(bank, addr, speed.fast, read);
			}

			// Addresses $6000-$7FFF: Address Bus A (Slow)
			else if (addr < 0x8000) {
				busA(bank, addr, speed.slow, read);
			}
			// Addresses $6000-$7FFF: Address Bus A + /CART (Slow or Fast)
			else {
				busA(bank, addr, speed.rom, read);
				bus.flags.CART = true;
			}
		}

		// Banks $C0-$FF
		else {
			// Addresses $0000-$FFFF: Address Bus A + /CART (Slow or Fast)
			busA(bank, addr, speed.rom, read);
			bus.flags.CART = true;
		}
	}

	// @ts-ignore: decorator
	@inline function busA(bank: bus.bank, addr: bus.addr, speed: u8, read: bool) : void {
		bus.mem.store_addrA_bank(bank);
		bus.mem.store_addrA_addr(addr);

		if (read) {
			bus.flags.RD = true;
		}

		else {
			bus.flags.WR = true;
		}

		cycles += speed;
	}

	// @ts-ignore: decorator
	@inline function busB(addr: bus.addr, speed: u8, read: bool) : void {
		bus.mem.store_addrB(<u8>addr);

		if (read) {
			bus.flags.PARD = true;
		}

		else {
			bus.flags.PAWR = true;
		}

		cycles += speed;
	}

	// @ts-ignore: decorator
	@inline function cpuRegister(bank: bus.bank, addr: bus.addr, speed: u8, read: bool) : void {
		// CPU Registers go on bus A, but the value doesn't come from the data bus
		busA(bank, addr, speed, read);
		isRegister = true;
	}

	/** Polls each connected device to see if any of them want to respond */
	function poll() : void {
		wram_poll();
		cartridge_poll();

		// TODO: Poll other devices...
	}
}
