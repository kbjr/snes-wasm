
import { instruction } from '../../instruction';
import { rti_, rtl_, rts_ } from './implementation';

export namespace rti {
	export let $40: instruction.Instruction_custom;
}

export namespace rtl {
	export let $6B: instruction.Instruction_custom;
}

export namespace rts {
	export let $60: instruction.Instruction_custom;
}

function init() : void {
	rti.$40 = new instruction.Instruction_custom(rti_);
	rtl.$6B = new instruction.Instruction_custom(rtl_);
	rts.$60 = new instruction.Instruction_custom(rts_);
}

init();
