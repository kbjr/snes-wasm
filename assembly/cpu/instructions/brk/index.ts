
/**
 * #### Software Break Instruction (`brk`)
 *
 * Forces a software interrupt. This interrupt is unaffected by the Interrupt Disable (`I`) flag.
 * 
 * Although `brk` is a 1 byte instruction, the Program Counter (`PC`) is incremented by 2, allowing
 * for a signature byte to indicate the cause of the interrupt.
 * 
 *     | OpCode | Syntax | Addressing        | Flags                 | Bytes | Cycles |
 *     |--------|--------|-------------------|-----------------------|-------|--------|
 *     | 0x00   | brk    | Stack / Interrupt | ----DI--0 / ---BDI--1 | 2     | 7 [1]  |
 * 
 * [1]: Add 1 extra cycle if Emulation mode (E = 1)
 */

import { brk } from './implementation';
import { instruction } from '../../instruction';

export let $00: instruction.Instruction_custom;

function init() : void {
	$00 = new instruction.Instruction_custom(brk);
}

init();
