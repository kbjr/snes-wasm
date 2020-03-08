
import { p } from '../mem';
import { addr } from './index';

/** The publicly exposed (out of wasm) interface to the system bus */
export namespace SystemBus {
	export function getSystemBus() : p {
		return addr;
	}
}
