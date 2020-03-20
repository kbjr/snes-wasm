
import { instruction } from '../../instruction';
import { clc_, cld_, cli_, clv_ } from './implementation';

export namespace clc {
	export let $18: instruction.Instruction_custom;
}

export namespace cld {
	export let $D8: instruction.Instruction_custom;
}

export namespace cli {
	export let $58: instruction.Instruction_custom;
}

export namespace clv {
	export let $B8: instruction.Instruction_custom;
}

function init() : void {
	clc.$18 = new instruction.Instruction_custom(clc_);
	cld.$D8 = new instruction.Instruction_custom(cld_);
	cli.$58 = new instruction.Instruction_custom(cli_);
	clv.$B8 = new instruction.Instruction_custom(clv_);
}

init();
