
// FIXME: Implement [4]
// FIXME: Where do we count all the cpu cycles?

import { and, and_u8, and_u16 } from './implementation';
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

export let $21: Instruction_addr_directPage_indexedX_indirect;
export let $23: Instruction_addr_stackRelative;
export let $25: Instruction_addr_directPage;
export let $27: Instruction_addr_directPage_indirect_long;
export let $29: Instruction_addr_immediate;
export let $2D: Instruction_addr_absolute;
export let $2F: Instruction_addr_absolute_long;
export let $31: Instruction_addr_directPage_indirect_indexedY;
export let $32: Instruction_addr_directPage_indirect;
export let $33: Instruction_addr_stackRelative_indirect_indexedY;
export let $35: Instruction_addr_directPage_indexedX;
export let $37: Instruction_addr_directPage_indirect_long_indexedY;
export let $39: Instruction_addr_absolute_indexedY;
export let $3D: Instruction_addr_absolute_indexedX;
export let $3F: Instruction_addr_absolute_long_indexedX;

function init() : void {
	$21 = new Instruction_addr_directPage_indexedX_indirect(and);
	$23 = new Instruction_addr_stackRelative(and);
	$25 = new Instruction_addr_directPage(and);
	$27 = new Instruction_addr_directPage_indirect_long(and);
	$29 = new Instruction_addr_immediate(and_u8, and_u16);
	$2D = new Instruction_addr_absolute(and);
	$2F = new Instruction_addr_absolute_long(and);
	$31 = new Instruction_addr_directPage_indirect_indexedY(and);
	$32 = new Instruction_addr_directPage_indirect(and);
	$33 = new Instruction_addr_stackRelative_indirect_indexedY(and);
	$35 = new Instruction_addr_directPage_indexedX(and);
	$37 = new Instruction_addr_directPage_indirect_long_indexedY(and);
	$39 = new Instruction_addr_absolute_indexedY(and);
	$3D = new Instruction_addr_absolute_indexedX(and);
	$3F = new Instruction_addr_absolute_long_indexedX(and);
}

init();
