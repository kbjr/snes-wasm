
import { scheduler } from '../../scheduler';
import { instruction } from '../instruction';

export let $EA: instruction.Instruction_custom;

/**
 * nop
 * No Operation Instruction
 *
 * Opcode:     0xEA
 * Flags:      ---------
 * Addressing: Implied
 * Bytes:      1
 * Cycles:     2
 *
 *     nop
 *
 * Takes no action at all.
 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function nop(inst: instruction.Instruction) : true {
	// Idle for 1 I/O cycle (6 master cycles)
	scheduler.scheduler.cpuThread.countCycles(6);
	
	return true;
}

function init() : void {
	$EA = new instruction.Instruction_custom(nop);
}

init();
