
/**
 * sbc
 * Subtract with Borrow Instruction
 *
 * Subtract the data located at the effective address specified by the operand from the
 * contexts of the accumulator; Subtract one more if the carry flag is clear, and store
 * the result in the accumulator.
 */
export namespace sbc {
	/**
	 * sbc
	 * Subtract with Borrow Instruction
	 *
	 * Opcode:     0xE1
	 * Flags:      nv----zc-
	 * Addressing: Direct Page Indexed Indirect,X
	 * Bytes:      2
	 * Cycles:     6 [1],[2]
	 *
	 *   sbc (dp,X)
	 *
	 * Subtract the data located at the effective address specified by the operand from the
	 * contexts of the accumulator; Subtract one more if the carry flag is clear, and store
	 * the result in the accumulator.
	 *
	 * [1]: Add 1 cycle if m=0 (16-bit memory/accumulator)
	 * [2]: Add 1 cycle if low byte of Direct Page Register is non-zero
	 */
	export function $E1() : bool {
		const [ bank, addr ] = this.addr.directPageIndexedIndirectX_map();

		this.sbc$__(bank, addr);

		// Count 6 cycles for the instruction
		this.cycles += 6;

		// If the low byte of the Direct Page Register (D) is non-zero, count one extra cycle
		if (this.registers.D & 0xff) {
			this.cycles++;
		}
	}

	export function $E3() : bool {
		// TODO: sbc sr,S
		return false;
	}

	export function $E5() : bool {
		// TODO: sbc dp
		return false;
	}

	export function $E7() : bool {
		// TODO: sbc [dp]
		return false;
	}

	/**
	 * sbc
	 * Subtract with Borrow Instruction
	 *
	 * Opcode:     0xE9
	 * Flags:      nv----zc-
	 * Addressing: Immediate
	 * Bytes:      2 [2]
	 * Cycles:     2 [1]
	 *
	 *   sbc #const
	 *
	 * Subtract the data located at the effective address specified by the operand from the
	 * contexts of the accumulator; Subtract one more if the carry flag is clear, and store
	 * the result in the accumulator.
	 *
	 * [1]: Add 1 cycle if m=0 (16-bit memory/accumulator)
	 * [2]: Add 1 byte if m=0 (16-bit memory/accumulator)
	 */
	export function $E9() : bool {
		if (this.flag_E || this.flag_M) {
			this.sbc$___ui8(this.addr.immediate_read_ui8());
		}

		else {
			this.sbc$___ui16(this.addr.immediate_read_ui16());
		}

		// Count 2 cycles for the instruction
		this.cycles += 2;
	}

	export function $ED() : bool {
		// TODO: sbc addr
		return false;
	}

	export function $EF() : bool {
		// TODO: sbc long
		return false;
	}

	export function $F1() : bool {
		// TODO: sbc (dp),Y
		return false;
	}

	export function $F2() : bool {
		// TODO: sbc (dp)
		return false;
	}

	export function $F3() : bool {
		// TODO: sbc (sr,S),Y
		return false;
	}

	export function $F5() : bool {
		// TODO: sbc dp,X
		return false;
	}

	export function $F7() : bool {
		// TODO: sbc [dp],Y
		return false;
	}

	export function $F9() : bool {
		// TODO: sbc addr,Y
		return false;
	}

	export function $FD() : bool {
		// TODO: sbc addr,X
		return false;
	}

	export function $FF() : bool {
		// TODO: sbc long,X
		return false;
	}
}
