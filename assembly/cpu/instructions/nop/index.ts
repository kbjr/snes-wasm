
import { nop } from './implementation';
import { instruction } from '../../instruction';

export let $EA: instruction.Instruction_custom;

function init() : void {
	$EA = new instruction.Instruction_custom(nop);
}

init();
