
import { lowBank } from './wram';

export namespace wram {
	export function getPointer() : u32 {
		return lowBank;
	}

	export namespace registers {
		// WMDATA
		// WMADD
		// WMADDL
		// WMADDM
		// WMADDH
	}
}
