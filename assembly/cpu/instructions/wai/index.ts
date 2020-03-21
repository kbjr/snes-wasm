
import { wai } from './implementation';
import { instruction } from '../../instruction';

export let $CB: instruction.Instruction_custom;

function init() : void {
	$CB = new instruction.Instruction_custom(wai);
}

init();
