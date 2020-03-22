
import { stx_, sty_, stz_ } from './implementation';
import { Instruction_addr_absolute, Instruction_addr_absolute_indexedX } from '../../addressing/absolute';
import { Instruction_addr_directPage, Instruction_addr_directPage_indexedY, Instruction_addr_directPage_indexedX } from '../../addressing/direct-page';

export namespace stx {
	export let $86: Instruction_addr_directPage;
	export let $8E: Instruction_addr_absolute;
	export let $96: Instruction_addr_directPage_indexedY;
}

export namespace sty {
	export let $84: Instruction_addr_directPage;
	export let $8C: Instruction_addr_absolute;
	export let $94: Instruction_addr_directPage_indexedX;
}

export namespace stz {
	export let $64: Instruction_addr_directPage;
	export let $74: Instruction_addr_directPage_indexedX;
	export let $9C: Instruction_addr_absolute;
	export let $9E: Instruction_addr_absolute_indexedX;
}

function init() : void {
	stx.$86 = new Instruction_addr_directPage(stx_);
	stx.$8E = new Instruction_addr_absolute(stx_);
	stx.$96 = new Instruction_addr_directPage_indexedY(stx_);
	sty.$84 = new Instruction_addr_directPage(sty_);
	sty.$8C = new Instruction_addr_absolute(sty_);
	sty.$94 = new Instruction_addr_directPage_indexedX(sty_);
	stz.$64 = new Instruction_addr_directPage(stz_);
	stz.$74 = new Instruction_addr_directPage_indexedX(stz_);
	stz.$9C = new Instruction_addr_absolute(stz_);
	stz.$9E = new Instruction_addr_absolute_indexedX(stz_);
}

init();
