
import { flags } from './flags';
import { registers } from './registers';
import { read_u8, write_u8 } from '../system-bus/shortcuts';

// @ts-ignore: decorator
@inline export function stack_push(byte: u8) : void {
	if (flags.E) {
		write_u8(0x00, <u16>registers.S_low--, byte);
	}

	else {
		write_u8(0x00, registers.S--, byte);
	}
}

// @ts-ignore: decorator
@inline export function stack_pull() : u8 {
	if (flags.E) {
		return read_u8(0x00, <u16>++registers.S_low);
	}

	else {
		return read_u8(0x00, ++registers.S);
	}
}
