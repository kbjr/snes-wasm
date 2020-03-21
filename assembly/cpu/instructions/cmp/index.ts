
import { cmp, cmp_u8, cmp_u16 } from './implementation';
import { Instruction_addr_immediate } from '../../addressing/immediate';
import {
	Instruction_addr_stackRelative,
	Instruction_addr_stackRelative_indirect_indexedY
} from '../../addressing/stack-relative';
import {
	Instruction_addr_directPage_indexedX_indirect,
	Instruction_addr_directPage,
	Instruction_addr_directPage_indirect_long,
	Instruction_addr_directPage_indirect_indexedY,
	Instruction_addr_directPage_indirect,
	Instruction_addr_directPage_indexedX,
	Instruction_addr_directPage_indirect_long_indexedY
} from '../../addressing/direct-page';
import {
	Instruction_addr_absolute,
	Instruction_addr_absolute_long,
	Instruction_addr_absolute_indexedY,
	Instruction_addr_absolute_indexedX,
	Instruction_addr_absolute_long_indexedX
} from '../../addressing/absolute';

export let $C1: Instruction_addr_directPage_indexedX_indirect;
export let $C3: Instruction_addr_stackRelative;
export let $C5: Instruction_addr_directPage;
export let $C7: Instruction_addr_directPage_indirect_long;
export let $C9: Instruction_addr_immediate;
export let $CD: Instruction_addr_absolute;
export let $CF: Instruction_addr_absolute_long;
export let $D1: Instruction_addr_directPage_indirect_indexedY;
export let $D2: Instruction_addr_directPage_indirect;
export let $D3: Instruction_addr_stackRelative_indirect_indexedY;
export let $D5: Instruction_addr_directPage_indexedX;
export let $D7: Instruction_addr_directPage_indirect_long_indexedY;
export let $D9: Instruction_addr_absolute_indexedY;
export let $DD: Instruction_addr_absolute_indexedX;
export let $DF: Instruction_addr_absolute_long_indexedX;

function init() : void {
	$C1 = new Instruction_addr_directPage_indexedX_indirect(cmp);
	$C3 = new Instruction_addr_stackRelative(cmp);
	$C5 = new Instruction_addr_directPage(cmp);
	$C7 = new Instruction_addr_directPage_indirect_long(cmp);
	$C9 = new Instruction_addr_immediate(cmp_u8, cmp_u16);
	$CD = new Instruction_addr_absolute(cmp);
	$CF = new Instruction_addr_absolute_long(cmp);
	$D1 = new Instruction_addr_directPage_indirect_indexedY(cmp);
	$D2 = new Instruction_addr_directPage_indirect(cmp);
	$D3 = new Instruction_addr_stackRelative_indirect_indexedY(cmp);
	$D5 = new Instruction_addr_directPage_indexedX(cmp);
	$D7 = new Instruction_addr_directPage_indirect_long_indexedY(cmp);
	$D9 = new Instruction_addr_absolute_indexedY(cmp);
	$DD = new Instruction_addr_absolute_indexedX(cmp);
	$DF = new Instruction_addr_absolute_long_indexedX(cmp);
}

init();
