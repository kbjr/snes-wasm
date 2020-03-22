
import { trb_, tsb_ } from './implementation';
import { Instruction_addr_absolute } from '../../addressing/absolute';
import { Instruction_addr_directPage } from '../../addressing/direct-page';

export namespace trb {
	export let $14: Instruction_addr_directPage;

	export let $1C: Instruction_addr_absolute;
}

export namespace tsb {
	export let $04: Instruction_addr_directPage;

	export let $0C: Instruction_addr_absolute;
}

function init() : void {
	trb.$14 = new Instruction_addr_directPage(trb_);
	trb.$1C = new Instruction_addr_absolute(trb_);
	tsb.$04 = new Instruction_addr_directPage(tsb_);
	tsb.$0C = new Instruction_addr_absolute(tsb_);
}
