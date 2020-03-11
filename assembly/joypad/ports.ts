
import { p, alloc } from '../mem';

export const addr: p = alloc(8);

export function readJoypad1() : u16 {
	return load<u16>(addr);
}

export function readJoypad2() : u16 {
	return load<u16>(addr, 2);
}

export function readJoypad3() : u16 {
	return load<u16>(addr, 4);
}

export function readJoypad4() : u16 {
	return load<u16>(addr, 6);
}
