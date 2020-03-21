
const { resolve } = require('path');
const { readFileSync } = require('fs');
const { SNES } = require('./build/lib');

const snes = new SNES();
const ready = snes.statusChange;

exports.load = async (file) => {
	const romFile = resolve(process.cwd(), file);
	const romBuffer = readFileSync(romFile);
	
	await ready;
	
	snes.loadROM(romBuffer.buffer);
};

global.snes = snes;

(async () => {
	await ready;

	global.u8 = new Uint8Array(snes.machine.instance.exports.memory.buffer);
})();
