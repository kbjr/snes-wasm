
import { flags } from '../../flags';
import {
	Instruction_branch,
	Instruction_branch_conditional,
	Instruction_branch_long
} from './implementation';

export namespace bcc {
	export let $90: Instruction_branch_conditional;
}

export namespace bcs {
	export let $B0: Instruction_branch_conditional;
}

export namespace beq {
	export let $F0: Instruction_branch_conditional;
}

export namespace bmi {
	export let $30: Instruction_branch_conditional;
}

export namespace bne {
	export let $D0: Instruction_branch_conditional;
}

export namespace bpl {
	export let $10: Instruction_branch_conditional;
}

export namespace bra {
	export let $80: Instruction_branch;
}

export namespace brl {
	export let $82: Instruction_branch_long;
}

export namespace bvc {
	export let $50: Instruction_branch_conditional;
}

export namespace bvs {
	export let $70: Instruction_branch_conditional;
}

function init() : void {
	bcc.$90 = new Instruction_branch_conditional(() => ! flags.C);
	bcs.$B0 = new Instruction_branch_conditional(() => <bool>flags.C);
	beq.$F0 = new Instruction_branch_conditional(() => <bool>flags.Z);
	bmi.$30 = new Instruction_branch_conditional(() => <bool>flags.N);
	bne.$D0 = new Instruction_branch_conditional(() => ! flags.Z);
	bpl.$10 = new Instruction_branch_conditional(() => ! flags.N);
	bra.$80 = new Instruction_branch();
	brl.$82 = new Instruction_branch_long();
	bvc.$50 = new Instruction_branch_conditional(() => ! flags.V);
	bvs.$70 = new Instruction_branch_conditional(() => <bool>flags.V);
}

init();



