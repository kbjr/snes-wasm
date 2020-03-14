
import { RD, getAddrBusA_addr, getAddrBusA_bank, setDataBus } from '../system-bus';
import { getJOY1L, getJOY1H, getJOY2L, getJOY2H, getJOY3L, getJOY3H, getJOY4L, getJOY4H } from './registers';

RD.addSystemCallback(onRD);

/**
 * The JoyPad ports respond to the /RD line on Address Bus A
 * 
 * Banks $00-3F and $80-$BF:
 * 
 *     $4218 = JOY1L Register
 *     $4219 = JOY1H Register
 *     $421A = JOY2L Register
 *     $421B = JOY2H Register
 *     $421C = JOY3L Register
 *     $421D = JOY3H Register
 *     $421E = JOY4L Register
 *     $421F = JOY4H Register
 */
function onRD() : void {
	const bank: u8 = getAddrBusA_bank();

	// Banks $00-$3F and $80-$BF
	if (bank < 0x40 || bank >= 0x80 && bank < 0xc0) {
		const addr: u16 = getAddrBusA_addr();

		// Addresses $4218-$421F map to registers
		switch (addr) {
			case 0x4218:
				setDataBus(getJOY1L());
				break;

			case 0x4219:
				setDataBus(getJOY1H());
				break;

			case 0x421a:
				setDataBus(getJOY2L());
				break;

			case 0x421b:
				setDataBus(getJOY2H());
				break;

			case 0x421c:
				setDataBus(getJOY3L());
				break;

			case 0x421d:
				setDataBus(getJOY3H());
				break;

			case 0x421e:
				setDataBus(getJOY4L());
				break;

			case 0x421f:
				setDataBus(getJOY4H());
				break;
		}
	}
}
