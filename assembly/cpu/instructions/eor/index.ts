
import { eor, eor_u8, eor_u16 } from './implementation';
import { Instruction_addr_immediate } from '../../addressing/immediate';
import { Instruction_addr_stackRelative, Instruction_addr_stackRelative_indirect_indexedY } from '../../addressing/stack-relative';
import {
	Instruction_addr_absolute,
	Instruction_addr_absolute_indexedX,
	Instruction_addr_absolute_indexedY,
	Instruction_addr_absolute_long,
	Instruction_addr_absolute_long_indexedX
} from '../../addressing/absolute';
import {
	Instruction_addr_directPage,
	Instruction_addr_directPage_indexedX,
	Instruction_addr_directPage_indexedX_indirect,
	Instruction_addr_directPage_indirect,
	Instruction_addr_directPage_indirect_indexedY,
	Instruction_addr_directPage_indirect_long,
	Instruction_addr_directPage_indirect_long_indexedY
} from '../../addressing/direct-page';

export let $41: Instruction_addr_directPage_indexedX_indirect;
export let $43: Instruction_addr_stackRelative;
export let $45: Instruction_addr_directPage;
export let $47: Instruction_addr_directPage_indirect_long;
export let $49: Instruction_addr_immediate;
export let $4D: Instruction_addr_absolute;
export let $4F: Instruction_addr_absolute_long;
export let $51: Instruction_addr_directPage_indirect_indexedY;
export let $52: Instruction_addr_directPage_indirect;
export let $53: Instruction_addr_stackRelative_indirect_indexedY;
export let $55: Instruction_addr_directPage_indexedX;
export let $57: Instruction_addr_directPage_indirect_long_indexedY;
export let $59: Instruction_addr_absolute_indexedY;
export let $5D: Instruction_addr_absolute_indexedX;
export let $5F: Instruction_addr_absolute_long_indexedX;

function init() : void {
	$41 = new Instruction_addr_directPage_indexedX_indirect(eor);
	$43 = new Instruction_addr_stackRelative(eor);
	$45 = new Instruction_addr_directPage(eor);
	$47 = new Instruction_addr_directPage_indirect_long(eor);
	$49 = new Instruction_addr_immediate(eor_u8, eor_u16);
	$4D = new Instruction_addr_absolute(eor);
	$4F = new Instruction_addr_absolute_long(eor);
	$51 = new Instruction_addr_directPage_indirect_indexedY(eor);
	$52 = new Instruction_addr_directPage_indirect(eor);
	$53 = new Instruction_addr_stackRelative_indirect_indexedY(eor);
	$55 = new Instruction_addr_directPage_indexedX(eor);;
	$57 = new Instruction_addr_directPage_indirect_long_indexedY(eor);
	$59 = new Instruction_addr_absolute_indexedY(eor);
	$5D = new Instruction_addr_absolute_indexedX(eor);
	$5F = new Instruction_addr_absolute_long_indexedX(eor);
}

init();
