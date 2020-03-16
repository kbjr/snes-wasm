
import { bus } from '../bus';
import { lowBank, extBank } from './wram';
import { getWMDATA, setWMADDH, setWMADDL, setWMADDM, setWMDATA } from './registers';

/**
 * WRAM responds to the /RD line on Address Bus A
 * 
 * Banks $00-$40:
 * 
 *     $0000-$2000 = Shadow Low RAM (Slow)
 *     $2180       = WMDATA Register (Fast)
 * 
 * Bank $7E:
 * 
 *     $0000-$1FFF = Low ROM (Slow)
 *     $2000-$FFFF = High ROM (Slow)
 * 
 * Bank $7F:
 * 
 *     $0000-$FFFF = Extended ROM (Slow)
 */
export function onRD() : void {
	const bank: bus.bank = bus.load_addrA_bank();

	// Banks $00-$3F
	if (bank < 0x40) {
		const addr: bus.addr = bus.load_addrA_addr();

		// Addresses $0000-$1FFF shadow Low RAM
		if (addr < 0x2000) {
			// Count cycles for a Slow memory access
			bus.cycles += bus.speed.slow;

			bus.store_data(load<u8>(lowBank + addr));
		}

		// Address $2180; The only other readable address here is the WMDATA register
		else if (addr === 0x2180) {
			// Count cycles for a Fast memory access
			bus.cycles += bus.speed.fast;

			bus.store_data(getWMDATA());
		}
	}

	// Bank $7E
	else if (bank === 0x7e) {
		const addr: bus.addr = bus.load_addrA_addr();

		// Count cycles for a Slow memory access
		bus.cycles += bus.speed.slow;

		// All addresses map Low RAM bank
		bus.store_data(load<u8>(lowBank + addr));
	}

	// Bank $7F
	else if (bank === 0x7f) {
		const addr: bus.addr = bus.load_addrA_addr();

		// Count cycles for a Slow memory access
		bus.cycles += bus.speed.slow;

		// All addresses map to Extended RAM bank
		bus.store_data(load<u8>(extBank + addr));
	}
}

/**
 * WRAM responds to the /WR line on Address Bus A
 * TODO: Count clock cycles?
 * 
 * Banks $00-$40:
 * 
 *     $0000-$2000 = Shadow Low RAM
 *     $2180       = WMDATA Register
 *     $2181       = WMADDL Register
 *     $2182       = WMADDM Register
 *     $2183       = WMADDH Register
 * 
 * Bank $7E:
 * 
 *     $0000-$1FFF = Low ROM
 *     $2000-$FFFF = High ROM
 * 
 * Bank $7F:
 * 
 *     $0000-$FFFF = Extended ROM
 */
export function onWR() : void {
	const bank: u8 = bus.load_addrA_bank();

	// Banks $00-$3F
	if (bank < 0x40) {
		const addr: u16 = bus.load_addrA_addr();

		// Addresses $0000-$1FFF shadow Low RAM
		if (addr < 0x2000) {
			store<u8>(lowBank + addr, bus.load_data());
		}

		// The only thing we map to in here are a handful of registers from $2180-$2183
		else {
			switch (addr) {
				case 0x2180:
					setWMDATA(bus.load_data());
					break;
			
				case 0x2181:
					setWMADDL(bus.load_data());
					break;
			
				case 0x2182:
					setWMADDM(bus.load_data());
					break;
			
				case 0x2183:
					setWMADDH(bus.load_data());
					break;
			}
		}
	}

	// Bank $7E
	else if (bank === 0x7e) {
		const addr: u16 = bus.load_addrA_addr();

		// All addresses map Low RAM bank
		store<u8>(lowBank + addr, bus.load_data());
	}

	// Bank $7F
	else if (bank === 0x7f) {
		const addr: u16 = bus.load_addrA_addr();

		// All addresses map to Extended RAM bank
		store<u8>(extBank + addr, bus.load_data());
	}
}
