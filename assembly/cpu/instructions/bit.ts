
import { exec } from '../utils';
import { cpuThread } from '../../scheduler';
import { addr_directPage, addr_absolute, addr_directPageIndexedX, addr_absoluteIndexedX, addr_immediate_u8, addr_immediate_u16 } from '../addressing';
import { flags } from '../flags';

/**
 * #### Test Memory Bits Against Accumulator Instruction (`bit`)
 *
 * .....
 * 
 *     | OpCode | Syntax     | Addressing             | Flags     | Bytes | Cycles     |
 *     |--------|------------|------------------------|-----------|-------|------------|
 *     | 0x24   | bit dp     | Direct Page            | --------- | 2     | 3 [1],[2]  |
 *     | 0x2C   | bit addr   | Absolute               | --------- | 3     | 4 [1]      |
 *     | 0x34   | bit dp,X   | Direct Page Indexed, X | --------- | 2     | 4 [1],[2]  |
 *     | 0x3C   | bit addr,X | Absolute Indexed, X    | --------- | 3     | 4 [1],[4]  |
 *     | 0x89   | bit #const | Immediate              | --------- | 2 [3] | 2 [1]      |
 * 
 * [1]: Add 1 cycle if M = 0
 * [2]: Add 1 cycle if low byte of D is non-zero
 * [3]: Add 1 byte if M = 0
 * [4]: Add 1 cycle if adding index crosses a page boundary
 * 
 * TODO: Implement [4]
 */
export namespace bit {
	/** 0x24 - Direct Page */
	export function $24() : bool {
		return exec(bit, addr_directPage, 3);
	}

	export function $2C() : bool {
		return exec(bit, addr_absolute, 4);
	}

	export function $34() : bool {
		return exec(bit, addr_directPageIndexedX, 4);
	}

	export function $3C() : bool {
		return exec(bit, addr_absoluteIndexedX, 4);
	}

	export function $89() : bool {
		if (flags.E || flags.M) {
			bit_u8(addr_immediate_u8());
		}
		
		else {
			bit_u16(addr_immediate_u16());
		}
		
		cpuThread.countCycles(2);

		return false;
	}





	// ===== Actual Implementation

	function bit(pointer: u32) : void {
		// 
	}

	function bit_u8(operand: u8) : void {
		// 
	}

	function bit_u16(operand: u16) : void {
		// 
	}
}
