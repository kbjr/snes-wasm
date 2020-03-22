
import { cop } from './implementation';
import { Instruction_addr_immediate_u8 } from '../../addressing/immediate';

export let $02: Instruction_addr_immediate_u8;

function init() : void {
	$02 = new Instruction_addr_immediate_u8(cop);
}

init();
