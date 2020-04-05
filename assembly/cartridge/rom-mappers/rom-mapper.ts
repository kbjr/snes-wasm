
import { p } from '../../mem';
import { p_rom } from '../rom';
import { bus } from '../../bus';
import { u24 } from '../../u24';

export abstract class RomMapper {
	public abstract RD() : void;

	public abstract WR() : void;

	public abstract PARD() : void;

	public abstract PAWR() : void;

	/** Maps a resolved ROM address to an actual wasm memory pointer */
	protected resolve(bank: bus.bank, addr: bus.addr) : p {
		return p_rom + u24.from_bank_addr(bank, addr);
	}
}
