
import { Scheduler } from './scheduler';

export { Thread } from './thread';
export { Scheduler } from './scheduler';

export namespace scheduler {
	// @ts-ignore: decorator
	@inline export const scheduler: Scheduler = new Scheduler();

	// @ts-ignore: decorator
	@inline export function reset(frequency: f64) : void {
		scheduler.reset(frequency);
	}

	// @ts-ignore: decorator
	@inline export function start() : void {
		scheduler!.clock.start();
	}

	// @ts-ignore: decorator
	@inline export function stop() : void {
		scheduler!.clock.stop();
	}

	// @ts-ignore: decorator
	@inline export function pause() : void {
		scheduler!.clock.pause();
	}

	// @ts-ignore: decorator
	@inline export function unpause() : void {
		scheduler!.clock.unpause();
	}

	// @ts-ignore: decorator
	@inline export function sync() : void {
		scheduler!.sync();
	}

	// @ts-ignore: decorator
	@inline export function now() : f64 {
		return scheduler!.clock.now;
	}
}
