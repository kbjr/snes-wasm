
import { registers } from './registers';
import { read_u8, write_u8 } from '../system-bus/shortcuts';

export function stack_push(byte: u8) : void {
	write_u8(0x00, registers.S--, byte);
}

export function stack_pull() : u8 {
	return read_u8(0x00, ++registers.S);
}
