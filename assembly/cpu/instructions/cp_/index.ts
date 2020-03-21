
import { Instruction_addr_immediate } from '../../addressing/immediate';
import { Instruction_addr_absolute } from '../../addressing/absolute';
import { Instruction_addr_directPage } from '../../addressing/direct-page';
import { cpx_, cpx_u8, cpx_u16, cpy_, cpy_u8, cpy_u16 } from './implementation';

export namespace cpx {
	export let $E0: Instruction_addr_immediate;
	export let $E4: Instruction_addr_directPage;
	export let $EC: Instruction_addr_absolute;
}

export namespace cpy {
	export let $C0: Instruction_addr_immediate;
	export let $C4: Instruction_addr_directPage;
	export let $CC: Instruction_addr_absolute;
}

function init() : void {
	cpx.$E0 = new Instruction_addr_immediate(cpx_u8, cpx_u16);
	cpx.$E4 = new Instruction_addr_directPage(cpx_);
	cpx.$EC = new Instruction_addr_absolute(cpx_);
	cpy.$C0 = new Instruction_addr_immediate(cpy_u8, cpy_u16);
	cpy.$C4 = new Instruction_addr_directPage(cpy_);
	cpy.$CC = new Instruction_addr_absolute(cpy_);
}

init();
