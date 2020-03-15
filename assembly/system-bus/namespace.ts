
import { p } from '../mem';
import { addr } from './index';
import { read_u8_silent } from './shortcuts';

/** The publicly exposed (out of wasm) interface to the system bus */
export namespace SystemBus {
	export function getSystemBus() : p {
		return addr;
	}

	/** Returns the value mapped to the given SNES address */
	export function read_u8(pointer: u32) : u8 {
		return read_u8_silent(pointer);
	}
}
