
import { registers } from '../registers';
import { addr_immediate_u8 } from '../addressing';
import { read_u8, write_u8 } from '../../system-bus';
import { cpuThread } from '../../scheduler';

/**
 * mvn
 * Block Move Next Instruction
 *
 * Opcode:     0x54
 * Flags:      ---------
 * Addressing: Block Move
 * Bytes:      3
 * Cycles:     7 * (C + 1)
 *
 *   mvn srcbk,destbk
 *
 * Moves (copies) a block of memory to a new location.
 */
export namespace mvn {
	export function $54() : bool {
		const dest: u8 = addr_immediate_u8();
		const source: u8 = addr_immediate_u8();

		// In this instruction, we don't actually care what step we're on, we just keep
		// doing the same thing over and over until C = $FFFF (Essentially, each call into
		// this instruction is one iteration of a for loop counting down C until overflow)
		if (registers.C === 0xffff) {
			// When mvn is complete, the DBR should be the destination bank
			registers.DBR = dest;

			// Tell the scheduler we're done
			return false;
		}

		// Read one byte from ${srcbk}:${X}, and increment X
		const byte: u8 = read_u8(source, registers.X++);

		// Write the byte we read to ${destbk}:${Y}, and increment Y
		write_u8(dest, registers.Y++, byte);

		// Decrement C
		registers.C--;

		// Count 7 cycles for the byte moved
		cpuThread.countCycles(7);
		
		// Yield back to the scheduler, and get a callback next tick
		return true;
	}
}

/**
 * mvp
 * Block Move Previous Instruction
 *
 * Opcode:     0x44
 * Flags:      ---------
 * Addressing: Block Move
 * Bytes:      3
 * Cycles:     7 * (C + 1)
 *
 *   mvp srcbk,destbk
 *
 * Moves (copies) a block of memory to a new location.
 */
export namespace mvp {
	export function $44() : bool {
		const dest: u8 = addr_immediate_u8();
		const source: u8 = addr_immediate_u8();

		// In this instruction, we don't actually care what step we're on, we just keep
		// doing the same thing over and over until C = $FFFF (Essentially, each call into
		// this instruction is one iteration of a for loop counting down C until overflow)
		if (registers.C === 0xffff) {
			// When mvn is complete, the DBR should be the destination bank
			registers.DBR = dest;

			// Tell the scheduler we're done
			return false;
		}

		// Read one byte from ${srcbk}:${X}, and decrement X
		const byte: u8 = read_u8(source, registers.X--);

		// Write the byte we read to ${destbk}:${Y}, and decrement Y
		write_u8(dest, registers.Y--, byte);

		// Decrement C
		registers.C--;

		// Count 7 cycles for the byte moved
		cpuThread.countCycles(7);
		
		// Yield back to the scheduler, and get a callback next tick
		return true;
	}
}
