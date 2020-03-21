
const { SNES } = require('./build/lib');

const snes = new SNES();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const duration = 5000;

async function test() {
	const cycles = [ ];

	await snes.statusChange;

	const stop = Date.now() + duration;

	let clock = snes.machine.scheduler.now();
	let clockDelta = 0;

	let now;

	let cpuCycles = snes.machine.scheduler.cpuCycles();
	let cpuCyclesStart;

	let syncStart;
	let syncDuration;

	// Start the scheduler clock
	snes.machine.scheduler.start();

	// Run for `duration` amount of time
	while (Date.now() < stop) {
		// Update the scheduler's internal clock to match real-time
		snes.machine.scheduler.syncClock();

		now = snes.machine.scheduler.now();
		
		// See how far behind we are
		clockDelta = now - clock;
		clock = snes.machine.scheduler.now();

		// Store this so we can check how many cycles run this time
		cpuCyclesStart = cpuCycles;

		// Re-sync all of the threads, keeping track of how long it takes
		syncStart = process.hrtime();
		snes.machine.scheduler.sync();
		syncDuration = process.hrtime(syncStart);

		cpuCycles = snes.machine.scheduler.cpuCycles();

		// Keep track of all the timing for this sync
		cycles.push({
			clockStart: now,
			clockEnd: clock,
			clockDelta,
			syncDuration: ms(syncDuration),
			cpuCyclesStart,
			cpuCyclesEnd: cpuCycles,
			cpuCyclesDelta: cpuCycles - cpuCyclesStart,
			frequency: (cpuCycles - cpuCyclesStart) / (ms(syncDuration) / 1000)
		});

		// Sleep for a while so we can fall behind (normally, other things like the
		// UI would be allowed to do things during this time).
		await sleep(10);
	}

	// Calculate some stats about performance
	outputResults(cycles);
}

const outputResults = (cycles) => console.log(`
	time spent:
	total real time  => ${formatMs(sum(cycles, 'clockDelta') * 1000)}
	total cpu time   => ${formatMs(sum(cycles, 'syncDuration'))}

	frequency:
	avg cpu freq     => ${formatHz(avg(cycles, 'frequency'))}
`);

function ms(hrtime) {
	return (hrtime[0] * 1000) + (hrtime[1] / 1e6);
}

function sum(objects, prop) {
	let result = 0;

	for (let i = 0; i < objects.length; i++) {
		result += objects[i][prop];
	}

	return result;
}

function avg(objects, prop) {
	return sum(objects, prop) / objects.length;
}

function formatHz(hz) {
	if (hz < 1e3) {
		return `${hz.toFixed(4)}Hz`;
	}

	else if (hz < 1e6) {
		return `${(hz / 1e3).toFixed(4)}KHz`;
	}

	else if (hz < 1e9) {
		return `${(hz / 1e6).toFixed(4)}MHz`;
	}

	else if (hz < 1e12) {
		return `${(hz / 1e9).toFixed(4)}GHz`;
	}

	else {
		return `${(hz / 1e12).toFixed(4)}THz`;
	}
}

function formatMs(ms) {
	if (ms < 1e3) {
		return `${ms.toFixed(4)}ms`;
	}

	return `${(ms / 1000).toFixed(4)}sec`;
}

console.log('start');

test().then(() => {
	console.log('done');
});
