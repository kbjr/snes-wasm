
import { Thread, noop } from './thread';
import { main as cpu } from '../cpu/thread';
import { main as ppu1 } from '../ppu/ppu1/thread';
import { main as ppu2 } from '../ppu/ppu2/thread';
import { main as apu } from '../apu/apu/thread';
import { systemThreads } from './scheduler';
import { cpu_freq, apu_freq } from './frequencies';

/** The current CPU frequency. System must be stopped to change frequency */
let cpuFrequency: f64 = cpu_freq.NTSC;

/** The CPU thread */
export const cpuThread = new Thread(cpuFrequency, cpu, noop);

/** The PPU1 thread */
export const ppu1Thread = new Thread(cpuFrequency, ppu1, noop);

/** The PPU2 thread */
export const ppu2Thread = new Thread(cpuFrequency, ppu2, noop);

/** The APU thread */
export const apuThread = new Thread(apu_freq, apu, noop);

// Add the threads to the scheduler's list of system threads
systemThreads.push(cpuThread);
systemThreads.push(ppu1Thread);
systemThreads.push(ppu2Thread);
systemThreads.push(apuThread);

/**
 * Updates the CPU frequency to a new value. Used to switch between NTSC and PAL.
 * The new value will not be used for anything until the system is stopped and restarted.
 * 
 * @param frequency The new CPU frequency to use
 */
export function setCPUFrequency(frequency: f64) : void {
	cpuFrequency = frequency;
}
