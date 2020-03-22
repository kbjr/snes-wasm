
import { sta } from './implementation';
import { Instruction_addr_stackRelative, Instruction_addr_stackRelative_indirect_indexedY } from '../../addressing/stack-relative';
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

export let $81: Instruction_addr_directPage_indexedX_indirect;
export let $83: Instruction_addr_stackRelative;
export let $85: Instruction_addr_directPage;
export let $87: Instruction_addr_directPage_indirect_long;
export let $8D: Instruction_addr_absolute;
export let $8F: Instruction_addr_absolute_long;
export let $91: Instruction_addr_directPage_indirect_indexedY;
export let $92: Instruction_addr_directPage_indirect;
export let $93: Instruction_addr_stackRelative_indirect_indexedY;
export let $95: Instruction_addr_directPage_indexedX;
export let $97: Instruction_addr_directPage_indirect_long_indexedY;
export let $99: Instruction_addr_absolute_indexedY;
export let $9D: Instruction_addr_absolute_indexedX;
export let $9F: Instruction_addr_absolute_long_indexedX;

function init() : void {
	$81 = new Instruction_addr_directPage_indexedX_indirect(sta);
	$83 = new Instruction_addr_stackRelative(sta);
	$85 = new Instruction_addr_directPage(sta);
	$87 = new Instruction_addr_directPage_indirect_long(sta);
	$8D = new Instruction_addr_absolute(sta);
	$8F = new Instruction_addr_absolute_long(sta);
	$91 = new Instruction_addr_directPage_indirect_indexedY(sta);
	$92 = new Instruction_addr_directPage_indirect(sta);
	$93 = new Instruction_addr_stackRelative_indirect_indexedY(sta);
	$95 = new Instruction_addr_directPage_indexedX(sta);
	$97 = new Instruction_addr_directPage_indirect_long_indexedY(sta);
	$99 = new Instruction_addr_absolute_indexedY(sta);
	$9D = new Instruction_addr_absolute_indexedX(sta);
	$9F = new Instruction_addr_absolute_long_indexedX(sta);
}

init();
