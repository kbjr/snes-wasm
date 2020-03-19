
import { bit, bit_u8, bit_u16 } from './implementation';
import { Instruction_addr_immediate } from '../../addressing/immediate';
import { Instruction_addr_absolute, Instruction_addr_absolute_indexedX } from '../../addressing/absolute';
import { Instruction_addr_directPage, Instruction_addr_directPage_indexedX } from '../../addressing/direct-page';

export let $24: Instruction_addr_directPage;
export let $2C: Instruction_addr_absolute;
export let $34: Instruction_addr_directPage_indexedX;
export let $3C: Instruction_addr_absolute_indexedX;
export let $89: Instruction_addr_immediate;

function init() : void {
	$24 = new Instruction_addr_directPage(bit);
	$2C = new Instruction_addr_absolute(bit);
	$34 = new Instruction_addr_directPage_indexedX(bit);
	$3C = new Instruction_addr_absolute_indexedX(bit);
	$89 = new Instruction_addr_immediate(bit_u8, bit_u16);
}

init();
