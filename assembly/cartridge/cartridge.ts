
import { ROM } from './rom/mem';

export class Cartridge {
	public readonly rom: ROM;

	constructor(romSize: u32) {
		this.rom = new ROM(romSize);
	}

	public init() : void {
		// TODO: Cartridge init - should handle parsing the ROM and allocating any additional
		//       resources and devices needed for the cartridge to run
	}

	public destroy() : void {
		// TODO: Cartridge destroy
	}
}
