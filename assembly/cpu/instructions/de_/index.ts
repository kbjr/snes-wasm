
import { instruction } from '../../instruction';
import { dex_, dey_, dec_acc, dec_ } from './implementation';
import { Instruction_addr_directPage, Instruction_addr_directPage_indexedX } from '../../addressing/direct-page';
import { Instruction_addr_absolute, Instruction_addr_absolute_indexedX } from '../../addressing/absolute';

export namespace dec {
	export let $3A: instruction.Instruction_custom;
	export let $C6: Instruction_addr_directPage;
	export let $CE: Instruction_addr_absolute;
	export let $D6: Instruction_addr_directPage_indexedX;
	export let $DE: Instruction_addr_absolute_indexedX;
}

export namespace dex {
	export let $CA: instruction.Instruction_custom;
}

export namespace dey {
	export let $88: instruction.Instruction_custom;
}

function init() : void {
	dec.$3A = new instruction.Instruction_custom(dec_acc);
	dec.$C6 = new Instruction_addr_directPage(dec_);
	dec.$CE = new Instruction_addr_absolute(dec_);
	dec.$D6 = new Instruction_addr_directPage_indexedX(dec_);
	dec.$DE = new Instruction_addr_absolute_indexedX(dec_);
	dex.$CA = new instruction.Instruction_custom(dex_);
	dey.$88 = new instruction.Instruction_custom(dey_);
}

init();
