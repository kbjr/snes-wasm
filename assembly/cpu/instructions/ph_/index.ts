
import { instruction } from '../../instruction';
import { Instruction_addr_absolute } from '../../addressing/absolute';
import { Instruction_addr_directPage_indirect } from '../../addressing/direct-page';
import { Instruction_addr_programCounterRelative_long } from '../../addressing/program-counter-relative';
import { push_u16_effective, push_acc, push_dbr, push_dp, push_pbr, push_p, push_x, push_y } from './implementation';

export namespace pea {
	export let $F4: Instruction_addr_absolute;
}

export namespace pei {
	export let $D4: Instruction_addr_directPage_indirect;
}

export namespace per {
	export let $62: Instruction_addr_programCounterRelative_long;
}

export namespace pha {
	export let $48: instruction.Instruction_custom;
}

export namespace phb {
	export let $8B: instruction.Instruction_custom;
}

export namespace phd {
	export let $0B: instruction.Instruction_custom;
}

export namespace phk {
	export let $4B: instruction.Instruction_custom;
}

export namespace php {
	export let $08: instruction.Instruction_custom;
}

export namespace phx {
	export let $DA: instruction.Instruction_custom;
}

export namespace phy {
	export let $5A: instruction.Instruction_custom;
}

function init() : void {
	pea.$F4 = new Instruction_addr_absolute(push_u16_effective);
	pei.$D4 = new Instruction_addr_directPage_indirect(push_u16_effective);
	per.$62 = new Instruction_addr_programCounterRelative_long(push_u16_effective);
	pha.$48 = new instruction.Instruction_custom(push_acc);
	phb.$8B = new instruction.Instruction_custom(push_dbr);
	phd.$0B = new instruction.Instruction_custom(push_dp);
	phk.$4B = new instruction.Instruction_custom(push_pbr);
	php.$08 = new instruction.Instruction_custom(push_p);
	phx.$DA = new instruction.Instruction_custom(push_x);
	phy.$5A = new instruction.Instruction_custom(push_y);
}

init();
