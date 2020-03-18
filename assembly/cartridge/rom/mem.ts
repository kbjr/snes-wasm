
import { p, p_null, alloc_cart } from '../../mem';

export let p_rom: p = p_null;
export let rom_size: i32 = 0;

/**
 * Allocates a segment of cartridge memory to hold a ROM
 * 
 * @param size The size in bytes of the area to allocate
 */
export function alloc_rom(size: i32) : void {
	assert(p_rom === p_null, 'Cannot allocate new ROM while a ROM is still loaded');

	p_rom = alloc_cart(size);
	rom_size = size;
}

export function release_rom() : void {
	p_rom = p_null;
	rom_size = 0;
}
