
import { bus } from '../bus';
import { lowBank, extBank } from './wram';
import { getWMDATA, setWMADDH, setWMADDL, setWMADDM, setWMDATA } from './registers';

/**
 * WRAM Bus Connection
 * 
 * Address Bus A (/RD and /WR): 
 * 
 * - Banks $00-$40 and $80-$BF:
 *   - $0000-$1FFF = Shadow Low RAM (Slow)
 * - Bank $7E:
 *   - $0000-$1FFF = Low ROM (Slow)
 *   - $2000-$FFFF = High ROM (Slow)
 * - Bank $7F:
 *   - $0000-$FFFF = Extended ROM (Slow)
 * 
 * Address Bus B (/PARD):
 * 
 * - $80 = WMDATA Register
 * 
 * Address Bus B (/PAWR):
 * 
 * - $80 = WMDATA Register
 * - $81 = WMADDL Register
 * - $82 = WMADDM Register
 * - $83 = WMADDH Register
 */
// @ts-ignore: decorator
@inline export function wram_poll() : void {
	// WRAM Registers respond on Address Bus B
	if (bus.flags.PARD) {
		read_register();
	}

	else if (bus.flags.PAWR) {
		write_register();
	}

	// On Address Bus A, WRAM only responds when /WRAM flag is set
	else if (! bus.flags.WRAM) {
		return;
	}

	else if (bus.flags.RD) {
		read_wram();
	}

	else if (bus.flags.WR) {
		write_wram();
	}
}

function read_register() : void {
	const addr = bus.mem.load_addrB();

	// Address $2180; The only readable register here is the WMDATA register
	if (addr === 0x80) {
		bus.mem.store_data(getWMDATA());
	}
}

function write_register() : void {
	const addr = bus.mem.load_addrB();

	// Addresses $2180-$2183 map to registers
	switch (addr) {
		case 0x80:
			setWMDATA(bus.mem.load_data());
			break;
	
		case 0x81:
			setWMADDL(bus.mem.load_data());
			break;
	
		case 0x82:
			setWMADDM(bus.mem.load_data());
			break;
	
		case 0x83:
			setWMADDH(bus.mem.load_data());
			break;
	}
}

function read_wram() : void {
	const bank: bus.bank = bus.mem.load_addrA_bank();

	// Banks $00-$3F and $80-$BF
	if (bank < 0x40 || bank >= 0x80 && bank < 0xc0) {
		const addr: bus.addr = bus.mem.load_addrA_addr();

		// Addresses $0000-$1FFF shadow Low RAM
		if (addr < 0x2000) {
			bus.mem.store_data(load<u8>(lowBank + addr));
		}
	}

	// Bank $7E
	else if (bank === 0x7e) {
		const addr: bus.addr = bus.mem.load_addrA_addr();

		// All addresses map Low RAM bank
		bus.mem.store_data(load<u8>(lowBank + addr));
	}

	// Bank $7F
	else if (bank === 0x7f) {
		const addr: bus.addr = bus.mem.load_addrA_addr();

		// All addresses map to Extended RAM bank
		bus.mem.store_data(load<u8>(extBank + addr));
	}
}

function write_wram() : void {
	const bank: bus.bank = bus.mem.load_addrA_bank();

	// Banks $00-$3F and $80-$BF
	if (bank < 0x40 || bank >= 0x80 && bank < 0xc0) {
		const addr: bus.addr = bus.mem.load_addrA_addr();

		// Addresses $0000-$1FFF shadow Low RAM
		if (addr < 0x2000) {
			store<u8>(lowBank + addr, bus.mem.load_data());
		}
	}

	// Bank $7E
	else if (bank === 0x7e) {
		const addr: bus.addr = bus.mem.load_addrA_addr();

		// All addresses map Low RAM bank
		store<u8>(lowBank + addr, bus.mem.load_data());
	}

	// Bank $7F
	else if (bank === 0x7f) {
		const addr: bus.addr = bus.mem.load_addrA_addr();

		// All addresses map to Extended RAM bank
		store<u8>(extBank + addr, bus.mem.load_data());
	}
}
