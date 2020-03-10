
export namespace status {
	// @ts-ignore: decorator
	@inline export const NoROM: u8 = 0x00;

	// @ts-ignore: decorator
	@inline export const Ready: u8 = 0x01;

	// @ts-ignore: decorator
	@inline export const Running: u8 = 0x02;

	// @ts-ignore: decorator
	@inline export const Paused: u8 = 0x03;
}

let _status: u8 = status.NoROM;

// @ts-ignore: decorator
@inline export function setStatus(status: u8) : void {
	_status = status;
}

// @ts-ignore: decorator
@inline export function getStatus() : u8 {
	return _status;
}
