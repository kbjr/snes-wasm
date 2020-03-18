
import { clock_status } from '../constants';

/** Alias of f64; Represents a time / duration, measured in seconds, with millisecond resolution */
export type Time = f64;

export class Clock {
	protected status: u8 = clock_status.stopped;

	protected startTime: Time = 0.0;

	protected pausedTime: Time = 0.0;

	protected currentTime: Time = 0.0;

	@inline public get now() : Time {
		return (this.currentTime - this.startTime) - this.pausedTime;
	}

	public start() : void {
		assert(this.status === clock_status.stopped);

		this.status = clock_status.running;
		this.startTime = now();
		this.pausedTime = 0;
		this.currentTime = this.startTime;
	}

	public stop() : void {
		assert(this.status !== clock_status.stopped);

		this.status = clock_status.stopped;
		this.startTime = 0;
		this.pausedTime = 0;
		this.currentTime = 0;
	}

	public pause() : void {
		assert(this.status === clock_status.running);

		this.status = clock_status.paused;
		this.currentTime = this.currentTime;
	}

	public unpause() : void {
		assert(this.status === clock_status.paused);

		const time = now();

		this.status = clock_status.running;
		this.pausedTime += (time - this.currentTime);
		this.currentTime = time;
	}

	public sync() : void {
		assert(this.status === clock_status.running);

		this.currentTime = now();
	}
}

function now() : Time {
	return <f64>Date.now() / 1000;
}
