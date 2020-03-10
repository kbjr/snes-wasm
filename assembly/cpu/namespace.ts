
import { p } from '../mem';
import { registers } from './registers';

/**
 * Publicly exported interface to the CPU (WDC 65816)
 * 
 * 
 */
export namespace CPU {
	/**
	 * Returns the address in reserved memory where the CPU registers can be found
	 */
	export function getRegisters() : p {
		return registers.addr;
	}
}
