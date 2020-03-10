
import { p } from '../mem';
import { registers } from './registers';
import { executeInstruction as exec } from './execute';

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

	export function executeInstruction() : void {
		exec();
	}
}
