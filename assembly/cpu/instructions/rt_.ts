
/**
 * rti
 * Return from Interupt Instruction
 *
 * Opcode:     0x40
 * Flags:      nvmxdizc-
 * Addressing: Stack (RTI)
 * Bytes:      1
 * Cycles:     6 [1]
 *
 *   rti
 *
 * Pulls the status register and program counter from the stack. In native mode (E = 0), also pull
 * the program bank register from the stack.
 *
 * [1]: Add 1 cycle if Native mode (E = 0)
 * 
 * TODO: Is this correct? The docs seem contradictary about the order of the bytes
 */
export namespace rti {
	export function $40() : bool {
		// The first two bytes pulled are the PC low/high bytes
		const addrLow = this.stackPull();
		const addrHigh = this.stackPull();

		this.registers.PC = ui8_to_ui16(addrLow, addrHigh);

		// In emulation mode, we do not pull a bank, so the status flags are next
		if (this.flag_E) {
			this.registers.P = this.stackPull();
		}

		// In native mode, the bank is stored next, before the status flags
		else {
			this.registers.PBR = this.stackPull();
			this.registers.P = this.stackPull();

			// Count 1 extra cycle for native mode
			this.cycles++;
		}

		// Count 6 cycles for the instruction
		this.cycles += 6;
	}
}

/**
 * rtl
 * Return from Subroutine Long Instruction
 *
 * Opcode:     0x6B
 * Flags:      ---------
 * Addressing: Stack (RTL)
 * Bytes:      1
 * Cycles:     6
 *
 *   rtl
 *
 * Pulls the Program Counter register (incrementing by one before loading) from the stack. Then pulls
 * the Program Bank register from the stack.
 */
export namespace rtl {
	export function $6B() : bool {
		const addrLow = this.stackPull();
		const addrHigh = this.stackPull();

		this.registers.PC = ui8_to_ui16(addrLow, addrHigh) + 1;
		this.registers.PBR = this.stackPull();

		// Count 6 cycles for the instruction
		this.cycles += 6;
	}
}

/**
 * rts
 * Return from Subroutine Instruction
 *
 * Opcode:     0x60
 * Flags:      ---------
 * Addressing: Stack (RTS)
 * Bytes:      1
 * Cycles:     6
 *
 *   rts
 *
 * Pulls the Program Counter register (incrementing by one before loading) from the stack.
 */
export namespace rts {
	export function $60() : bool {
		const addrLow = this.stackPull();
		const addrHigh = this.stackPull();

		this.registers.PC = ui8_to_ui16(addrLow, addrHigh) + 1;

		// Count 6 cycles for the instruction
		this.cycles += 6;
	}
}
