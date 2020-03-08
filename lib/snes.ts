
import { Machine } from './machine';
import { createSNES } from './wasm-bridge';
import { Controller } from './controllers';

export enum MachineStatus {
	Initializing = 0x00,
	Ready = 0x01,
	Running = 0x02,
	Paused = 0x03,
	Crashed = 0xff
}

export class SNES {
	protected machine: Machine;

	protected _statusChange: Promise<void>;

	protected _onStatusChange: () => void;

	protected _status: MachineStatus = MachineStatus.Initializing;

	constructor() {
		this.createStatusChangePromise();
		this.init();
	}
	
	protected async init() {
		this.machine = await createSNES();
			
		const $registers = this.machine.CPU.getRegisters();
		const registers = new Uint8Array(this.machine.memory.buffer, $registers, 0x11);

		// 

		this._status = MachineStatus.Ready;
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




	// Controllers

	public connectController(controller: Controller, port: 1 | 2 | 3 | 4) {
		let addr: u24;

		switch (port) {
			case 1:
				addr = this.machine.Joypad.getPort1();
				break;
			case 2:
				addr = this.machine.Joypad.getPort2();
				break;
			case 3:
				addr = this.machine.Joypad.getPort3();
				break;
			case 4:
				addr = this.machine.Joypad.getPort4();
				break;

			default:
				throw new Error('Controller must be connected to a valid port (1, 2, 3, or 4)');
		}

		const array = new Uint8Array(this.machine.memory.buffer, addr, 2);

		controller.connect(array);
	}
}
