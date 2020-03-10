
/** Contains all of the interrupts that can be raised */
// TODO: What all needs to be in here?
export namespace Interrupt {
	// @ts-ignore: decorator
	@inline export const NONE: u8 = 0x00;
	
	// @ts-ignore: decorator
	@inline export const RESET: u8 = 0x01;
}
