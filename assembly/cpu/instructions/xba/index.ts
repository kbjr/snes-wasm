
import { xba } from './implementation';
import { instruction } from '../../instruction';

export let $EB: instruction.Instruction_custom;

function init() : void {
	$EB = new instruction.Instruction_custom(xba);
}

init();
