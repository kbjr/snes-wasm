
import { waitForInterrupt } from '../thread';
import { cpuThread } from '../../scheduler';

/**
 * wai
 * Wait for Interrupt Instruction
 *
 * Opcode:     0xCB
 * Flags:      ---------
 * Addressing: Implied
 * Bytes:      1
 * Cycles:     3 [1]
 *
 *     wai
 *
 * Put the processor to sleep (sets the RDY pin low) until a hardware interrupt (NMI, IRQ, ABORT, or
 * RESET) is received. Once an interrupt is received, the RTI from the interrupt handler will return control
 * to the instruction following the original WAI. If, however, interrupts are disabled due to setting
 * the I flag _before_ WAI is called, an IRQ will immediately return control to next instsruction, rather than
 * going through the interrupt handler.
 * 
 * [1]: Uses 3 cycles to shut the processor down; additional cycles are required by interrupt to restart it
 */
export namespace wai {
	export function $CB() : bool {
		waitForInterrupt();

		// Count 3 cycles for the instruction
		cpuThread.countCycles(3);

		return false;
	}
}
