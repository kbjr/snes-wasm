
import { isNode } from '../environment';
import { SNESInstance } from './types';
import { imports } from './imports';
import { Interface } from './interface';

let wasmLocation = '../../wasm/snes.wasm';

let wasm: Uint8Array | ArrayBuffer;
let compiled: WebAssembly.Module;

export function setWASMLocation(newLocation: string) {
	wasmLocation = newLocation;
}

export const createSNES = async () : Promise<Interface> => {
	// Allocate our new machine some memory
	const memory = new WebAssembly.Memory({
		initial: 260
	});

	// Load the WASM if needed
	if (! wasm) {
		// If we're running in node, read the wasm file and create our module
		if (isNode) {
			/* eslint-disable @typescript-eslint/no-var-requires */
			const { resolve } = require('path');
			const { readFileSync } = require('fs');
			
			wasm = readFileSync(resolve(__dirname, wasmLocation));
		}

		// Otherwise, use the browser fetch API
		else {
			const res = await fetch(wasmLocation);

			wasm = await res.arrayBuffer();
		}
	}

	if (! compiled) {
		compiled = await WebAssembly.compile(wasm);
	}

	// Create the actual WASM instance
	const instance = await WebAssembly.instantiate(compiled, imports(memory)) as SNESInstance;

	return new Interface(instance);
};
