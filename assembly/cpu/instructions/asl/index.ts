
import { asl, asl_acc } from './implementation';
import { instruction } from '../../instruction';
import { Instruction_addr_absolute, Instruction_addr_absolute_indexedX } from '../../addressing/absolute';
import { Instruction_addr_directPage, Instruction_addr_directPage_indexedX } from '../../addressing/direct-page';

export let $06: Instruction_addr_directPage;
export let $0A: instruction.Instruction_custom;
export let $0E: Instruction_addr_absolute;
export let $16: Instruction_addr_directPage_indexedX;
export let $1E: Instruction_addr_absolute_indexedX;

function init() : void {
	$06 = new Instruction_addr_directPage(asl);
	$0A = new instruction.Instruction_custom(asl_acc);
	$0E = new Instruction_addr_absolute(asl);
	$16 = new Instruction_addr_directPage_indexedX(asl);
	$1E = new Instruction_addr_absolute_indexedX(asl);
}

init();
