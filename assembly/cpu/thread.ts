
import { getNextInstruction } from './instructions';
import { Thread, Instruction } from '../scheduler';

export class CPUThread extends Thread {
	protected next() : Instruction {
		return getNextInstruction();
	}

	public waitForInterrupt() {
		this.idle = true;
	}

	protected onInterupt() {
		this.idle = false;

		// TODO: Handle interrupts
		// TODO: "The decimal mode is now reset to binary after a hardware reset or an interrupt."
	}
}


// let idle: bool = false;

// /** The CPU's main loop function */
// export function main() : void {
// 	// First, check to see if there is an interrupt to handle
// 	switch (cpuThread.activeInterrupt) {
// 		// TODO: "The decimal mode is now reset to binary after a hardware reset or an interrupt."

// 		case Interrupt.RESET:
// 			// TODO: RESET interupt
// 			break;
		
// 		// Otherwise, execute the next instruction
// 		case Interrupt.NONE:
// 		default:
// 			step();
// 			break;
// 	}
// }

// // @ts-ignore: decorator
// @inline export function waitForInterrupt() : void {
// 	idle = true;
// }

// /** Run the next actual instruction (or idle if waiting) */
// function step() : void {
// 	if (idle) {
// 		cpuThread.countCycles(1);
// 	}

// 	else {
// 		cpuThread.runInstruction(getNextInstruction());
// 	}
// }
