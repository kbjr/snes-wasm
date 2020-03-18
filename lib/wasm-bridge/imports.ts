
import { p } from './types';
import { getString } from './get-string';

export type Imports = Parameters<typeof WebAssembly.instantiate>[1];

export const imports = (memory: WebAssembly.Memory) : Imports => {
	const abort = (message: p, file: p, line: number, col: number) => {
		throw new Error(`${getString(memory.buffer, message)} file=${getString(memory.buffer, file)} line=${line} colm=${col}`);
	};
	
	const trace = (message: p, n) => {
		console.log(`${getString(memory.buffer, message)} n=${n}`);
	};
	
	const env = {
		memory,
		abort,
		trace
	};

	return { env, Date, Math } as any;
};
