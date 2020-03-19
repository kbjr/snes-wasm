
// FIXME: Implement [4]
// FIXME: Where do we count all the cpu cycles?

import { adc, adc_u8, adc_u16 } from './implementation';
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

export let $61: Instruction_addr_directPage_indexedX_indirect;
export let $63: Instruction_addr_stackRelative;
export let $65: Instruction_addr_directPage;
export let $67: Instruction_addr_directPage_indirect_long;
export let $69: Instruction_addr_immediate;
export let $6D: Instruction_addr_absolute;
export let $6F: Instruction_addr_absolute_long;
export let $71: Instruction_addr_directPage_indirect_indexedY;
export let $72: Instruction_addr_directPage_indirect;
export let $73: Instruction_addr_stackRelative_indirect_indexedY;
export let $75: Instruction_addr_directPage_indexedX;
export let $77: Instruction_addr_directPage_indirect_long_indexedY;
export let $79: Instruction_addr_absolute_indexedY;
export let $7D: Instruction_addr_absolute_indexedX;
export let $7F: Instruction_addr_absolute_long_indexedX;

function init() : void {
	$61 = new Instruction_addr_directPage_indexedX_indirect(adc);
	$63 = new Instruction_addr_stackRelative(adc);
	$65 = new Instruction_addr_directPage(adc);
	$67 = new Instruction_addr_directPage_indirect_long(adc);
	$69 = new Instruction_addr_immediate(adc_u8, adc_u16);
	$6D = new Instruction_addr_absolute(adc);
	$6F = new Instruction_addr_absolute_long(adc);
	$71 = new Instruction_addr_directPage_indirect_indexedY(adc);
	$72 = new Instruction_addr_directPage_indirect(adc);
	$73 = new Instruction_addr_stackRelative_indirect_indexedY(adc);
	$75 = new Instruction_addr_directPage_indexedX(adc);
	$77 = new Instruction_addr_directPage_indirect_long_indexedY(adc);
	$79 = new Instruction_addr_absolute_indexedY(adc);
	$7D = new Instruction_addr_absolute_indexedX(adc);
	$7F = new Instruction_addr_absolute_long_indexedX(adc);
}

init();
