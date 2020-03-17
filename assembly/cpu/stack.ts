
import { bus } from '../bus';
import { flags } from './flags';
import { registers } from './registers';

export namespace stack {
	export namespace push {
		// @ts-ignore: decorator
		@inline export function step0(byte: u8) : void {
			if (flags.E) {
				bus.write.setup(<u32>(registers.S_low--), byte);
			}

			else {
				bus.write.setup(<u32>(registers.S--), byte);
			}
		}
		
		// @ts-ignore: decorator
		@inline export function step1() : void {
			bus.write.exec();
		}
	}
	
	export namespace pull {
		// @ts-ignore: decorator
		@inline export function step0() : void {
			if (flags.E) {
				bus.read.setup(<u32>(++registers.S_low));
			}
			
			else {
				bus.read.setup(<u32>(++registers.S));
			}
		}
		
		// @ts-ignore: decorator
		@inline export function step1() : u8 {
			return bus.read.fetch();
		}
	}
}
