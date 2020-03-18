
import { p_null, p, freeall_cart } from '../mem';
import { p_rom, alloc_rom, release_rom } from './rom/mem';
import { findHeader, header } from './rom';

export namespace cartridge {
	export namespace rom {
		export function loaded() : boolean {
			return p_rom === p_null;
		}
	
		export function alloc(size: i32) : p {
			alloc_rom(size);
	
			return p_rom;
		}
	}

	export function init() : void {
		assert(p_rom !== p_null, 'Cannot initialize cartridge if no ROM is loaded');

		findHeader();
	}

	export function reset() : void {
		freeall_cart();
		release_rom();
	}
}
