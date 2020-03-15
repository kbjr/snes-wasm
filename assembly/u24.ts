
import { p } from './mem';

/** Various utilites for working with u24 int values */
export namespace u24 {
	export type native = u32;

	// @ts-ignore: decorator
	@inline export function _load(pointer: p) : u24.native {
		return (<u32>load<u8>(pointer + 2) << 16) | load<u16>(pointer);
	}

	// @ts-ignore: decorator
	@inline export function _store(pointer: p, value: u24.native) : void {
		store<u16>(pointer, <u16>(value & 0xffff));
		store<u8>(pointer + 2, <u8>(value >> 16));
	}

	// @ts-ignore: decorator
	@inline export function low_u8(value: u24.native) : u8 {
		return <u8>(value & 0xff);
	}

	// @ts-ignore: decorator
	@inline export function mid_u8(value: u24.native) : u8 {
		return <u8>((value >> 8) & 0xff);
	}

	// @ts-ignore: decorator
	@inline export function low_u16(value: u24.native) : u8 {
		return <u16>(value & 0xffff);
	}

	// @ts-ignore: decorator
	@inline export function high_u8(value: u24.native) : u8 {
		return <u8>((value >> 16) & 0xff);
	}
}
