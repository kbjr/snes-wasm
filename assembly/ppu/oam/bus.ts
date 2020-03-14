
import { getOAMDATAREAD, setOAMADDRL, setOAMADDRH, setOAMDATA } from './registers';
import { RD, WR, getAddrBusA_bank, getAddrBusA_addr, getDataBus, setDataBus } from '../../system-bus';

RD.addSystemCallback(onRD);
WR.addSystemCallback(onWR);

/**
 * OAM responds to the /RD line on Address Bus A
 * 
 * Banks $00-3F and $80-$BF:
 * 
 *     $2102 = OAMADDRL Register
 *     $2103 = OAMADDRH Register
 *     $2138 = OAMDATAREAD Register
 */
function onRD() : void {
	const bank = getAddrBusA_bank();

	// Banks $00-$3F and $80-$BF
	if (bank < 0x40 || bank >= 0x80 && bank < 0xc0) {
		const addr = getAddrBusA_addr();

		switch (addr) {
			case 0x2102:
				setOAMADDRL(getDataBus());
				break;
				
			case 0x2103:
				setOAMADDRH(getDataBus());
				break;
					
			case 0x2104:
				setOAMDATA(getDataBus());
				break;

			case 0x2138:
				// read-only
				break;
		}
	}
}

/**
 * OAM responds to the /WR line on Address Bus A
 * 
 * Banks $00-3F and $80-$BF:
 * 
 *     $2104 = OAMDATA Register
 */
function onWR() : void {
	const bank = getAddrBusA_bank();

	// Banks $00-$3F and $80-$BF
	if (bank < 0x40 || bank >= 0x80 && bank < 0xc0) {
		const addr = getAddrBusA_addr();

		switch (addr) {
			case 0x2102:
				// write-only
				break;
				
			case 0x2103:
				// write-only
				break;
					
			case 0x2104:
				// write-only
				break;

			case 0x2138:
				setDataBus(getOAMDATAREAD());
				break;
		}
	}
}
