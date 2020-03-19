
import { wdm } from './implementation';
import { instruction } from '../../instruction';

export let $42: instruction.Instruction_custom;

function init() : void {
	$42 = new instruction.Instruction_custom(wdm);
}

init();
