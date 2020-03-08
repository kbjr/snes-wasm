
const { resolve } = require('path');
const { spawn } = require('child_process');

exports.exec = (command, args, opts) => {
	return new Promise((resolve) => {
		const proc = spawn(command, args, opts);
		
		proc.stdout.pipe(process.stdout);
		proc.stderr.pipe(process.stderr);
		proc.on('exit', resolve);
	});
};