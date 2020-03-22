
import { p, alloc } from '../mem';

/** The locations of the various register in memory */
const enum Register {
	A   = 0x00,  // 2
	X   = 0x02,  // 2
	Y   = 0x04,  // 2
	D   = 0x06,  // 2
	S   = 0x08,  // 2
	PC  = 0x0a,  // 2
	DBR = 0x0c,  // 1
	PBR = 0x0d,  // 1
	P   = 0x0f,  // 1
	P2  = 0x10,  // 1
}

class Regsiters {
	public readonly addr: p;

	constructor() {
		this.addr = alloc(0x11);
	}

	/**
	 * A
	 * Accumulator A Register
	 * 
	 * Read: mixed, any time
	 * Write: N/A
	 *
	 * Emulation Mode (E = 1) / 8-Bit Mode (M = 1):
	 *
	 *     f e d c b a 9 8   7 6 5 4 3 2 1 0
	 *     - - - - - - - -   a a a a a a a a
	 *
	 * 16-bit Mode (M = 0):
	 *
	 *     f e d c b a 9 8   7 6 5 4 3 2 1 0
	 *     a a a a a a a a   a a a a a a a a
	 *  
	 *     a = Accumulator A
	 *
	 * The accumulator. This is the math register. It stores one of two operands
	 * or the result of most arithmetic and logical operations.
	 *
	 * Which portion of the 16-bits of the accumulator are available in A depends
	 * on the mode the CPU is running in. This property specifically always references
	 * the low byte.
	 */
	// @ts-ignore: decorator
	@inline public get A() : u8 {
		return load<u8>(this.addr + Register.A);
	}

	// @ts-ignore: decorator
	@inline public set A(byte: u8) {
		store<u8>(this.addr + Register.A, byte);
	}

	/**
	 * B
	 * Accumulator B Register
	 * 
	 * Read: mixed, any time
	 * Write: N/A
	 *
	 *     f e d c b a 9 8   7 6 5 4 3 2 1 0
	 *     b b b b b b b b   - - - - - - - -
	 *  
	 *     b = Accumulator B
	 *
	 * The accumulator. This is the math register. It stores one of two operands
	 * or the result of most arithmetic and logical operations.
	 *
	 * B always refers to the 8 high bits of the accumulator
	 */
	// @ts-ignore: decorator
	@inline public get B() : u8 {
		return load<u8>(this.addr + Register.A + 1);
	}

	// @ts-ignore: decorator
	@inline public set B(byte: u8) {
		store<u8>(this.addr + Register.A + 1, byte);
	}
	
	/**
	 * C
	 * Accumulator C Register
	 * 
	 * Read: mixed, any time
	 * Write: N/A
	 *
	 *     f e d c b a 9 8   7 6 5 4 3 2 1 0
	 *     c c c c c c c c   c c c c c c c c
	 *  
	 *     c = Accumulator C
	 *
	 * The accumulator. This is the math register. It stores one of two operands
	 * or the result of most arithmetic and logical operations.
	 *
	 * C always refers the full 16-bit accumulator
	 */
	// @ts-ignore: decorator
	@inline public get C() : u16 {
		return load<u16>(this.addr + Register.A);
	}

	// @ts-ignore: decorator
	@inline public set C(byte: u16) {
		store<u16>(this.addr + Register.A, byte);
	}

	/**
	 * X
	 * X Index Register
	 * 
	 * Read: mixed, any time
	 * Write: mixed, any time
	 *
	 *     f e d c b a 9 8  7 6 5 4 3 2 1 0
	 *     x x x x x x x x  x x x x x x x x    <-- Native Mode
	 *     - - - - - - - -  x x x x x x x x    <-- Emulation Mode / 8-bit Index Mode
	 *     
	 *     x = X index register data
	 *
	 * Register intended for generic use by the programmer. 8-bits if the X flag is set
	 * in the Processor Status register, or in emulation mode. Otherwise, the register is
	 * 16-bits
	 */
	// @ts-ignore: decorator
	@inline public get X() : u16 {
		return load<u16>(this.addr + Register.X);
	}

	// @ts-ignore: decorator
	@inline public set X(byte: u16) {
		store<u16>(this.addr + Register.X, byte);
	}

	// @ts-ignore: decorator
	@inline public get X_low() : u8 {
		return load<u8>(this.addr + Register.X);
	}

	// @ts-ignore: decorator
	@inline public set X_low(byte: u8) {
		store<u8>(this.addr + Register.X, byte);
	}

	/**
	 * Y
	 * Y Index Register
	 * 
	 * Read: mixed, any time
	 * Write: mixed, any time
	 *
	 *     f e d c b a 9 8  7 6 5 4 3 2 1 0
	 *     y y y y y y y y  y y y y y y y y    <-- Native Mode
	 *     - - - - - - - -  y y y y y y y y    <-- Emulation Mode / 8-bit Index Mode
	 *     
	 *     y = Y index register data
	 *
	 * Register intended for generic use by the programmer. 8-bits if the X flag is set
	 * in the Processor Status register, or in emulation mode. Otherwise, the register is
	 * 16-bits
	 */
	// @ts-ignore: decorator
	@inline public get Y() : u16 {
		return load<u16>(this.addr + Register.Y);
	}

