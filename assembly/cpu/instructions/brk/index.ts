
import { brk } from './implementation';
import { instruction } from '../../instruction';

export let $00: instruction.Instruction_custom;

function init() : void {
	$00 = new instruction.Instruction_custom(brk);
}

init();
