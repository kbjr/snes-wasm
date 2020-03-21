
import { registers } from './registers';

/** The locations of the various Processor Status Register flags */
export namespace flag {
	// P1
	
	// @ts-ignore: decorator
	@inline export const C: u8 = 0x01 << 0;
	
	// @ts-ignore: decorator
	@inline export const Z: u8 = 0x01 << 1;
	
	// @ts-ignore: decorator
	@inline export const I: u8 = 0x01 << 2;
	
	// @ts-ignore: decorator
	@inline export const D: u8 = 0x01 << 3;
	
	// @ts-ignore: decorator
	@inline export const X: u8 = 0x01 << 4;
	
	// @ts-ignore: decorator
	@inline export const B: u8 = 0x01 << 4;
	
	// @ts-ignore: decorator
	@inline export const M: u8 = 0x01 << 5;
	
	// @ts-ignore: decorator
	@inline export const V: u8 = 0x01 << 6;
	
	// @ts-ignore: decorator
	@inline export const N: u8 = 0x01 << 7;

	// P2
	// @ts-ignore: decorator
	@inline export const E: u8 = 0x01 << 0;
}

class Flags {
	/** Carry */
	// @ts-ignore: decorator
	@inline public get C() : u8 {
		return registers.P & <u8>flag.C;
	}

	// @ts-ignore: decorator
	@inline public C_set() : void {
		registers.P |= <u8>flag.C;
	}

	// @ts-ignore: decorator
	@inline public C_clear() : void {
		registers.P &= <u8>flag.C ^ 0xff;
	}

	// @ts-ignore: decorator
	@inline public C_assign(value: bool) : void {
		if (value) {
			registers.P |= <u8>flag.C;
		}
		
		else {
			registers.P &= <u8>flag.C ^ 0xff;
		}
	}

	/** Zero */
	// @ts-ignore: decorator
	@inline public get Z() : u8 {
		return registers.P & <u8>flag.Z;
	}

	// @ts-ignore: decorator
	@inline public Z_set() : void {
		registers.P |= <u8>flag.Z;
	}

	// @ts-ignore: decorator
	@inline public Z_clear() : void {
		registers.P &= <u8>flag.Z ^ 0xff;
	}

	// @ts-ignore: decorator
	@inline public Z_assign(value: bool) : void {
		if (value) {
			registers.P |= <u8>flag.Z;
		}
		
		else {
			registers.P &= <u8>flag.Z ^ 0xff;
		}
	}

	/** IRQ disable */
	// @ts-ignore: decorator
	@inline public get I() : u8 {
		return registers.P & <u8>flag.I;
	}

	// @ts-ignore: decorator
	@inline public I_set() : void {
		registers.P |= <u8>flag.I;
	}

	// @ts-ignore: decorator
	@inline public I_clear() : void {
		registers.P &= <u8>flag.I ^ 0xff;
	}

	// @ts-ignore: decorator
	@inline public I_assign(value: bool) : void {
		if (value) {
			registers.P |= <u8>flag.I;
		}
		
		else {
			registers.P &= <u8>flag.I ^ 0xff;
		}
	}

	/** Decimal mode */
	// @ts-ignore: decorator
	@inline public get D() : u8 {
		return registers.P & <u8>flag.D;
	}

	// @ts-ignore: decorator
	@inline public D_set() : void {
		registers.P |= <u8>flag.D;
	}

	// @ts-ignore: decorator
	@inline public D_clear() : void {
		registers.P &= <u8>flag.D ^ 0xff;
	}

	// @ts-ignore: decorator
	@inline public D_assign(value: bool) : void {
		if (value) {
			registers.P |= <u8>flag.D;
		}
		
		else {
			registers.P &= <u8>flag.D ^ 0xff;
		}
	}

	/** Index register size (1 = 8-bit, 0 = 16-bit) */
	// @ts-ignore: decorator
	@inline public get X() : u8 {
		return registers.P & <u8>flag.X;
	}

