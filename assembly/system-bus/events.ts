
import { onRD as joypadOnRD } from '../joypad/bus';
import { onRD as wramOnRD, onWR as wramOnWR } from '../wram/bus';

// @ts-ignore: decorator
@inline export function onRD() : void {
	joypadOnRD();
	wramOnRD();
}

// @ts-ignore: decorator
@inline export function onWR() : void {
	wramOnWR();
}

// @ts-ignore: decorator
@inline export function onPARD() : void {
	// 
}

// @ts-ignore: decorator
@inline export function onPAWR() : void {
	// 
}
