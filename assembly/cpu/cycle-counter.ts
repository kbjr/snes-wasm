
// 
// TODO: What do we actually want to do with cycle counts? How do
// we synchronize the various components, and keep them on real time
// schedule.
// 

let cycles: u64 = 0;

// @ts-ignore: decorator
@inline export function countCycles(num: u8) : void {
	cycles += num;
}

// @ts-ignore: decorator
@inline export function countCyclesIf(condition: bool, num: u8) : void {
	if (condition) {
		cycles += num;
	}
}

// @ts-ignore: decorator
@inline export function currentCycleCount() : u64 {
	return cycles;
}
