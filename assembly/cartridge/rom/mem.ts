
import { p, alloc_cart } from '../../mem';

export class ROM {
	public readonly addr: p;

	constructor(public readonly size: u32) {
		this.addr = alloc_cart(size);
	}

	public destroy() {
		// TODO: Destroy ROM
	}

	@inline public read_u8(index: u32) : u8 {
		return load<u8>(this.addr + index);
	}

	@inline public read_u16(index: u32) : u16 {
		return load<u16>(this.addr + index);
	}
}
