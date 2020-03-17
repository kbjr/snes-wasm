
import { bus } from '../bus';
import { interrupt } from '../constants';
import { instruction } from './instruction';
import { getNextInstruction } from './instructions';
import { Thread, scheduler } from '../scheduler';

export function createThread_cpu() : Thread {
	return new Thread(main, onInterrupt);
}

let currentInterrupt: u8 = interrupt.none;
let currentInstruction: instruction.Instruction | null = null;



function main() : void {
	if (currentInstruction === null) {
		if (currentInterrupt) {
			onInterrupt(currentInterrupt);
		}

		currentInstruction = getNextInstruction();
	}

	const finished = currentInstruction.exec();

	// If the currently executing instruction is fully finished, remove the reference so we load
	// the next instruction next loop
	if (finished) {
		currentInstruction = null;
	}

	// Count any cycles spent on the bus
	if (bus.cycles) {
		scheduler.scheduler.cpuThread.countCycles(bus.cycles);
		bus.cycles = 0;
	}
}



function onInterrupt(type: u8) : void {
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
