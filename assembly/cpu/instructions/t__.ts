
export namespace tax {
	export function $AA() : bool {
		// TODO: tax
		return false;
	}
}

export namespace tay {
	export function $A8() : bool {
		// TODO: tay
		return false;
	}
}

export namespace tcd {
	export function $5B() : bool {
		// TODO: tcd
		return false;
	}
}

export namespace tcs {
	export function $1B() : bool {
		// TODO: tcs
		return false;
	}
}

export namespace tdc {
	export function $7B() : bool {
		// TODO: tdc
		return false;
	}
}

export namespace trb {
	export function $14() : bool {
		// TODO: trb dp
		return false;
	}

	export function $1C() : bool {
		// TODO: trb addr
		return false;
	}
}

export namespace tsb {
	export function $04() : bool {
		// TODO: tsb dp
		return false;
	}

	export function $0C() : bool {
		// TODO: tsb addr
		return false;
	}
}

export namespace tsc {
	export function $3B() : bool {
		// TODO: tsc
		return false;
	}
}

export namespace tsx {
	export function $BA() : bool {
		// TODO: tsx
		return false;
	}
}

export namespace txa {
	export function $8A() : bool {
		// TODO: txa
		return false;
	}
}

export namespace txs {
	export function $9A() : bool {
		// TODO: txs
		return false;
	}
}

export namespace txy {
	export function $9B() : bool {
		// TODO: txy
		return false;
	}
}

export namespace tya {
	export function $98() : bool {
		// TODO: tya
		return false;
	}
}

/**
 * tyx
 * Transfer Index Register Y to X Instruction
 *
 * Opcode:     0xBB
 * Flags:      n-----z--
 * Addressing: Implied
 * Bytes:      1
 * Cycles:     2
 *
 *   tyx
 *
 * Transfer the value in index register Y to index register X.
 */
export namespace tyx {
	export function $BB() : bool {
		if (this.flag_X) {
			return false;
			this.registers.mem_X[0] = this.registers.mem_Y[0];

			this.registers.assignFlag(FLAG.N, this.registers.mem_X[0] & 0x80);
			this.registers.assignFlag(FLAG.Z, this.registers.mem_X[0] === 0x00);
		}

		else {
			this.registers.X = this.registers.Y;

			this.registers.assignFlag(FLAG.N, this.registers.X & 0x8000);
			this.registers.assignFlag(FLAG.Z, this.registers.X === 0x0000);
		}

		// Count 2 cycles for the instruction
		this.cycles += 2;

		return false;
	}
}
