
import { stack_push } from '../stack';
import { flags, Flag } from '../flags';
import { registers } from '../registers';
import { u16_low, u16_high } from '../../types/u16';
import { cpuThread, Interrupt, interrupt } from '../../_scheduler';

/**
 * #### Software Break Instruction (`brk`)
 *
 * Forces a software interrupt. This interrupt is unaffected by the Interrupt Disable (`I`) flag.
 * 
 * Although `brk` is a 1 byte instruction, the Program Counter (`PC`) is incremented by 2, allowing
 * for a signature byte to indicate the cause of the interrupt.
 * 
 *     | OpCode | Syntax | Addressing        | Flags                 | Bytes | Cycles |
 *     |--------|--------|-------------------|-----------------------|-------|--------|
 *     | 0x00   | brk    | Stack / Interrupt | ----DI--0 / ---BDI--1 | 2     | 7 [1]  |
 * 
 * [1]: Add 1 extra cycle if Emulation mode (E = 1)
 */
export namespace brk {
	export function $00() : bool {
		if (flags.E) {
			brk_6502();
		}

		else {
			brk_65816();
		}

		return false;
	}

	// @ts-ignore: decorator
	@inline function brk_6502() {
		registers.PC++;

		stack_push(registers.PBR);
		stack_push(u16_high(registers.PC));
		stack_push(u16_low(registers.PC));
		stack_push(registers.P | Flag.B);

		flags.D_clear();
		flags.I_set();

		registers.PBR = 0;

		// Raise the interrupt
		interrupt(Interrupt.BRK);

		// Count 7 cycles for the instruction in Emulation mode
		cpuThread.countCycles(7);
	}

	// @ts-ignore: decorator
	@inline function brk_65816() {
		registers.PC++;

		stack_push(registers.PBR);
		stack_push(u16_high(registers.PC));
		stack_push(u16_low(registers.PC));
		stack_push(registers.P);

		flags.D_clear();
		flags.I_set();

		registers.PBR = 0;

		// Raise the interrupt
		interrupt(Interrupt.BRK);

		// Count 8 cycles for the instruction in Native mode
		cpuThread.countCycles(8);
	}
}
