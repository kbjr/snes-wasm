
import { flags } from './flags';
import { registers } from './registers';
import { onEmulationMode } from './modes';
import { status } from './thread';
import { scheduler } from '../scheduler';

export function interrupt_reset() : void {
	flags.E_set();
	onEmulationMode();
	
	registers.D = 0x0000;
	registers.S = (registers.S & 0x00ff) | 0x0100;
	
	flags.M_set();
	flags.X_set();
	
	if (status.current !== status.normal) {
		status.current = status.normal;
		scheduler.scheduler.cpuThread.idle = false;
	}
}

export function interrupt_brk() : void {
	if (status.current === status.waiting) {
		status.current = status.normal;
		scheduler.scheduler.cpuThread.idle = false;
	}
}

export function interrupt_irq() : void {
	// 
}

export function interrupt_nmi() : void {
	// 
}

export function interrupt_abort() : void {
	// 
}
