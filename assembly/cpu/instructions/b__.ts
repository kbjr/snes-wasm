
import { flags } from '../flags';
import { registers } from '../registers';
import { cpuThread } from '../../scheduler';
import { addr_programCounterRelative, addr_programCounterRelativeLong } from '../addressing';

/**
 * #### Branch if Carry Clear Instruction (`bcc`)
 *
 * Takes a branch if the Carry (`C`) Processor Status flag is clear. Otherwise, continues
 * with normal execution of the next instruction.
 * 
 *     | OpCode | Syntax        | Addressing               | Flags     | Bytes | Cycle      |
 *     |--------|---------------|--------------------------|-----------|-------|------------|
 *     | 0x90   | bcc nearlabel | Program Counter Relative | --------- | 2     | 2 [1],[2]  |
 * 
 * [1]: Add 1 extra cycle if branch is taken
 * [2]: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary
 * 
 * TODO: Implement [2]
 */
export namespace bcc {
	export function $90() : bool {
		return branch_if(! flags.C);
	}
}

/**
 * #### Branch if Carry Set Instruction (`bcs`)
 *
 * Takes a branch if the Carry (`C`) Processor Status flag is set. Otherwise, continues
 * with normal execution of the next instruction.
 * 
 *     | OpCode | Syntax        | Addressing               | Flags     | Bytes | Cycle      |
 *     |--------|---------------|--------------------------|-----------|-------|------------|
 *     | 0xB0   | bcs nearlabel | Program Counter Relative | --------- | 2     | 2 [1],[2]  |
 * 
 * [1]: Add 1 extra cycle if branch is taken
 * [2]: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary
 * 
 * TODO: Implement [2]
 */
export namespace bcs {
	export function $B0() : bool {
		return branch_if(flags.C);
	}
}

/**
 * #### Branch if Equal Instruction (`beq`)
 *
 * Takes a branch if the Zero (`Z`) Processor Status flag is set. Otherwise, continues
 * with normal execution of the next instruction.
 * 
 *     | OpCode | Syntax        | Addressing               | Flags     | Bytes | Cycle      |
 *     |--------|---------------|--------------------------|-----------|-------|------------|
 *     | 0xF0   | beq nearlabel | Program Counter Relative | --------- | 2     | 2 [1],[2]  |
 * 
 * [1]: Add 1 extra cycle if branch is taken
 * [2]: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary
 * 
 * TODO: Implement [2]
 */
export namespace beq {
	export function $F0() : bool {
		return branch_if(flags.Z);
	}
}

/**
 * #### Branch if Minus Instruction (`bmi`)
 *
 * Takes a branch if the Negative (`N`) Processor Status flag is set. Otherwise, continues
 * with normal execution of the next instruction.
 * 
 *     | OpCode | Syntax        | Addressing               | Flags     | Bytes | Cycle      |
 *     |--------|---------------|--------------------------|-----------|-------|------------|
 *     | 0x30   | bmi nearlabel | Program Counter Relative | --------- | 2     | 2 [1],[2]  |
 * 
 * [1]: Add 1 extra cycle if branch is taken
 * [2]: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary
 * 
 * TODO: Implement [2]
 */
export namespace bmi {
	export function $30() : bool {
		return branch_if(flags.N);
	}
}

/**
 * #### Branch if Not Equal Instruction (`bne`)
 *
 * Takes a branch if the Zero (`Z`) Processor Status flag is clear. Otherwise, continues
 * with normal execution of the next instruction.
 * 
 *     | OpCode | Syntax        | Addressing               | Flags     | Bytes | Cycle      |
 *     |--------|---------------|--------------------------|-----------|-------|------------|
 *     | 0xD0   | bne nearlabel | Program Counter Relative | --------- | 2     | 2 [1],[2]  |
 * 
 * [1]: Add 1 extra cycle if branch is taken
 * [2]: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary
 * 
 * TODO: Implement [2]
 */
export namespace bne {
	export function $D0() : bool {
		return branch_if(! flags.Z);
	}
}

