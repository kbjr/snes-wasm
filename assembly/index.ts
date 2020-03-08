
export { CPU } from './cpu/namespace';
export { SystemBus } from './system-bus/namespace';
export { Joypad } from './joypad/namespace';

export function read(index: u32) : u8 {
	return load<u8>(index);
}

export function write(index: u32, byte: u8) : void {
	store<u8>(index, byte);
}

export { load_u24, store_u24 } from './types/u24';
