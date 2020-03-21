
import { sbc, sbc_u8, sbc_u16 } from './implementation';
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

export let $E1: Instruction_addr_directPage_indexedX_indirect;
export let $E3: Instruction_addr_stackRelative;
export let $E5: Instruction_addr_directPage;
export let $E7: Instruction_addr_directPage_indirect_long;
export let $E9: Instruction_addr_immediate;
export let $ED: Instruction_addr_absolute;
export let $EF: Instruction_addr_absolute_long;
export let $F1: Instruction_addr_directPage_indirect_indexedY;
export let $F2: Instruction_addr_directPage_indirect;
export let $F3: Instruction_addr_stackRelative_indirect_indexedY;
export let $F5: Instruction_addr_directPage_indexedX;
export let $F7: Instruction_addr_directPage_indirect_long_indexedY;
export let $F9: Instruction_addr_absolute_indexedY;
export let $FD: Instruction_addr_absolute_indexedX;
export let $FF: Instruction_addr_absolute_long_indexedX;

function init() : void {
	$E1 = new Instruction_addr_directPage_indexedX_indirect(sbc);
	$E3 = new Instruction_addr_stackRelative(sbc);
	$E5 = new Instruction_addr_directPage(sbc);
	$E7 = new Instruction_addr_directPage_indirect_long(sbc);
	$E9 = new Instruction_addr_immediate(sbc_u8, sbc_u16);
	$ED = new Instruction_addr_absolute(sbc);
	$EF = new Instruction_addr_absolute_long(sbc);
	$F1 = new Instruction_addr_directPage_indirect_indexedY(sbc);
	$F2 = new Instruction_addr_directPage_indirect(sbc);
	$F3 = new Instruction_addr_stackRelative_indirect_indexedY(sbc);
	$F5 = new Instruction_addr_directPage_indexedX(sbc);
	$F7 = new Instruction_addr_directPage_indirect_long_indexedY(sbc);
	$F9 = new Instruction_addr_absolute_indexedY(sbc);
	$FD = new Instruction_addr_absolute_indexedX(sbc);
	$FF = new Instruction_addr_absolute_long_indexedX(sbc);
}

init();
