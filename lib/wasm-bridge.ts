
import { isNode } from './environment';
import { Machine } from './machine';
import { instantiate } from '@assemblyscript/loader';

let wasmLocation = '../wasm/snes.wasm';

let wasm: Uint8Array | Promise<Response>;

export function setWASMLocation(newLocation: string) {
	wasmLocation = newLocation;
}

export async function createSNES() {
	// Allocate our new machine some memory
	const memory = new WebAssembly.Memory({
		initial: 260
	});

	// Load the WASM if needed
	if (! wasm) {
		// If we're running in node, read the wasm file and create our module
		if (isNode) {
			const { resolve } = require('path');
			const { readFileSync } = require('fs');
			
			wasm = readFileSync(resolve(__dirname, wasmLocation));
		}

		// Otherwise, use the browser fetch API
		else {
			wasm = fetch(wasmLocation);
		}
	}

	return instantiate<Machine>(wasm, {
		env: { memory }
	});
}
