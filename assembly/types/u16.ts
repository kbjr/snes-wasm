
// @ts-ignore: decorator
@inline export function u16_low(num: u16) : u8 {
	return <u8>(num & 0xff);
}

// @ts-ignore: decorator
@inline export function u16_high(num: u16) : u8 {
	return <u8>(num >> 8);
}

// @ts-ignore: decorator
@inline export function u16_from_u8(low: u8, high: u8) : u16 {
	return <u16>low | <u16>(high << 8);
}
