
import { p, alloc } from '../mem';
import { load_u24, store_u24 } from '../types/u24';
import { onRD, onWR, onPARD, onPAWR } from './events';

export { read_u8, read_u16, read_u24, write_u8, write_u16, write_u24 } from './shortcuts';

export const addr: p = alloc(8);

const enum Bus {
	AddrA    = 0x00,
	AddrB    = 0x03,
	Data     = 0x04
}

/** The /RD line on Address Bus A */
let RD: bool = false;

/** The /WR line on Address Bus A */
let WR: bool = false;

/** The /CART line on Address Bus A */
let CART: bool = false;

/** The /WRAM line on Address Bus A */
let WRAM: bool = false;

/** The /PARD line on Address Bus B */
let PARD: bool = false;

/** The /PAWR line on Address Bus B */
let PAWR: bool = false;

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

// @ts-ignore: decorator
@inline export function getRD() : bool {
	return RD;
}

// @ts-ignore: decorator
@inline export function setRD(value: bool) : void {
	RD = value;

	if (value) {
		onRD();
	}
}

// @ts-ignore: decorator
@inline export function getWR() : bool {
	return WR;
}

// @ts-ignore: decorator
@inline export function setWR(value: bool) : void {
	WR = value;

	if (value) {
		onWR();
	}
}

// @ts-ignore: decorator
@inline export function getCART() : bool {
	return CART;
}

// @ts-ignore: decorator
@inline export function setCART(value: bool) : void {
	CART = value;
}

// @ts-ignore: decorator
@inline export function getWRAM() : bool {
	return WRAM;
}

// @ts-ignore: decorator
@inline export function setWRAM(value: bool) : void {
	WRAM = value;
}

// @ts-ignore: decorator
@inline export function getPARD() : bool {
	return PARD;
}

// @ts-ignore: decorator
@inline export function setPARD(value: bool) : void {
	PARD = value;

	if (value) {
		onPARD();
	}
}

// @ts-ignore: decorator
@inline export function getPAWR() : bool {
	return PAWR;
}

// @ts-ignore: decorator
@inline export function setPAWR(value: bool) : void {
	PAWR = value;

	if (value) {
		onPAWR();
	}
}
