
/** Contains all of the interrupts that can be raised */
// TODO: What all needs to be in here?
export namespace Interrupt {
	export type Interrupt = u8 & (0x00 | 0x01);

	// @ts-ignore: decorator
	@inline export const NONE: u8 = 0x00;
	
	// @ts-ignore: decorator
	@inline export const RESET: u8 = 0x01;
}
