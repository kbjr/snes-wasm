
import { bus } from '../../../bus';
import { u24 } from '../../../u24';
import { u16_util } from '../../../u16';
import { registers } from '../../registers';

/** The first operand byte */
export let $0: u8 = 0;
	
/** The second operand byte */
export let $1: u8 = 0;

/** The full 16-bit operand */
export let operand: u16 = 0;

/** Write the first address to the bus and wait for a response */
export function step0() : void {
	bus.read.setup(u24.from_bank_addr(registers.PBR, registers.PC++));
}

/** Grab the byte we read, and write the next address */
export function step1() : void {
	$0 = bus.read.fetch();
	bus.read.setup(u24.from_bank_addr(registers.PBR, registers.PC++));
}

/** Grab the second byte, and clean up */
export function step2() : void {
	$1 = bus.read.fetch();
	operand = u16_util.from_u8($0, $1);
}
