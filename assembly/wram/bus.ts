
import { lowBank, extBank } from './wram';
import { RD, WR, getAddrBusA_bank, getAddrBusA_addr, getDataBus, setDataBus } from '../system-bus';
import { getWMDATA, setWMADDH, setWMADDL, setWMADDM, setWMDATA } from './registers';

RD.addSystemCallback(onRD);
WR.addSystemCallback(onWR);

/**
 * WRAM responds to the /RD line on Address Bus A
 * 
 * Banks $00-$40:
 * 
 *     $0000-$2000 = Shadow Low RAM
 *     $2180       = WMDATA Register
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
function onRD() : void {
	const bank: u8 = getAddrBusA_bank();

	// Banks $00-$3F
	if (bank < 0x40) {
		const addr: u16 = getAddrBusA_addr();

		// Addresses $0000-$1FFF shadow Low RAM
		if (addr < 0x2000) {
			setDataBus(load<u8>(lowBank + addr));
		}

		// Address $2180; The only other readable address here is the WMDATA register
		else if (addr === 0x2180) {
			setDataBus(getWMDATA());
		}
	}

	// Bank $7E
	else if (bank === 0x7e) {
		const addr: u16 = getAddrBusA_addr();

		// All addresses map Low RAM bank
		setDataBus(load<u8>(lowBank + addr));
	}

	// Bank $7F
	else if (bank === 0x7f) {
		const addr: u16 = getAddrBusA_addr();

		// All addresses map to Extended RAM bank
		setDataBus(load<u8>(extBank + addr));
	}
}

/**
 * WRAM responds to the /WR line on Address Bus A
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
function onWR() : void {
	const bank: u8 = getAddrBusA_bank();

	// Banks $00-$3F
	if (bank < 0x40) {
		const addr: u16 = getAddrBusA_addr();

		// Addresses $0000-$1FFF shadow Low RAM
		if (addr < 0x2000) {
			store<u8>(lowBank + addr, getDataBus());
		}

		// The only thing we map to in here are a handful of registers from $2180-$2183
		else {
			switch (addr) {
				case 0x2180:
					setWMDATA(getDataBus());
					break;
			
				case 0x2181:
					setWMADDL(getDataBus());
					break;
			
				case 0x2182:
					setWMADDM(getDataBus());
					break;
			
				case 0x2183:
					setWMADDH(getDataBus());
					break;
			}
		}
	}

	// Bank $7E
	else if (bank === 0x7e) {
		const addr: u16 = getAddrBusA_addr();

		// All addresses map Low RAM bank
		store<u8>(lowBank + addr, getDataBus());
	}

	// Bank $7F
	else if (bank === 0x7f) {
		const addr: u16 = getAddrBusA_addr();

		// All addresses map to Extended RAM bank
		store<u8>(extBank + addr, getDataBus());
	}
}
