
import { jmp, jml } from './implementation';
import {
	Instruction_addr_absolute,
	Instruction_addr_absolute_long,
	Instruction_addr_absolute_indirect,
	Instruction_addr_absolute_indexedX_indirect,
	Instruction_addr_absolute_indirect_long
} from '../../addressing/absolute';

export let $4C: Instruction_addr_absolute;
export let $5C: Instruction_addr_absolute_long;
export let $6C: Instruction_addr_absolute_indirect;
export let $7C: Instruction_addr_absolute_indexedX_indirect;
export let $DC: Instruction_addr_absolute_indirect_long;

function init() : void {
	$4C = new Instruction_addr_absolute(jmp);
	$5C = new Instruction_addr_absolute_long(jml);
	$6C = new Instruction_addr_absolute_indirect(jmp);
	$7C = new Instruction_addr_absolute_indexedX_indirect(jmp);
	$DC = new Instruction_addr_absolute_indirect_long(jml);
}

init();
