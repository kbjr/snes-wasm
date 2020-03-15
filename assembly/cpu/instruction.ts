
import { Instruction } from '../scheduler';
import { scheduler } from '../system';
import { flags } from './flags';
import { addr_immediate_u8, addr_immediate_u16 } from './addressing';

/** Simple, one-step CPU instruction */
export abstract class SimpleCPUInstruction extends Instruction {
	protected abstract readonly addr: u32;

	protected abstract readonly cycles: u8;

	protected abstract exec() : void;

	public step() : false {
		// Execute the actual instruction
		this.exec();

		// Count the clock cycles
		scheduler!.cpu.countCycles(this.cycles);

		// Always return false, because this is a simple, one-step instruction
		return false;
	}
}

/** Simple, one-step CPU instruction using immediate addressing */
export abstract class ImmediateCPUInstruction extends Instruction {
	protected abstract readonly cycles: u8;

	protected abstract exec_u8(operand: u8) : void;

	protected abstract exec_u16(operand: u16) : void;

	public step() : false {
		// If the CPU is currently running in 8-bit mode
		if (flags.M || flags.E) {
			// Execute the actual instruction
			this.exec_u8(addr_immediate_u8());
		}

		// Otherwise, running in 16-bit mode
		else {
			// Execute the actual instruction
			this.exec_u16(addr_immediate_u16());
		}

		// Count the clock cycles
		scheduler!.cpu.countCycles(this.cycles);

		// Always return false, because this is a simple, one-step instruction
		return false;
	}
}
