
import { bus } from '../../bus';
import { RomMapper } from './rom-mapper';

class HiRomMapper extends RomMapper {
	public RD() : void {
		const bank: bus.bank = bus.mem.load_addrA_bank();

		// Banks $00-$3F
		if (bank < 0x40) {
			const addr: bus.addr = bus.mem.load_addrA_addr();

			// Addresses $8000-$FFFF
			if (addr >= 0x8000) {
				// Shadows ROM from $C0-$FF (ROM $00-$3F)
				bus.mem.store_data(load<u8>(this.resolve(bank, addr)));
			}

			// Banks $30-$3F, Addresses $6000-$7FFF
			else if (bank >= 0x30 && addr >= 0x6000) {
				// TODO: Maps to Mode 21 SRAM (128kB)
			}
		}

		// Banks $40-$5F
		else if (bank < 0x60) {
			const addr: bus.addr = bus.mem.load_addrA_addr();

			// All addresses map to ROM $40-$5F
			bus.mem.store_data(load<u8>(this.resolve(bank, addr)));
		}

		// Banks $60-$6F
		else if (bank < 0x70) {
			// Unmapped
		}

		// Banks $70-$77
		else if (bank < 0x78) {
			const addr: bus.addr = bus.mem.load_addrA_addr();

			// Addresses $0000-$7FFF
			if (addr < 0x8000) {
				// TODO: Maps to Mode 20 SRAM (256kB)
			}
		}

		// Banks $78-$7D
		else if (bank < 0x7e) {
			// Unmapped
		}

		// Banks $80-$BF
		else if (bank < 0xc0) {
			const addr: bus.addr = bus.mem.load_addrA_addr();

			// Addresses $8000-$FFFF
			if (addr >= 0x8000) {
				// Shadow banks $00-$3F
				bus.mem.store_data(load<u8>(this.resolve(bank - 0xc0, addr)));
			}
		}

		// Banks $C0-$FF; All Addresses map to ROM $00-$3F
		else {
			const addr: bus.addr = bus.mem.load_addrA_addr();

			bus.mem.store_data(load<u8>(this.resolve(bank - 0xc0, addr)));
		}
	}

	public WR() : void {
		// 
	}

	public PARD() : void {
		// 
	}

	public PAWR() : void {
		// 
	}
}

export const hi_rom_mapper = new HiRomMapper();
