
import { setAddrBusA_bank, setAddrBusA_addr, setDataBus, getDataBus, setRD, setWR } from './index';

// @ts-ignore: decorator
@inline export function read_u8(bank: u8, addr: u16) : u8 {
	setAddrBusA_bank(bank);
	setAddrBusA_addr(addr);

	setRD(true);
	setRD(false);

	return getDataBus();
}

// @ts-ignore: decorator
@inline export function read_u16(bank: u8, addr: u16) : u16 {
	const low = <u16>read_u8(bank, addr);
	const high = <u16>read_u8(bank, addr + 1);

	return low | (high << 8);
}

// @ts-ignore: decorator
@inline export function read_u24(bank: u8, addr: u16) : u24 {
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

	setWR(true);
	setWR(false);
}

// @ts-ignore: decorator
@inline export function write_u16(bank: u8, addr: u16, value: u16) : void {
	write_u8(bank, addr, <u8>(value & 0xff));
	write_u8(bank, addr + 1, <u8>(value >> 8));
}

// @ts-ignore: decorator
@inline export function write_u24(bank: u8, addr: u16, value: u24) : void {
	write_u8(bank, addr, <u8>(value & 0xff));
	write_u8(bank, addr + 1, <u8>((value >> 8) & 0xff));
	write_u8(bank, addr + 2, <u8>((value >> 16) & 0xff));
}
