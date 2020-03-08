
import { p, alloc } from '../mem';

export const addr: p = alloc(8);

/**
 * JOY1L
 * Controller Port 1 Data 1 Register low byte
 *
 * Addr: $4218
 * Read: byte, any time
 * Write: N/A
 *
 *   7 6 5 4 3 2 1 0
 *   a x l r i i i i
 *
 *   a    = A Button status
 *   x    = X Button status
 *   l    = L Button status
 *   r    = R Button status
 *   iiii = Controller type indentifier (0x0 for standard controller)
 */
// @ts-ignore: decorator
@inline export function getJOY1L() : u8 {
	return load<u8>(addr);
}

// @ts-ignore: decorator
@inline export function setJOY1L(value: u8) : void {
	store<u8>(addr, value);
}

/**
 * JOY1H
 * Controller Port 1 Data 1 Register high byte
 *
 * Addr: $4219
 * Read: byte, any time
 * Write: N/A
 *
 *   7 6 5 4 3 2 1 0
 *   b y e t u d l r
 *
 *   b    = B Button status
 *   y    = Y Button status
 *   e    = Select Button status
 *   t    = Start Button status
 *   u    = Up Button status
 *   d    = Down Button status
 *   l    = Left Button status
 *   r    = Right Button status
 */
// @ts-ignore: decorator
@inline export function getJOY1H() : u8 {
	return load<u8>(addr, 1);
}

// @ts-ignore: decorator
@inline export function setJOY1H(value: u8) : void {
	store<u8>(addr, value, 1);
}

/**
 * JOY2L
 * Controller Port 2 Data 1 Register low byte
 *
 * Addr: $421A
 * Read: byte, any time
 * Write: N/A
 *
 *   7 6 5 4 3 2 1 0
 *   a x l r i i i i
 *
 *   a    = A Button status
 *   x    = X Button status
 *   l    = L Button status
 *   r    = R Button status
 *   iiii = Controller type indentifier (0x0 for standard controller)
 */
// @ts-ignore: decorator
@inline export function getJOY2L() : u8 {
	return load<u8>(addr, 2);
}

// @ts-ignore: decorator
@inline export function setJOY2L(value: u8) : void {
	store<u8>(addr, value, 2);
}

/**
 * JOY2H
 * Controller Port 2 Data 1 Register high byte
 *
 * Addr: $421B
 * Read: byte, any time
 * Write: N/A
 *
 *   7 6 5 4 3 2 1 0
 *   b y e t u d l r
 *
 *   b    = B Button status
 *   y    = Y Button status
 *   e    = Select Button status
 *   t    = Start Button status
 *   u    = Up Button status
 *   d    = Down Button status
 *   l    = Left Button status
 *   r    = Right Button status
 */
// @ts-ignore: decorator
@inline export function getJOY2H() : u8 {
	return load<u8>(addr, 3);
}

// @ts-ignore: decorator
@inline export function setJOY2H(value: u8) : void {
	store<u8>(addr, value, 3);
}

/**
 * JOY3L
 * Controller Port 1 Data 2 Register low byte
 *
 * Addr: $421C
 * Read: byte, any time
 * Write: N/A
 *
 *   7 6 5 4 3 2 1 0
 *   a x l r i i i i
 *
 *   a    = A Button status
 *   x    = X Button status
 *   l    = L Button status
 *   r    = R Button status
 *   iiii = Controller type indentifier (0x0 for standard controller)
 */
// @ts-ignore: decorator
@inline export function getJOY3L() : u8 {
	return load<u8>(addr, 4);
}

// @ts-ignore: decorator
@inline export function setJOY3L(value: u8) : void {
	store<u8>(addr, value, 4);
}

/**
 * JOY3H
 * Controller Port 1 Data 2 Register high byte
 *
 * Addr: $421D
 * Read: byte, any time
 * Write: N/A
 *
 *   7 6 5 4 3 2 1 0
 *   b y e t u d l r
 *
 *   b    = B Button status
 *   y    = Y Button status
 *   e    = Select Button status
 *   t    = Start Button status
 *   u    = Up Button status
 *   d    = Down Button status
 *   l    = Left Button status
 *   r    = Right Button status
 */
// @ts-ignore: decorator
@inline export function getJOY3H() : u8 {
	return load<u8>(addr, 5);
}

// @ts-ignore: decorator
@inline export function setJOY3H(value: u8) : void {
	store<u8>(addr, value, 5);
}

/**
 * JOY4L
 * Controller Port 2 Data 2 Register low byte
 *
 * Addr: $421E
 * Read: byte, any time
 * Write: N/A
 *
 *   7 6 5 4 3 2 1 0
 *   a x l r i i i i
 *
 *   a    = A Button status
 *   x    = X Button status
 *   l    = L Button status
 *   r    = R Button status
 *   iiii = Controller type indentifier (0x0 for standard controller)
 */
// @ts-ignore: decorator
@inline export function getJOY4L() : u8 {
	return load<u8>(addr, 6);
}

// @ts-ignore: decorator
@inline export function setJOY4L(value: u8) : void {
	store<u8>(addr, value, 6);
}

/**
 * JOY4H
 * Controller Port 2 Data 2 Register high byte
 *
 * Addr: $421F
 * Read: byte, any time
 * Write: N/A
 *
 *   7 6 5 4 3 2 1 0
 *   b y e t u d l r
 *
 *   b    = B Button status
 *   y    = Y Button status
 *   e    = Select Button status
 *   t    = Start Button status
 *   u    = Up Button status
 *   d    = Down Button status
 *   l    = Left Button status
 *   r    = Right Button status
 */
// @ts-ignore: decorator
@inline export function getJOY4H() : u8 {
	return load<u8>(addr, 7);
}

// @ts-ignore: decorator
@inline export function setJOY4H(value: u8) : void {
	store<u8>(addr, value, 7);
}
