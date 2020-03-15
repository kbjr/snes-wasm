
/** Various utilities for working with u16 int values */
export namespace u16 {
	// @ts-ignore: decorator
	@inline export function low(num: u16) : u8 {
		return <u8>(num & 0xff);
	}

	// @ts-ignore: decorator
	@inline export function high(num: u16) : u8 {
		return <u8>(num >> 8);
	}

	// @ts-ignore: decorator
	@inline export function from_u8(low: u8, high: u8) : u16 {
		return <u16>low | <u16>(high << 8);
	}
}
