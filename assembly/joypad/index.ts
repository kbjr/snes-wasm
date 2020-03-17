
import { p } from '../mem';
import { addr as portAddr } from './ports';
import { addr as regAddr } from './registers';

export namespace joypad {
	export function getPort1() : p {
		return portAddr;
	}

	export function getPort2() : p {
		return portAddr + 2;
	}

	export function getPort3() : p {
		return portAddr + 4;
	}

	export function getPort4() : p {
		return portAddr + 6;
	}

	export function getRegisters() : p {
		return regAddr;
	}
}