/**
 * #### Branch if Plus Instruction (`bmi`)
 *
 * Takes a branch if the Negative (`N`) Processor Status flag is clear. Otherwise, continues
 * with normal execution of the next instruction.
 * 
 *     | OpCode | Syntax        | Addressing               | Flags     | Bytes | Cycle      |
 *     |--------|---------------|--------------------------|-----------|-------|------------|
 *     | 0x10   | bpl nearlabel | Program Counter Relative | --------- | 2     | 2 [1],[2]  |
 * 
 * [1]: Add 1 extra cycle if branch is taken
 * [2]: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary
 * 
 * TODO: Implement [2]
 */
export namespace bpl {
	export function $10() : bool {
		return branch_if(! flags.N);
	}
}

/**
 * #### Branch Always Instruction (`bra`)
 *
 * Takes a branch.
 * 
 *     | OpCode | Syntax        | Addressing               | Flags     | Bytes | Cycle      |
 *     |--------|---------------|--------------------------|-----------|-------|------------|
 *     | 0x80   | bra nearlabel | Program Counter Relative | --------- | 2     | 3 [1]      |
 * 
 * [1]: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary
 * 
 * TODO: Implement [1]
 */
export namespace bra {
	export function $80() : bool {
		return branch();
	}
}

/**
 * #### Branch Always Long Instruction (`brl`)
 *
 * Takes a branch with a 2-byte operand.
 * 
 *     | OpCode | Syntax        | Addressing                    | Flags     | Bytes | Cycle      |
 *     |--------|---------------|-------------------------------|-----------|-------|------------|
 *     | 0x82   | bra nearlabel | Program Counter Relative Long | --------- | 3     | 4 [1]      |
 */
export namespace brl {
	export function $82() : bool {
		return branch_long();
	}
}

/**
 * #### Branch if Overflow Clear Instruction (`bvc`)
 *
 * Takes a branch if the Overflow (`V`) Processor Status flag is clear. Otherwise, continues
 * with normal execution of the next instruction.
 * 
 *     | OpCode | Syntax        | Addressing               | Flags     | Bytes | Cycle      |
 *     |--------|---------------|--------------------------|-----------|-------|------------|
 *     | 0x50   | bvc nearlabel | Program Counter Relative | --------- | 2     | 2 [1],[2]  |
 * 
 * [1]: Add 1 extra cycle if branch is taken
 * [2]: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary
 * 
 * TODO: Implement [2]
 */
export namespace bvc {
	export function $50() : bool {
		return branch_if(! flags.V);
	}
}

/**
 * #### Branch if Overflow Set Instruction (`bvc`)
 *
 * Takes a branch if the Overflow (`V`) Processor Status flag is set. Otherwise, continues
 * with normal execution of the next instruction.
 * 
 *     | OpCode | Syntax        | Addressing               | Flags     | Bytes | Cycle      |
 *     |--------|---------------|--------------------------|-----------|-------|------------|
 *     | 0x70   | bvs nearlabel | Program Counter Relative | --------- | 2     | 2 [1],[2]  |
 * 
 * [1]: Add 1 extra cycle if branch is taken
 * [2]: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary
 * 
 * TODO: Implement [2]
 */
export namespace bvs {
	export function $70() : bool {
		return branch_if(flags.V);
	}
}




// ===== Actual Branching Implementation =====

// @ts-ignore: decorator
@inline function branch() : false {
	const pointer = addr_programCounterRelative();

	registers.PC += <u16>(pointer & 0xffff);

	// Count 3 cycles if branch is taken
	cpuThread.countCycles(3);

	return false;
}

// @ts-ignore: decorator
@inline function branch_long() : false {
	const pointer = addr_programCounterRelativeLong();

	registers.PC += <u16>(pointer & 0xffff);

	// Count 4 cycles if branch is taken
	cpuThread.countCycles(4);

	return false;
}

// @ts-ignore: decorator
@inline function no_branch() : false {
	registers.PC++;

	// Only count 2 cycles if the branch is not taken
	cpuThread.countCycles(2);

	return false;
}

// @ts-ignore: decorator
@inline function branch_if(condition: bool) : false {
	if (condition) {
		return branch();
	}

	else {
		return no_branch();
	}
}
