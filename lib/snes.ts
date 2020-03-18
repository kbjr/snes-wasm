
import { Controller } from './controllers';
import { createSNES, Interface, p, p_null } from './wasm-bridge';
import { smcHeaderSize } from './constants';

export enum MachineStatus {
	Initializing = 0x00,
	Ready = 0x01,
	Running = 0x02,
	Paused = 0x03,
	Crashed = 0xff
}

export class SNES {
	protected machine: Interface;

	protected _statusChange: Promise<void>;

	protected _onStatusChange: () => void;

	protected _status: MachineStatus = MachineStatus.Initializing;

	public p_rom: p = p_null;

	constructor() {
		this.createStatusChangePromise();
		this.init();
	}
	
	protected async init() {
		this.machine = await createSNES();
			
		// const $registers = this.machine.CPU.getRegisters();
		// const registers = new Uint8Array(this.machine.memory.buffer, $registers, 0x11);

		// 

		this.setStatus(MachineStatus.Ready);
	}

	protected createStatusChangePromise() {
		this._statusChange = new Promise((resolve) => {
			this._onStatusChange = resolve;
		});
	}

	protected setStatus(status: MachineStatus) {
		this._status = status;
		this._onStatusChange();
		this.createStatusChangePromise();
	}

	public get statusChange() {
		return this._statusChange;
	}

	/** The current status of the machine */
	public get status() {
		return this._status;
	}





	// ===== ROM =====

	public loadROM(rom: ArrayBuffer) : void {
		if (this.p_rom !== p_null) {
			throw new Error('Cannot load a ROM while one is still loaded');
		}

		let array: Uint8Array;
		
		// Check if there is an SMC header by calculating the size of extra length
		const headerSize = rom.byteLength % (smcHeaderSize * 2);

		// If the header size is 0, there is no header
		if (headerSize === 0) {
			array = new Uint8Array(rom);
		}

		// If the header size is 512 bytes, we have a valid header
		else if (headerSize === smcHeaderSize) {
			array = new Uint8Array(rom, smcHeaderSize);
		}

		else {
			throw new Error('Invalid ROM; ROM contains an malformed SMC header');
		}

		// Allocate ourselves some memory inside the instance for the ROM
		this.p_rom = this.machine.cartridge.rom.alloc(array.length);

		const mem = new Uint8Array(this.machine.instance.exports.memory.buffer, this.p_rom, array.length);

		// Write the contents of the ROM into the allocated space
		for (let i = 0; i < array.length; i++) {
			mem[i] = array[i];
		}

		// Initialize the new cartridge
		this.machine.cartridge.init();
	}





	// ===== Controllers =====

	// public connectController(controller: Controller, port: 1 | 2 | 3 | 4) {
	// 	let addr: p;

	// 	switch (port) {
	// 		case 1:
	// 			addr = this.machine.Joypad.getPort1();
	// 			break;
	// 		case 2:
	// 			addr = this.machine.Joypad.getPort2();
	// 			break;
	// 		case 3:
	// 			addr = this.machine.Joypad.getPort3();
	// 			break;
	// 		case 4:
	// 			addr = this.machine.Joypad.getPort4();
	// 			break;

	// 		default:
	// 			throw new Error('Controller must be connected to a valid port (1, 2, 3, or 4)');
	// 	}

	// 	const array = new Uint8Array(this.machine.memory.buffer, addr, 2);

	// 	controller.connect(array);
	// }
}
