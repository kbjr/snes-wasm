
import { xce } from './implementation';
import { instruction } from '../../instruction';

export let $FB: instruction.Instruction_custom;

function init() : void {
	$FB = new instruction.Instruction_custom(xce);
}

init();
