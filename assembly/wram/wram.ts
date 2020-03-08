
import { p, alloc } from '../mem';

export const size: i32 = 0xffff;

/** Pointer to the low WRAM bank (64KB) */
export const lowBank: p = alloc(size);

/** Pointer to the extended WRAM bank (64KB) */
export const extBank: p = alloc(size);
