
/**
 * #### And Accumulator with Memory Instruction (`and`)
 *
 * Perform a bitwise logical AND of the contents at the effective address against the
 * Accumulator. In 8-bit mode (M = 1) or Emulation mode (E = 1), the data from the
 * effective address is 1 byte, and it is OR'ed against the low byte of the Accumulator (A).
 * Otherwise, both the data and Accumulator are 16-bit.
 * 
 *     | OpCode | Syntax       | Addressing                  | Flags     | Bytes | Cycle      |
 *     |--------|--------------|-----------------------------|-----------|-------|------------|
 *     | 0x21   | and (dp,X)   | DP Indexed Indirect, X      | N-----Z-- | 2     | 6 [2],[3]  |
 *     | 0x23   | and sr,S     | Stack Relative              | N-----Z-- | 2     | 4 [2]      |
 *     | 0x25   | and dp       | Direct Page                 | N-----Z-- | 2     | 3 [2],[3]  |
 *     | 0x27   | and [dp]     | DP Indirect Long            | N-----Z-- | 2     | 6 [2],[3]  |
 *     | 0x29   | and #const   | Immediate                   | N-----Z-- | 2[1]  | 2 [2]      |
 *     | 0x2D   | and addr     | Absolute                    | N-----Z-- | 3     | 4 [2]      |
 *     | 0x2F   | and long     | Absolute Long               | N-----Z-- | 4     | 5 [2]      |
 *     | 0x31   | and (dp),Y   | DP Indirect Indexed, Y      | N-----Z-- | 2     | 5 [2],[3]  |
 *     | 0x32   | and (dp)     | DP Indirect                 | N-----Z-- | 2     | 5 [2],[3]  |
 *     | 0x33   | and (sr,S),Y | SR Indirect Indexed, Y      | N-----Z-- | 2     | 7 [2]      |
 *     | 0x35   | and dp,X     | DP Indexed, X               | N-----Z-- | 2     | 4 [2],[3]  |
 *     | 0x37   | and [dp],Y   | DP Indirect Long Indexed, Y | N-----Z-- | 2     | 6 [2],[3]  |
 *     | 0x39   | and addr,Y   | Absolute Indexed,Y          | N-----Z-- | 3     | 4 [2],[4]  |
 *     | 0x3D   | and addr,X   | Absolute Indexed, X         | N-----Z-- | 3     | 4 [2],[4]  |
 *     | 0x3F   | and long,X   | Absolute Long Indexed, X    | N-----Z-- | 4     | 5 [2]      |
 *
 * [1]: Add 1 byte if m = 0 (16-bit memory/accumulator)
 * [2]: Add 1 cycle if m = 0 (16-bit memory/accumulator)
 * [3]: Add 1 cycle if low byte of Direct Page register is not zero
 * [4]: Add 1 cycle if adding index crosses a page boundary
 * 
 * FIXME: Implement [4]
 * FIXME: Where do we count all the cpu cycles?
 */

import { and, and_u8, and_u16 } from './implementation';
import { Instruction_addr_immediate } from '../../addressing/immediate';
import { Instruction_addr_stackRelative, Instruction_addr_stackRelative_indirect_indexedY } from '../../addressing/stack-relative';
import {
	Instruction_addr_absolute,
	Instruction_addr_absolute_indexedX,
	Instruction_addr_absolute_indexedY,
	Instruction_addr_absolute_long,
	Instruction_addr_absolute_long_indexedX
} from '../../addressing/absolute';
import {
	Instruction_addr_directPage,
	Instruction_addr_directPage_indexedX,
	Instruction_addr_directPage_indexedX_indirect,
	Instruction_addr_directPage_indirect,
	Instruction_addr_directPage_indirect_indexedY,
	Instruction_addr_directPage_indirect_long,
	Instruction_addr_directPage_indirect_long_indexedY
} from '../../addressing/direct-page';

export let $21: Instruction_addr_directPage_indexedX_indirect;
export let $23: Instruction_addr_stackRelative;
export let $25: Instruction_addr_directPage;
export let $27: Instruction_addr_directPage_indirect_long;
export let $29: Instruction_addr_immediate;
export let $2D: Instruction_addr_absolute;
export let $2F: Instruction_addr_absolute_long;
export let $31: Instruction_addr_directPage_indirect_indexedY;
export let $32: Instruction_addr_directPage_indirect;
export let $33: Instruction_addr_stackRelative_indirect_indexedY;
export let $35: Instruction_addr_directPage_indexedX;
export let $37: Instruction_addr_directPage_indirect_long_indexedY;
export let $39: Instruction_addr_absolute_indexedY;
export let $3D: Instruction_addr_absolute_indexedX;
export let $3F: Instruction_addr_absolute_long_indexedX;

function init() : void {
	$21 = new Instruction_addr_directPage_indexedX_indirect(and);
	$23 = new Instruction_addr_stackRelative(and);
	$25 = new Instruction_addr_directPage(and);
	$27 = new Instruction_addr_directPage_indirect_long(and);
	$29 = new Instruction_addr_immediate(and_u8, and_u16);
	$2D = new Instruction_addr_absolute(and);
	$2F = new Instruction_addr_absolute_long(and);
	$31 = new Instruction_addr_directPage_indirect_indexedY(and);
	$32 = new Instruction_addr_directPage_indirect(and);
	$33 = new Instruction_addr_stackRelative_indirect_indexedY(and);
	$35 = new Instruction_addr_directPage_indexedX(and);
	$37 = new Instruction_addr_directPage_indirect_long_indexedY(and);
	$39 = new Instruction_addr_absolute_indexedY(and);
	$3D = new Instruction_addr_absolute_indexedX(and);
	$3F = new Instruction_addr_absolute_long_indexedX(and);
}

init();
