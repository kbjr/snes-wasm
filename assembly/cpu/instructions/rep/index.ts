
import { rep } from './implementation';
import { Instruction_addr_immediate_u8 } from '../../addressing/immediate';

export let $C2: Instruction_addr_immediate_u8;

function init() {
	$C2 = new Instruction_addr_immediate_u8(rep);
}

init();
