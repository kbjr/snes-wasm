
import { bus } from '../../../bus';
import { u24 } from '../../../u24';
import { registers } from '../../registers';

/** The operand byte */
export let operand: u8 = 0;

export function step0() : void {
	bus.read.setup(u24.from_bank_addr(registers.PBR, registers.PC++));
}

export function step1() : void {
	operand = bus.read.fetch();
}
