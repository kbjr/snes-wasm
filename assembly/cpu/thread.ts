
import { bus } from '../bus';
import { interrupt } from '../constants';
import { instruction } from './instruction';
import { getNextInstruction } from './instructions';
import { Thread, scheduler } from '../scheduler';
import { interrupt_reset, interrupt_brk } from './interrupt';

export function createThread_cpu() : Thread {
	return new Thread(main, onInterrupt);
}

let currentInterrupt: u8 = interrupt.none;
let currentInstruction: instruction.Instruction | null = null;

/** Current status of the thread */
export namespace status {
	export let current: u8 = 0x00;

	/** Normal operation */
	export const normal: u8 = 0x00;
	/** Triggered by the `wai` instruction, will idle until an interrupt occurs */
	export const waiting: u8 = 0x01;
	/** Triggered by the `stp` instruction, will idle until a reset occurs */
	export const stopped: u8 = 0x02;
}

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
			interrupt_reset();
			break;
		
		case interrupt.brk:
			interrupt_brk();
			break;
	}

	currentInterrupt = interrupt.none;
}
