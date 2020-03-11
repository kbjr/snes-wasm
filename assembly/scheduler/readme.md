
# Scheduler

To emulate the SNES, we need to emulate several different pieces of hardware, each of which should be running in parallel. But, we only have one thread in WASM to work with. We also need to make sure that these pieces of emulated hardware run at the correct speed.

The scheduler is what deals with both of these problems. Each piece of emulated hardware has a `Thread` instance for it that counts the number of cycles that have passed. The scheduler handles sharing time between each of these "threads", trying to keep them in sync with one another, while also not allowing them to run too far ahead of real-time.

Each `Thread` has a "main loop" function that is called when that thread is being given time by the scheduler. It will then delegate control to an `Instruction` function by calling `thread.runInstruction(instruction)`. Here's an example of what the basic pieces look like:

```typescript
import { Thread } from './thread';

// Create a new thread with a frequency of 10Hz (means the scheduler will
// attempt to allocate us 10 "cycles" every real-time second).
const thread = new Thread(10, main);

// This is the main loop function that gets called when it is this thread's turn
function main() {
	// Every time we loop, this thread just runs `instructionA`
	thread.runInstruction(instructionA);
}

// This function is an instruction. These are essentially unrolled generator functions.
function instructionA(step: u8) : bool {
	// Each time this instruction is run, step will be 0.
	switch (step) {
		case 0:
			// The instruction can then do what it needs to
			startDoingSomethingInteresting();

			// We tell the thread how many "cycles" that took to do
			thread.countCycles(2);

			// Then return true, telling the scheduler that we still
			// have more things to do here.
			// This is essentially a `yield`
			return true;
		
		// The next time the scheduler gives us time, we'll be on step
		// 1. `step` just continues incrementing with each call
		case 1:
			// Continue where we left off last time
			doSomeMoreInterestingStuff();

			// Count some more cycles, and once again, yield back to the
			// scheduler
			thread.countCycles(5);
			return true;
		
		case 2:
			// More of the same...
			finishInterestingStuff();
			thread.countCycles(1);

			// Once we finish the full instruction, we return false. This tells
			// the scheduler that this instruction is complete, and the next time
			// this thread is given time, we'll be back in the main loop function
			return false;
	}
}
```
