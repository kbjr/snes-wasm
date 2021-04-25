
import { bus } from '../bus';
import { RomMapper, hi_rom_mapper } from './rom-mappers';

let rom_mapper: RomMapper = hi_rom_mapper;

// @ts-ignore: decorator
@inline export function cartridge_poll() : void {
	if (bus.flags.CART) {
		if (bus.flags.RD) {
			rom_mapper.RD();
		}

		else if (bus.flags.WR) {
			rom_mapper.WR();
		}
	}

	else {
		unmapped();
	}
}

function read_normal() : void {
	// TODO: Cartridge bus reads
}

function write_normal() : void {
	// TODO: Cartridge bus writes
}

/** Contains special logic to allow the cartridge to map otherwise unmapped memory */
function unmapped() : void {
	// TODO: Cartridge bus unmapped
}