	// @ts-ignore: decorator
	@inline public X_set() : void {
		registers.P |= <u8>flag.X;
	}

	// @ts-ignore: decorator
	@inline public X_clear() : void {
		registers.P &= <u8>flag.X ^ 0xff;
	}

	// @ts-ignore: decorator
	@inline public X_assign(value: bool) : void {
		if (value) {
			registers.P |= <u8>flag.X;
		}
		
		else {
			registers.P &= <u8>flag.X ^ 0xff;
		}
	}

	/** Break */
	// @ts-ignore: decorator
	@inline public get B() : u8 {
		return registers.P & <u8>flag.B;
	}

	// @ts-ignore: decorator
	@inline public B_set() : void {
		registers.P |= <u8>flag.B;
	}

	// @ts-ignore: decorator
	@inline public B_clear() : void {
		registers.P &= <u8>flag.B ^ 0xff;
	}

	// @ts-ignore: decorator
	@inline public B_assign(value: bool) : void {
		if (value) {
			registers.P |= <u8>flag.B;
		}
		
		else {
			registers.P &= <u8>flag.B ^ 0xff;
		}
	}

	/** Accumulator/memory size (1 = 8-bit, 0 = 16-bit) */
	// @ts-ignore: decorator
	@inline public get M() : u8 {
		return registers.P & <u8>flag.M;
	}

	// @ts-ignore: decorator
	@inline public M_set() : void {
		registers.P |= <u8>flag.M;
	}

	// @ts-ignore: decorator
	@inline public M_clear() : void {
		registers.P &= <u8>flag.M ^ 0xff;
	}

	// @ts-ignore: decorator
	@inline public M_assign(value: bool) : void {
		if (value) {
			registers.P |= <u8>flag.M;
		}
		
		else {
			registers.P &= <u8>flag.M ^ 0xff;
		}
	}

	/** Overflow */
	// @ts-ignore: decorator
	@inline public get V() : u8 {
		return registers.P & <u8>flag.V;
	}

	// @ts-ignore: decorator
	@inline public V_set() : void {
		registers.P |= <u8>flag.V;
	}

	// @ts-ignore: decorator
	@inline public V_clear() : void {
		registers.P &= <u8>flag.V ^ 0xff;
	}

	// @ts-ignore: decorator
	@inline public V_assign(value: bool) : void {
		if (value) {
			registers.P |= <u8>flag.V;
		}
		
		else {
			registers.P &= <u8>flag.V ^ 0xff;
		}
	}

	/** Negative */
	// @ts-ignore: decorator
	@inline public get N() : u8 {
		return registers.P & <u8>flag.N;
	}

	// @ts-ignore: decorator
	@inline public N_set() : void {
		registers.P |= <u8>flag.N;
	}

	// @ts-ignore: decorator
	@inline public N_clear() : void {
		registers.P &= <u8>flag.N ^ 0xff;
	}

	// @ts-ignore: decorator
	@inline public N_assign(value: bool) : void {
		if (value) {
			registers.P |= <u8>flag.N;
		}
		
		else {
			registers.P &= <u8>flag.N ^ 0xff;
		}
	}

	/** Emulation mode */
	// @ts-ignore: decorator
	@inline public get E() : u8 {
		return registers.P2 & <u8>flag.E;
	}

	// @ts-ignore: decorator
	@inline public E_set() : void {
		registers.P2 |= <u8>flag.E;
	}

	// @ts-ignore: decorator
	@inline public E_clear() : void {
		registers.P2 &= <u8>flag.E ^ 0xff;
	}

	// @ts-ignore: decorator
	@inline public E_assign(value: bool) : void {
		if (value) {
			registers.P2 |= <u8>flag.E;
		}
		
		else {
			registers.P2 &= <u8>flag.E ^ 0xff;
		}
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
