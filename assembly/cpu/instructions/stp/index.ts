
import { instruction } from '../../instruction';
import { stp } from '../stp/implementation';

export let $DB: instruction.Instruction_custom;

function init() : void {
	$DB = new instruction.Instruction_custom(stp);
}

init();
