
import { instruction } from '../../instruction';
import { Instruction_addr_directPage, Instruction_addr_directPage_indexedX } from '../../addressing/direct-page';
import { Instruction_addr_absolute, Instruction_addr_absolute_indexedX } from '../../addressing/absolute';
import { lsr, lsr_acc } from './implementation';

export let $46: Instruction_addr_directPage;
export let $4A: instruction.Instruction_custom;
export let $4E: Instruction_addr_absolute;
export let $56: Instruction_addr_directPage_indexedX;
export let $5E: Instruction_addr_absolute_indexedX;

function init() : void {
	$46 = new Instruction_addr_directPage(lsr);
	$4A = new instruction.Instruction_custom(lsr_acc);
	$4E = new Instruction_addr_absolute(lsr);
	$56 = new Instruction_addr_directPage_indexedX(lsr);
	$5E = new Instruction_addr_absolute_indexedX(lsr);
}

init();
