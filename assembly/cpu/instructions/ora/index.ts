
// FIXME: Implement [4]
// FIXME: Where do we count all the cpu cycles?

import { ora, ora_u8, ora_u16 } from './implementation';
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

export let $01: Instruction_addr_directPage_indexedX_indirect;
export let $03: Instruction_addr_stackRelative;
export let $05: Instruction_addr_directPage;
export let $07: Instruction_addr_directPage_indirect_long;
export let $09: Instruction_addr_immediate;
export let $0D: Instruction_addr_absolute;
export let $0F: Instruction_addr_absolute_long;
export let $11: Instruction_addr_directPage_indirect_indexedY;
export let $12: Instruction_addr_directPage_indirect;
export let $13: Instruction_addr_stackRelative_indirect_indexedY;
export let $15: Instruction_addr_directPage_indexedX;
export let $17: Instruction_addr_directPage_indirect_long_indexedY;
export let $19: Instruction_addr_absolute_indexedY;
export let $1D: Instruction_addr_absolute_indexedX;
export let $1F: Instruction_addr_absolute_long_indexedX;

function init() : void {
	$01 = new Instruction_addr_directPage_indexedX_indirect(ora);
	$03 = new Instruction_addr_stackRelative(ora);
	$05 = new Instruction_addr_directPage(ora);
	$07 = new Instruction_addr_directPage_indirect_long(ora);
	$09 = new Instruction_addr_immediate(ora_u8, ora_u16);
	$0D = new Instruction_addr_absolute(ora);
	$0F = new Instruction_addr_absolute_long(ora);
	$11 = new Instruction_addr_directPage_indirect_indexedY(ora);
	$12 = new Instruction_addr_directPage_indirect(ora);
	$13 = new Instruction_addr_stackRelative_indirect_indexedY(ora);
	$15 = new Instruction_addr_directPage_indexedX(ora);;
	$17 = new Instruction_addr_directPage_indirect_long_indexedY(ora);
	$19 = new Instruction_addr_absolute_indexedY(ora);
	$1D = new Instruction_addr_absolute_indexedX(ora);
	$1F = new Instruction_addr_absolute_long_indexedX(ora);
}

init();
