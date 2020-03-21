
import { Instruction_addr_immediate } from '../../addressing/immediate';
import { Instruction_addr_directPage, Instruction_addr_directPage_indexedY } from '../../addressing/direct-page';
import { Instruction_addr_absolute, Instruction_addr_absolute_indexedY } from '../../addressing/absolute';
import { ldx_, ldy_, ldx_u8, ldx_u16, ldy_u8, ldy_u16 } from './implementation';

export namespace ldx {
	export let $A2: Instruction_addr_immediate;  // ldx #const
	export let $A6: Instruction_addr_directPage;  // ldx dp
	export let $AE: Instruction_addr_absolute;  // ldx addr
	export let $B6: Instruction_addr_directPage_indexedY;  // ldx dp,Y
	export let $BE: Instruction_addr_absolute_indexedY;  // ldx addr,Y
}

export namespace ldy {
	export let $A0: Instruction_addr_immediate;  // ldy #const
	export let $A4: Instruction_addr_directPage;  // ldy dp
	export let $AC: Instruction_addr_absolute;  // ldy addr
	export let $B4: Instruction_addr_directPage_indexedY;  // ldy dp,X
	export let $BC: Instruction_addr_absolute_indexedY;  // ldy addr,X
}

function init() : void {
	ldx.$A2 = new Instruction_addr_immediate(ldx_u8, ldx_u16);
	ldx.$A6 = new Instruction_addr_directPage(ldx_);
	ldx.$AE = new Instruction_addr_absolute(ldx_);
	ldx.$B6 = new Instruction_addr_directPage_indexedY(ldx_);
	ldx.$BE = new Instruction_addr_absolute_indexedY(ldx_);
	ldy.$A0 = new Instruction_addr_immediate(ldy_u8, ldy_u16);
	ldy.$A4 = new Instruction_addr_directPage(ldy_);
	ldy.$AC = new Instruction_addr_absolute(ldy_);
	ldy.$B4 = new Instruction_addr_directPage_indexedY(ldy_);
	ldy.$BC = new Instruction_addr_absolute_indexedY(ldy_);
}

init();
