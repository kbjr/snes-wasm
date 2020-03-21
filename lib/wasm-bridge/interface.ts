
import { SNESInstance, p } from './types';

export class Interface {
	constructor(
		public readonly instance: SNESInstance
	) { }

	public readonly joypad = {
		getPort1: () => {
			return this.instance.exports['joypad.getPort1']();
		},

		getPort2: () => {
			return this.instance.exports['joypad.getPort2']();
		},

		getPort3: () => {
			return this.instance.exports['joypad.getPort3']();
		},

		getPort4: () => {
			return this.instance.exports['joypad.getPort4']();
		},

		getRegisters: () => {
			return this.instance.exports['joypad.getPort4']();
		}
	};

	public readonly scheduler = {
		reset: () => {
			this.instance.exports['scheduler.reset']();
		},
		
		start: () => {
			this.instance.exports['scheduler.start']();
		},
		
		stop: () => {
			this.instance.exports['scheduler.stop']();
		},
		
		pause: () => {
			this.instance.exports['scheduler.pause']();
		},
		
		unpause: () => {
			this.instance.exports['scheduler.unpause']();
		},
		
		sync: () => {
			this.instance.exports['scheduler.sync']();
		},
		
		syncClock: () => {
			this.instance.exports['scheduler.syncClock']();
		},
		
		now: () => {
			return this.instance.exports['scheduler.now']();
		},
		
		cpuCycles: () => {
			return this.instance.exports['scheduler.cpuCycles']();
		},
	};

	public readonly wram = {
		getPointer: () => {
			return this.instance.exports['wram.getPointer']();
		}
	};

	public readonly cartridge = {
		rom: {
			loaded: () => {
				return this.instance.exports['cartridge.rom.loaded']();
			},

			alloc: (size: number) : p => {
				return this.instance.exports['cartridge.rom.alloc'](size);
			}
		},

		init: () => {
			this.instance.exports['cartridge.init']();
		},

		reset: () => {
			this.instance.exports['cartridge.reset']();
		}
	};
}
