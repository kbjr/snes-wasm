
import { instruction } from '../../instruction';
import { tax_, tay_, tcd_, tcs_, tdc_ } from './implementation';

export namespace tax {
	export let $AA: instruction.Instruction_custom;
}

export namespace tay {
	export let $A8: instruction.Instruction_custom;
}

export namespace tcd {
	export let $5B: instruction.Instruction_custom;
}

export namespace tcs {
	export let $1B: instruction.Instruction_custom;
}

export namespace tdc {
	export let $7B: instruction.Instruction_custom;
}

export namespace tsc {
	export let $3B: instruction.Instruction_custom;
}

export namespace tsx {
	export let $BA: instruction.Instruction_custom;
}

export namespace txa {
	export let $8A: instruction.Instruction_custom;
}

export namespace txs {
	export let $9A: instruction.Instruction_custom;
}

export namespace txy {
	export let $9B: instruction.Instruction_custom;
}

export namespace tya {
	export let $98: instruction.Instruction_custom;
}

export namespace tyx {
	export let $BB: instruction.Instruction_custom;
}

function init() : void {
	tax.$AA = new instruction.Instruction_custom(tax_);
	tay.$A8 = new instruction.Instruction_custom(tay_);
	tcd.$5B = new instruction.Instruction_custom(tcd_);
	tcs.$1B = new instruction.Instruction_custom(tcs_);
	tdc.$7B = new instruction.Instruction_custom(tdc_);
	tsc.$3B = new instruction.Instruction_custom(tsc_);
	tsx.$BA = new instruction.Instruction_custom(tsx_);
	txa.$8A = new instruction.Instruction_custom(txa_);
	txs.$9A = new instruction.Instruction_custom(txs_);
	txy.$9B = new instruction.Instruction_custom(txy_);
	tya.$98 = new instruction.Instruction_custom(tya_);
	tyx.$BB = new instruction.Instruction_custom(tyx_);
}

init();
