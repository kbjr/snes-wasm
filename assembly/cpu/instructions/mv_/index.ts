
import { mvn_, mvp_ } from './implementation';
import { Instruction_addr_blockMove } from '../../addressing/block-move';

export namespace mvn {
	export let $54: Instruction_addr_blockMove;
}

export namespace mvp {
	export let $44: Instruction_addr_blockMove;
}

function init() : void {
	mvn.$54 = new Instruction_addr_blockMove(mvn_);
	mvp.$44 = new Instruction_addr_blockMove(mvp_);
}

init();
