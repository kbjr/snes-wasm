
import { setAddrBusA_bank, setAddrBusA_addr, setDataBus, getDataBus, RD, WR, getAddrBusA, setAddrBusA } from './index';

// @ts-ignore: decorator
@inline export function read_u8(bank: u8, addr: u16) : u8 {
	setAddrBusA_bank(bank);
	setAddrBusA_addr(addr);

	RD.fire();

	return getDataBus();
}

/**
 * Reads a u8 from the given address, but puts the previous address and data
 * values back on the bus when its done to cause no side effects.
 * 
 * @param pointer The full 24-bit address to read from
 */
// @ts-ignore: decorator
@inline export function read_u8_silent(pointer: u32) : u8 {
	const prevAddr = getAddrBusA();
	const prevData = getDataBus();

	setAddrBusA(pointer);

	RD.fire();

	const data = getDataBus();

	setAddrBusA(prevAddr);
	setDataBus(prevData);

	return data;
}

// @ts-ignore: decorator
@inline export function read_u16(bank: u8, addr: u16) : u16 {
	const low = <u16>read_u8(bank, addr);
	const high = <u16>read_u8(bank, addr + 1);

	return low | (high << 8);
}

// @ts-ignore: decorator
@inline export function read_u24(bank: u8, addr: u16) : u32 {
	const low = <u16>read_u8(bank, addr);
	const mid = <u16>read_u8(bank, addr + 1);
	const high = <u16>read_u8(bank, addr + 2);

	return low | (mid << 8) | (high << 16);
}

// @ts-ignore: decorator
@inline export function write_u8(bank: u8, addr: u16, value: u8) : void {
	setAddrBusA_bank(bank);
	setAddrBusA_addr(addr);
	setDataBus(value);

	WR.fire();
}

// @ts-ignore: decorator
@inline export function write_u16(bank: u8, addr: u16, value: u16) : void {
	write_u8(bank, addr, <u8>(value & 0xff));
	write_u8(bank, addr + 1, <u8>(value >> 8));
}

// @ts-ignore: decorator
@inline export function write_u24(bank: u8, addr: u16, value: u32) : void {
	write_u8(bank, addr, <u8>(value & 0xff));
	write_u8(bank, addr + 1, <u8>((value >> 8) & 0xff));
	write_u8(bank, addr + 2, <u8>((value >> 16) & 0xff));
}
