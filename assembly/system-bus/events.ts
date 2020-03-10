
import { onRD as joypadOnRD } from '../joypad/bus';
import { onRD as wramOnRD, onWR as wramOnWR } from '../wram/bus';
import { onRD as oamOnRD, onWR as oamOnWR } from '../ppu/oam/bus';

// @ts-ignore: decorator
@inline export function onRD() : void {
	joypadOnRD();
	wramOnRD();
	oamOnRD();
}

// @ts-ignore: decorator
@inline export function onWR() : void {
	wramOnWR();
	oamOnWR();
}

// @ts-ignore: decorator
@inline export function onPARD() : void {
	// 
}

// @ts-ignore: decorator
@inline export function onPAWR() : void {
	// 
}