	// @ts-ignore: decorator
	@inline public set Y(byte: u16) {
		store<u16>(this.addr + Register.Y, byte);
	}

	// @ts-ignore: decorator
	@inline public get Y_low() : u8 {
		return load<u8>(this.addr + Register.Y);
	}

	// @ts-ignore: decorator
	@inline public set Y_low(byte: u8) {
		store<u8>(this.addr + Register.Y, byte);
	}

	/**
	 * D
	 * Direct Page Register
	 *
	 * Read: word, any time
	 * Write: N/A
	 *
	 * Direct page register, used for direct page addressing modes. Holds the memory bank
	 * address of the data the CPU is accessing. The Bank byte (bits 16 - 23) are always
	 * 0, because the Direct Page is always located within bank 0.
	 */
	// @ts-ignore: decorator
	@inline public get D() : u16 {
		return load<u16>(this.addr + Register.D);
	}

	// @ts-ignore: decorator
	@inline public set D(byte: u16) {
		store<u16>(this.addr + Register.D, byte);
	}

	/**
	 * S
	 * Stack Pointer Register
	 *
	 * Read: mixed, any time
	 * Write: N/A
	 *
	 * The stack pointer, points to the next available (unused) location on the stack. The Bank
	 * byte (bits 16 - 23) are always 0, because the Stack is always located within bank 0.
	 *
	 * In Emulation mode, the stack pointer is limited to 8-bits, and always points to page 1
	 */
	// @ts-ignore: decorator
	@inline public get S() : u16 {
		return load<u16>(this.addr + Register.S);
	}

	// @ts-ignore: decorator
	@inline public set S(byte: u16) {
		store<u16>(this.addr + Register.S, byte);
	}

	// @ts-ignore: decorator
	@inline public get S_low() : u8 {
		return load<u8>(this.addr + Register.S);
	}

	// @ts-ignore: decorator
	@inline public set S_low(byte: u16) {
		store<u16>(this.addr + Register.S, byte);
	}

	/**
	 * PC
	 * Program Counter Register
	 *
	 * Read: word, any time
	 * Write: N/A
	 *
	 * Holds the memory address of the current CPU instruction
	 */
	// @ts-ignore: decorator
	@inline public get PC() : u16 {
		return load<u16>(this.addr + Register.PC);
	}

	// @ts-ignore: decorator
	@inline public set PC(byte: u16) {
		store<u16>(this.addr + Register.PC, byte);
	}

	/**
	 * DBR
	 * Data Bank Register
	 *
	 * Read: byte, any time
	 * Write: byte, any time
	 *
	 * Holds the default bank for memory transfers.
	 */
	// @ts-ignore: decorator
	@inline public get DBR() : u8 {
		return load<u8>(this.addr + Register.DBR);
	}

	// @ts-ignore: decorator
	@inline public set DBR(byte: u8) {
		store<u8>(this.addr + Register.DBR, byte);
	}

	/**
	 * PBR
	 * Program Bank Register
	 *
	 * Read: byte, any time
	 * Write: byte, any time
	 *
	 * Program Bank, holds the bank address of all instruction fetches. Essentially the
	 * 8 highest bits of the full 24-bit address of the Program Counter (PC). This register
	 * is not affected by relative jumps that overflow the PC; The PBR will maintain the
	 * same value while the PC wraps.
	 */
	// @ts-ignore: decorator
	@inline public get PBR() : u8 {
		return load<u8>(this.addr + Register.PBR);
	}

	// @ts-ignore: decorator
	@inline public set PBR(byte: u8) {
		store<u8>(this.addr + Register.PBR, byte);
	}

	/**
	 * P
	 * Processor Status Register
	 * 
	 * Read: byte, any time
	 * Write: byte, any time
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
	 */
	// @ts-ignore: decorator
	@inline public get P() : u8 {
		return load<u8>(this.addr + Register.P);
	}

	// @ts-ignore: decorator
	@inline public set P(byte: u8) {
		store<u8>(this.addr + Register.P, byte);
	}

	/**
	 * E
	 * Emulation Flag
	 * Register: Processor Status (P2)
	 * Mode: Native/Emulation
	 *
	 *     7 6 5 4 3 2 1 0
	 *     - - - - - - - e
	 *  
	 *     e = Emulation flag (0 = Native Mode, 1 = Emulation Mode)
	 *
	 * Hidden Processor Status flag that controls whether the processor runs
	 * in 6502 emulation mode? (SNES always boots in emulation mode.)
	 */
	// @ts-ignore: decorator
	@inline public get P2() : u8 {
		return load<u8>(this.addr + Register.P2);
	}

	// @ts-ignore: decorator
	@inline public set P2(byte: u8) {
		store<u8>(this.addr + Register.P2, byte);
	}
}

/** The various internal CPU registers */
export const registers = new Regsiters();
