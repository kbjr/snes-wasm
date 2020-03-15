
import { isNode } from './environment';
import { SNESInstance } from './wasm-types';

let wasmLocation = '../wasm/snes.wasm';

let wasm: Uint8Array | ArrayBuffer;
let compiled: WebAssembly.Module;

export function setWASMLocation(newLocation: string) {
	wasmLocation = newLocation;
}

export async function createSNES() : Promise<SNESInstance> {
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
	return await WebAssembly.instantiate(compiled, {
		env: {
			memory,
			abort,
			trace
		},
		Date,
		Math
	} as any);
}

const abort = (message, file, line, col) => {
	throw Error(`${message} file=${file} line=${line} colm=${col}`);
};

const trace = (message, n) => {
	console.log(`${message} n=${n}`);
};
