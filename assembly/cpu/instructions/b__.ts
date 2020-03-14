
import { addr_programCounterRelative } from '../addressing';
import { flags } from '../flags';
import { cpuThread } from '../../scheduler';
import { registers } from '../registers';

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
		const pointer = addr_programCounterRelative();

		if (flags.C) {
			registers.PC += <u16>(pointer & 0xffff);

			// Count 1 extra cycle if branch is taken
			cpuThread.countCycles(1);
		}

		// Count 2 cycles for the instruction
		cpuThread.countCycles(2);

		return false;
	}
}

export namespace bcs {
	export function $B0() : bool {
		// TODO: bcs nearlabel
		return false;
	}
}

export namespace beq {
	export function $F0() : bool {
		// TODO: beq nearlabel
		return false;
	}
}

export namespace bmi {
	export function $30() : bool {
		// TODO: bmi nearlabel
		return false;
	}
}

export namespace bne {
	export function $D0() : bool {
		// TODO: bne nearlabel
		return false;
	}
}

export namespace bpl {
	export function $10() : bool {
		// TODO: bpl nearlabel
		return false;
	}
}

export namespace bra {
	export function $80() : bool {
		// TODO: bra nearlabel
		return false;
	}
}

export namespace brl {
	export function $82() : bool {
		// TODO: brl label
		return false;
	}
}

export namespace bvc {
	export function $50() : bool {
		// TODO: bvc nearlabel
		return false;
	}
}

export namespace bvs {
	export function $70() : bool {
		// TODO: bvs nearlabel
		return false;
	}
}
