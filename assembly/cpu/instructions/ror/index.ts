
import { instruction } from '../../instruction'
import { Instruction_addr_absolute, Instruction_addr_absolute_indexedX } from '../../addressing/absolute';
import { Instruction_addr_directPage, Instruction_addr_directPage_indexedX } from '../../addressing/direct-page';
import { ror, ror_acc } from './implementation';

export let $6A: instruction.Instruction_custom;
export let $6E: Instruction_addr_absolute;
export let $66: Instruction_addr_directPage;
export let $7E: Instruction_addr_absolute_indexedX;
export let $76: Instruction_addr_directPage_indexedX;

function init() : void {
	$6A = new instruction.Instruction_custom(ror_acc);
	$6E = new Instruction_addr_absolute(ror);
	$66 = new Instruction_addr_directPage(ror);
	$7E = new Instruction_addr_absolute_indexedX(ror);
	$76 = new Instruction_addr_directPage_indexedX(ror);
}

init();
