
import { p, alloc } from '../mem';
import { load_u24, store_u24 } from '../types/u24';

export { RD, WR, PARD, PAWD } from './events';
export { read_u8, read_u16, read_u24, write_u8, write_u16, write_u24 } from './shortcuts';

export const addr: p = alloc(8);

const enum Bus {
	AddrA    = 0x00,
	AddrB    = 0x03,
	Data     = 0x04
}

// @ts-ignore: decorator
@inline export function getAddrBusA() : u32 {
	return load_u24(addr + Bus.AddrA);
}

// @ts-ignore: decorator
@inline export function setAddrBusA(value: u32) : void {
	store_u24(addr + Bus.AddrA, value);
}

// @ts-ignore: decorator
@inline export function getAddrBusA_addr() : u16 {
	return load<u16>(addr + Bus.AddrA);
}

// @ts-ignore: decorator
@inline export function setAddrBusA_addr(value: u16) : void {
	store<u16>(addr + Bus.AddrA, value);
}

// @ts-ignore: decorator
@inline export function getAddrBusA_bank() : u8 {
	return load<u8>(addr + Bus.AddrA + 2);
}

// @ts-ignore: decorator
@inline export function setAddrBusA_bank(value: u8) : void {
	store<u8>(addr + Bus.AddrA + 2, value);
}

// @ts-ignore: decorator
@inline export function getAddrBusB() : u8 {
	return load<u8>(addr + Bus.AddrB);
}

// @ts-ignore: decorator
@inline export function setAddrBusB(value: u8) : void {
	store<u8>(addr + Bus.AddrB, value);
}

// @ts-ignore: decorator
@inline export function getDataBus() : u8 {
	return load<u8>(addr + Bus.Data);
}

// @ts-ignore: decorator
@inline export function setDataBus(value: u8) : void {
	store<u8>(addr + Bus.Data, value);
}
