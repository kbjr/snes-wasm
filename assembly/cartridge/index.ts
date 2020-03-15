
import { Cartridge } from './cartridge';
import { p, freeall_cart } from '../mem';

export let cart: Cartridge | null = null;

export namespace cartridge {
	export function create(romSize: u32) : void {
		cart = new Cartridge(romSize);
	}

	export function init() : void {
		cart!.init();
	}

	/** Get the location in memory where cartridge ROM starts */
	export function getRomAddress() : p {
		return cart!.rom.addr;
	}

	/** "Eject" the current cartridge, freeing all resources */
	export function eject() : void {
		// Destroy the cartridge object
		cart!.destroy();
		
		// Clean up the reference so the memory can be collected
		cart = null;

		// Free all reserved memory that was allocated to the cartridge
		freeall_cart();
	}
}
