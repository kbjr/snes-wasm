
import { instruction } from '../../instruction'
import { Instruction_addr_absolute, Instruction_addr_absolute_indexedX } from '../../addressing/absolute';
import { Instruction_addr_directPage, Instruction_addr_directPage_indexedX } from '../../addressing/direct-page';
import { rol, rol_acc } from './implementation';

export let $2A: instruction.Instruction_custom;
export let $2E: Instruction_addr_absolute;
export let $26: Instruction_addr_directPage;
export let $3E: Instruction_addr_absolute_indexedX;
export let $36: Instruction_addr_directPage_indexedX;

function init() : void {
	$2A = new instruction.Instruction_custom(rol_acc);
	$2E = new Instruction_addr_absolute(rol);
	$26 = new Instruction_addr_directPage(rol);
	$3E = new Instruction_addr_absolute_indexedX(rol);
	$36 = new Instruction_addr_directPage_indexedX(rol);
}

init();
