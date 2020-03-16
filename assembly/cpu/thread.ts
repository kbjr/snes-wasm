
import { Thread, scheduler } from '../scheduler';
import { interrupt } from '../constants';
import { instruction } from './instruction';
import { getNextInstruction } from './instructions';

export function createThread_cpu() : Thread {
	return new Thread(main, onInterrupt);
}

let currentInterrupt: interrupt.type = interrupt.none;
let currentInstruction: instruction.Instruction | null = null;

function main() : void {
	if (currentInstruction === null) {
		if (currentInterrupt) {
			onInterrupt(currentInterrupt);
		}

		// FIXME: getNextInstruction() should be returning Instructions
		currentInstruction = getNextInstruction() as any as instruction.Instruction;
	}

	const finished = currentInstruction.exec();

	if (finished) {
		currentInstruction = null;
	}
}

function onInterrupt(type: interrupt.type) : void {
	// TODO: Under what circumstances do we do this?
	scheduler.scheduler.cpuThread.idle = false;

	// If an instruction is running, wait for it to finish
	if (currentInstruction) {
		currentInterrupt = type;

		return;
	}

	switch (type) {
		case interrupt.none:
			// 
			break;
		
		case interrupt.reset:
			// 
			break;
		
		case interrupt.brk:
			// 
			break;
	}

	currentInterrupt = interrupt.none;
}
