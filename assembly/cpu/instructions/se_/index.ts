
import { instruction } from '../../instruction';
import { Instruction_addr_immediate_u8 } from '../../addressing/immediate';
import { sec_, sed_, sei_, sep_ } from './implementation';

export namespace sec {
	export let $38: instruction.Instruction_custom;
}

export namespace sed {
	export let $F8: instruction.Instruction_custom;
}

export namespace sei {
	export let $78: instruction.Instruction_custom;
}

export namespace sep {
	export let $E2: Instruction_addr_immediate_u8;
}

function init() : void {
	sec.$38 = new instruction.Instruction_custom(sec_);
	sed.$F8 = new instruction.Instruction_custom(sed_);
	sei.$78 = new instruction.Instruction_custom(sei_);
	sep.$E2 = new Instruction_addr_immediate_u8(sep_);
}

init();
