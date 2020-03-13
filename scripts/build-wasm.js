
const { exec } = require('./utils/exec');

const flags = process.argv.slice(2);

// Allocate ourselves a 24-bit address space (16MB)
const BASE_MEMORY = 2 ** 24;

const args = [
	'assembly/index.ts',
	'-b', 'build/wasm/snes.wasm',
	'-t', 'build/wasm/snes.wat',
	'--validate',
	'--sourceMap',
	'--importMemory',
	'--memoryBase', BASE_MEMORY
];

let debug = false;
let optimize = false;

flags.forEach((flag) => {
	switch (flag) {
		case '-d':
		case '--debug':
			debug = true;
			break;
		
		case '-o0':
			optimize = false;
			break;
		
		case '-o1':
			optimize = true;
			break;
	}
});

if (debug) {
	args.push('--debug');
}

if (optimize) {
	args.push('--optimize');
}

exec('asc', args, {
	// 
});
