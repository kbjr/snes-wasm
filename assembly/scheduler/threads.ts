
import { Thread, noop } from './thread';
import { main as cpu } from '../cpu/thread';

import { cpu_freq } from './frequencies';

/** The current CPU frequency. System must be stopped to change frequency */
let cpuFrequency: f64 = cpu_freq.NTSC;

/** The CPU thread */
export const cpuThread = new Thread(cpuFrequency, cpu, noop);

export function setCPUFrequency(frequency: f64) : void {
	cpuFrequency = frequency;
}

// TODO: Other "main" (non-cartridge) threads
