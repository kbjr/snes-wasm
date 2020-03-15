
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
