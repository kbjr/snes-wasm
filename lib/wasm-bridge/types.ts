
/** Alias of boolean */
export type bool = boolean;

/** Alias of number; An 8-bit signed int */
export type i8 = number;

/** Alias of number; A 16-bit signed int */
export type i16 = number;

/** Alias of number; A 32-bit signed int */
export type i32 = number;

/** Alias of number; A word-sized (32 or 64-bit) signed int */
export type isize = number;

/** Alias of number; An 8-bit unsigned int */
export type u8 = number;

/** Alias of number; A 16-bit unsigned int */
export type u16 = number;

/** Alias of number; A 32-bit unsigned int */
export type u32 = number;

/** Alias of number; A word-sized (32 or 64-bit) unsigned int */
export type usize = number;

/** Alias of number; A 32-bit binary float */
export type f32 = number;

/** Alias of number; A 64-bit binary float */
export type f64 = number;

/** Alias of i32; This is a pointer into machine memory */
export type p = i32;

/** Function that returns a pointer into machine memory */
export interface GetPointer {
	(): p;
}

/** The exported module for the WASM instance */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SNESInstance extends WebAssembly.Instance {
	exports: {
		'joypad.getPort1': GetPointer;
		'joypad.getPort2': GetPointer;
		'joypad.getPort3': GetPointer;
		'joypad.getPort4': GetPointer;
		'joypad.getRegisters': GetPointer;
		'scheduler.reset': () => void;
		'scheduler.start': () => void;
		'scheduler.stop': () => void;
		'scheduler.pause': () => void;
		'scheduler.unpause': () => void;
		'scheduler.sync': () => void;
		'scheduler.syncClock': () => void;
		'scheduler.now': () => f64;
		'scheduler.cpuCycles': () => f64;
		'wram.getPointer': GetPointer;
	};
}
