
import { u24 } from '../u24';
import { alloc } from '../mem';

/** The CPU's buses / other pins */
export namespace pins {
	/** Alias of u8; Represents an memory bank (the high 8-bits of a 24-bit address) */
	export type bank = u8;
	
	/** Alias of u16; Represents an address (the low 16-bits of a 24-bit address) */
	export type addr = u16;

	/** Alias of u24; Represents a full 24-bit address */
	export type long = u24.native;

	/** Pointer to the location in memory where the address bus is stored */
	const pointer = alloc(5);

	/** Emulation Status */
	export let E: bool = true;

	// @ts-ignore: decorator
	@inline export function getAddrA() : long {
		return u24._load(pointer);
	}
	
	// @ts-ignore: decorator
	@inline export function getAddrA_bank() : bank {
		return load<u8>(pointer, 2);
	}
	
	// @ts-ignore: decorator
	@inline export function getAddrA_addr() : addr {
		return load<u16>(pointer);
	}

	// @ts-ignore: decorator
	@inline export function setAddrA(value: long) : void {
		return u24._store(pointer, value);
	}
	
	// @ts-ignore: decorator
	@inline export function setAddrA_bank(value: bank) : void {
		return store<u8>(pointer, value, 2);
	}
	
	// @ts-ignore: decorator
	@inline export function setAddrA_addr(value: addr) : void {
		return store<u16>(pointer, value);
	}
}
