
import { size } from './constants';
import { SNES, MachineStatus } from '../../lib';

export class MachineTestUtils {
	protected _mem: Uint8Array;

	constructor(
		public readonly snes: SNES
	) { }

	/** Returns a promise that can be awaited to know when the machine is ready */
	public get ready() : Promise<void> {
		if (this.snes.status === MachineStatus.Ready) {
			return Promise.resolve();
		}

		return this.snes.statusChange;
	}

	/** Returns the internal SNES Interface object */
	public get machine() {
		return this.snes.machine;
	}

	/** Returns the WebAssembly.Instance object */
	public get instance() {
		return this.snes.machine.instance;
	}

	/** Returns the wasm memory buffer */
	protected get buffer() {
		return this.instance.exports.memory.buffer;
	}

	/** Returns a u8 view of a particular slice of wasm memory */
	public u8(offset: number, length: number) {
		return new Uint8Array(this.buffer, offset, length);
	}

	/** Returns a u8 view of wasm memory */
	public get mem() {
		if (this._mem) {
			if (this._mem.buffer === this.buffer) {
				return this._mem;
			}
		}

		this._mem = new Uint8Array(this.buffer);

		return this._mem;
	}

	/** Returns a u8 view of the machine's WRAM */
	public get wram() {
		const p_wram = this.machine.wram.getPointer();

		return this.u8(p_wram, size.wram);
	}
}
