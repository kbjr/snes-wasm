
import { jsr, jsl } from './implementation';
import {
	Instruction_addr_absolute,
	Instruction_addr_absolute_long,
	Instruction_addr_absolute_indexedX_indirect
} from '../../addressing/absolute';

export let $20: Instruction_addr_absolute;
export let $22: Instruction_addr_absolute_long;
export let $FC: Instruction_addr_absolute_indexedX_indirect;

function init() : void {
	$20 = new Instruction_addr_absolute(jsr);
	$22 = new Instruction_addr_absolute_long(jsl);
	$FC = new Instruction_addr_absolute_indexedX_indirect(jsr);
}

init();
