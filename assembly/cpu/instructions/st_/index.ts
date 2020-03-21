
import { instruction } from '../../instruction';

export namespace stx {
	export let $86: void;  // stx dp
	export let $8E: void;  // stx addr
	export let $96: void;  // stx dp,Y
}

export namespace sty {
	export let $84: void;  // sty dp
	export let $8C: void;  // sty addr
	export let $94: void;  // sty dp,X
}

export namespace stz {
	export let $64: void;  // stz dp
	export let $74: void;  // stz dp,X
	export let $9C: void;  // stz addr
	export let $9E: void;  // stz addr,X
}

function init() : void {
	stx.$86 = null;
	stx.$8E = null;
	stx.$96 = null;
	sty.$84 = null;
	sty.$8C = null;
	sty.$94 = null;
	stz.$64 = null;
	stz.$74 = null;
	stz.$9C = null;
	stz.$9E = null;
}

init();
