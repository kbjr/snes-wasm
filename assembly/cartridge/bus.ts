
import { bus } from '../bus';

// @ts-ignore: decorator
@inline export function cartridge_poll() : void {
	if (bus.flags.CART) {
		if (bus.flags.RD) {
			read_normal();
		}

		else if (bus.flags.WR) {
			write_normal();
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
