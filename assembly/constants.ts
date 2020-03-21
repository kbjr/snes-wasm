
/** The various states that the scheduler clock can be in */
export namespace clock_status {
	export type type = u8;

	// @ts-ignore: decorator
	@inline export const stopped: u8 = 0x00;
	// @ts-ignore: decorator
	@inline export const running: u8 = 0x01;
	// @ts-ignore: decorator
	@inline export const paused: u8 = 0x02;
}

/** Simple enum alias for various word sizes used */
export namespace size {
	export type type = u8;

	// @ts-ignore: decorator
	@inline export const byte: u8 = 0x01;
	// @ts-ignore: decorator
	@inline export const word: u8 = 0x02;
	// @ts-ignore: decorator
	@inline export const long: u8 = 0x03;
}

/** Contains all of the interrupts that can be raised */
export namespace interrupt {
	// TODO: What all needs to be in here?
	export type type = u8;

	// @ts-ignore: decorator
	@inline export const none: u8 = 0x00;
	
	// @ts-ignore: decorator
	@inline export const reset: u8 = 0x01;

	// @ts-ignore: decorator
	@inline export const brk: u8 = 0x02;
}

export namespace cpu_freq {
	/** The clock frequency in Hz for PAL (21.28137MHz) */
	// @ts-ignore: decorator
	@inline export const PAL: f64 = 21281370;

	/** The clock frequency in Hz for NTSC (21.47727MHz) */
	// @ts-ignore: decorator
	@inline export const NTSC: f64 = 21477270;
}

/** The clock frequency of the APU in Hz (24.576MHz) */
// @ts-ignore: decorator
@inline export const apu_freq: f64 = 24576000;

/** The maximum amount of clock drift allowed between a thread and the master clock */
// @ts-ignore: decorator
@inline export const thread_sync_threshold: f64 = 0.003;
