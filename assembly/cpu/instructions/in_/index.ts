
import { instruction } from '../../instruction';
import { Instruction_addr_directPage, Instruction_addr_directPage_indexedX } from '../../addressing/direct-page';
import { Instruction_addr_absolute, Instruction_addr_absolute_indexedX } from '../../addressing/absolute';
import { inc_, inc_acc, inx_, iny_ } from './implementation';

export namespace inc {
	export let $1A: instruction.Instruction_custom;
	export let $E6: Instruction_addr_directPage;
	export let $EE: Instruction_addr_absolute;
	export let $F6: Instruction_addr_directPage_indexedX;
	export let $FE: Instruction_addr_absolute_indexedX;
}

export namespace inx {
	export let $E8: instruction.Instruction_custom;
}

export namespace iny {
	export let $C8: instruction.Instruction_custom;
}

function init() : void {
	inc.$1A = new instruction.Instruction_custom(inc_acc);
	inc.$E6 = new Instruction_addr_directPage(inc_);
	inc.$EE = new Instruction_addr_absolute(inc_);
	inc.$F6 = new Instruction_addr_directPage_indexedX(inc_);
	inc.$FE = new Instruction_addr_absolute_indexedX(inc_);
	inx.$E8 = new instruction.Instruction_custom(inx_);
	iny.$C8 = new instruction.Instruction_custom(iny_);
}

init();
