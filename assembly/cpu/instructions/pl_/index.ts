
import { instruction } from '../../instruction';
import { pull_acc, pull_dbr, pull_dp, pull_p, pull_x, pull_y } from './implementation';

export namespace pla {
	export let $68: instruction.Instruction_custom;
}

export namespace plb {
	export let $AB: instruction.Instruction_custom;
}

export namespace pld {
	export let $2B: instruction.Instruction_custom;
}

export namespace plp {
	export let $28: instruction.Instruction_custom;
}

export namespace plx {
	export let $FA: instruction.Instruction_custom;
}

export namespace ply {
	export let $7A: instruction.Instruction_custom;
}

function init() : void {
	pla.$68 = new instruction.Instruction_custom(pull_acc);
	plb.$AB = new instruction.Instruction_custom(pull_dbr);
	pld.$2B = new instruction.Instruction_custom(pull_dp);
	plp.$28 = new instruction.Instruction_custom(pull_p);
	plx.$FA = new instruction.Instruction_custom(pull_x);
	ply.$7A = new instruction.Instruction_custom(pull_y);
}

init();
