
import { p, alloc } from './mem';

const enum MachineStatus {
	Initializing = 0x00,
	Ready = 0x01,
	Running = 0x02,
	Paused = 0x03,
	Crashed = 0xff
}

const addr = alloc(8);
