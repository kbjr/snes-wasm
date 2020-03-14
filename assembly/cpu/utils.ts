
import { cpuThread } from '../scheduler';

type Implementation = (pointer: u32) => void;

type AddressingMode = () => u32;

/**
 * Simple shorthand utility that 
 * 
 * @param implementation The actual instruction implementation
 * @param addr The function that handles the addressing
 * @param cycles The number of cycles to count for the instruction
 */
// @ts-ignore: decorator
@inline export function exec(implementation: Implementation, addr: AddressingMode, cycles: u8) : false {
	const pointer = addr();

	implementation(pointer);

	cpuThread.countCycles(cycles);

	return false;
}
