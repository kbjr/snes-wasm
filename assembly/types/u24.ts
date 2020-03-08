
import { p } from '../mem';

export function load_u24(pointer: p) : u32 {
	return (<u32>load<u8>(pointer + 2) << 16) | load<u16>(pointer);
}

export function store_u24(pointer: p, value: u32) : void {
	store<u16>(pointer, <u16>(value & 0xffff));
	store<u8>(pointer + 2, <u8>(value >> 16));
}
