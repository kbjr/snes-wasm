
import { lda, lda_u8, lda_u16 } from './implementation';
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

export let $A1: Instruction_addr_directPage_indexedX_indirect;
export let $A3: Instruction_addr_stackRelative;
export let $A5: Instruction_addr_directPage;
export let $A7: Instruction_addr_directPage_indirect_long;
export let $A9: Instruction_addr_immediate;
export let $AD: Instruction_addr_absolute;
export let $AF: Instruction_addr_absolute_long;
export let $B1: Instruction_addr_directPage_indirect_indexedY;
export let $B2: Instruction_addr_directPage_indirect;
export let $B3: Instruction_addr_stackRelative_indirect_indexedY;
export let $B5: Instruction_addr_directPage_indexedX;
export let $B7: Instruction_addr_directPage_indirect_long_indexedY;
export let $B9: Instruction_addr_absolute_indexedY;
export let $BD: Instruction_addr_absolute_indexedX;
export let $BF: Instruction_addr_absolute_long_indexedX;

function init() : void {
	$A1 = new Instruction_addr_directPage_indexedX_indirect(lda);
	$A3 = new Instruction_addr_stackRelative(lda);
	$A5 = new Instruction_addr_directPage(lda);
	$A7 = new Instruction_addr_directPage_indirect_long(lda);
	$A9 = new Instruction_addr_immediate(lda_u8, lda_u16);
	$AD = new Instruction_addr_absolute(lda);
	$AF = new Instruction_addr_absolute_long(lda);
	$B1 = new Instruction_addr_directPage_indirect_indexedY(lda);
	$B2 = new Instruction_addr_directPage_indirect(lda);
	$B3 = new Instruction_addr_stackRelative_indirect_indexedY(lda);
	$B5 = new Instruction_addr_directPage_indexedX(lda);
	$B7 = new Instruction_addr_directPage_indirect_long_indexedY(lda);
	$B9 = new Instruction_addr_absolute_indexedY(lda);
	$BD = new Instruction_addr_absolute_indexedX(lda);
	$BF = new Instruction_addr_absolute_long_indexedX(lda);
}

init();
