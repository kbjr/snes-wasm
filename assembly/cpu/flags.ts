
import { registers } from './registers';

/** The locations of the various Processor Status Register flags */
const enum Flag {
	// P1
	C = 0x01 << 0,
	Z = 0x01 << 1,
	I = 0x01 << 2,
	D = 0x01 << 3,
	X = 0x01 << 4,
	B = 0x01 << 4,
	M = 0x01 << 5,
	V = 0x01 << 6,
	N = 0x01 << 7,

	// P2
	E = 0x01 << 0
}

class Flags {
	/** Carry */
	// @ts-ignore: decorator
	@inline public get C() : u8 {
		return registers.P & Flag.C;
	}

	// @ts-ignore: decorator
	@inline public C_set() : void {
		registers.P |= Flag.C;
	}

	// @ts-ignore: decorator
	@inline public C_clear() : void {
		registers.P &= Flag.C ^ 0xff;
	}

	/** Zero */
	// @ts-ignore: decorator
	@inline public get Z() : u8 {
		return registers.P & Flag.Z;
	}

	// @ts-ignore: decorator
	@inline public Z_set() : void {
		registers.P |= Flag.Z;
	}

	// @ts-ignore: decorator
	@inline public Z_clear() : void {
		registers.P &= Flag.Z ^ 0xff;
	}

	/** IRQ disable */
	// @ts-ignore: decorator
	@inline public get I() : u8 {
		return registers.P & Flag.I;
	}

	// @ts-ignore: decorator
	@inline public I_set() : void {
		registers.P |= Flag.I;
	}

	// @ts-ignore: decorator
	@inline public I_clear() : void {
		registers.P &= Flag.I ^ 0xff;
	}

	/** Decimal mode */
	// @ts-ignore: decorator
	@inline public get D() : u8 {
		return registers.P & Flag.D;
	}

	// @ts-ignore: decorator
	@inline public D_set() : void {
		registers.P |= Flag.D;
	}

	// @ts-ignore: decorator
	@inline public D_clear() : void {
		registers.P &= Flag.D ^ 0xff;
	}

	/** Index register size (1 = 8-bit, 0 = 16-bit) */
	// @ts-ignore: decorator
	@inline public get X() : u8 {
		return registers.P & Flag.X;
	}

	// @ts-ignore: decorator
	@inline public X_set() : void {
		registers.P |= Flag.X;
	}

	// @ts-ignore: decorator
	@inline public X_clear() : void {
		registers.P &= Flag.X ^ 0xff;
	}

	/** Break */
	// @ts-ignore: decorator
	@inline public get B() : u8 {
		return registers.P & Flag.B;
	}

	// @ts-ignore: decorator
	@inline public B_set() : void {
		registers.P |= Flag.B;
	}

	// @ts-ignore: decorator
	@inline public B_clear() : void {
		registers.P &= Flag.B ^ 0xff;
	}

	/** Accumulator/memory size (1 = 8-bit, 0 = 16-bit) */
	// @ts-ignore: decorator
	@inline public get M() : u8 {
		return registers.P & Flag.M;
	}

	// @ts-ignore: decorator
	@inline public M_set() : void {
		registers.P |= Flag.M;
	}

	// @ts-ignore: decorator
	@inline public M_clear() : void {
		registers.P &= Flag.M ^ 0xff;
	}

	/** Overflow */
	// @ts-ignore: decorator
	@inline public get V() : u8 {
		return registers.P & Flag.V;
	}

	// @ts-ignore: decorator
	@inline public V_set() : void {
		registers.P |= Flag.V;
	}

	// @ts-ignore: decorator
	@inline public V_clear() : void {
		registers.P &= Flag.V ^ 0xff;
	}

	/** Negative */
	// @ts-ignore: decorator
	@inline public get N() : u8 {
		return registers.P & Flag.N;
	}

	// @ts-ignore: decorator
	@inline public N_set() : void {
		registers.P |= Flag.N;
	}

	// @ts-ignore: decorator
	@inline public N_clear() : void {
		registers.P &= Flag.N ^ 0xff;
	}

	/** Emulation mode */
	// @ts-ignore: decorator
	@inline public get E() : u8 {
		return registers.P2 & Flag.E;
	}

	// @ts-ignore: decorator
	@inline public E_set() : void {
		registers.P2 |= Flag.E;
	}

	// @ts-ignore: decorator
	@inline public E_clear() : void {
		registers.P2 &= Flag.E ^ 0xff;
	}
}

/** 
 * The Processor Status flags
 *
 *     7 6 5 4 3 2 1 0
 *     n v m x d i z c    <-- Native Mode
 *     n v - b d i z c    <-- Emulation Mode
 *   
 *     n = Negative                   native/emulation  1 = Negative
 *     v = Overflow                   native/emulation  1 = Overflow
 *     m = Accumulator register size  native            1 = 8-bit           0 = 16-bit
 *     x = Index register size        native            1 = 8-bit           0 = 16-bit
 *     b = Break                             emulation  1 = BRK caused IRQ
 *     d = Decimal mode               native/emulation  1 = Decimal mode    0 = Binary mode
 *     i = IRQ disable                native/emulation  1 = Disabled
 *     z = Zero                       native/emulation  1 = Result Zero
 *     c = Carry                      native/emulation  1 = Carry
 *
 * Contains a number of processor status flags containing information about the current
 * state of the processor. Some of the stored flags are different depending on whether or
 * not the Emulation (E) flag is enabled.
 * 
 * Additionally, the hidden Emulation flag is also exposed here.
 */
export const flags = new Flags();
