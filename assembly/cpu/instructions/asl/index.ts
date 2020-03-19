
/**
 * #### Shift Memory or Accumulator Left Instruction (`asl`)
 *
 * Shift the memory or accumulator reference by the operand left 1 bit. In 8-bit mode (M = 1)
 * or Emulation mode (E = 1), the data shifted is 1 byte. Otherwise, the data is 16-bit.
 * 
 *     | OpCode | Syntax     | Addressing                  | Flags     | Bytes | Cycle      |
 *     |--------|------------|-----------------------------|-----------|-------|------------|
 *     | 0x06   | asl dp     | Direct Page                 | N-----ZC- | 2     | 5 [1],[2]  |
 *     | 0x0A   | asl A      | Accumulator                 | N-----ZC- | 1     | 2 [1]      |
 *     | 0x0E   | asl addr   | Absolute                    | N-----ZC- | 3     | 6 [1]      |
 *     | 0x16   | asl dp,X   | DP Indexed, X               | N-----ZC- | 2     | 6 [1],[2]  |
 *     | 0x1E   | asl addr,X | Absolute Indexed, X         | N-----ZC- | 3     | 4 [1]      |
 *
 * [1]: Add 2 cycle if m = 0 (16-bit memory/accumulator)
 * [2]: Add 1 cycle if low byte of Direct Page register is not zero
 */

import { asl, asl_acc } from './implementation';
import { instruction } from '../../instruction';
import { Instruction_addr_absolute, Instruction_addr_absolute_indexedX } from '../../addressing/absolute';
import { Instruction_addr_directPage, Instruction_addr_directPage_indexedX } from '../../addressing/direct-page';

export let $06: Instruction_addr_directPage;
export let $0A: instruction.Instruction_custom;
export let $0E: Instruction_addr_absolute;
export let $16: Instruction_addr_directPage_indexedX;
export let $1E: Instruction_addr_absolute_indexedX;

function init() : void {
	$06 = new Instruction_addr_directPage(asl);
	$0A = new instruction.Instruction_custom(asl_acc);
	$0E = new Instruction_addr_absolute(asl);
	$16 = new Instruction_addr_directPage_indexedX(asl);
	$1E = new Instruction_addr_absolute_indexedX(asl);
}

init();
