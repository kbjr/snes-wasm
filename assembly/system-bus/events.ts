
export type Callback = () => void;

class Event {
	protected readonly systemCallbacks: Callback[] = [ ];
	protected readonly cartridgeCallbacks: Callback[] = [ ];

	public addSystemCallback(callback: Callback) : void {
		this.systemCallbacks.push(callback);
	}

	public addCartridgeCallback(callback: Callback) : void {
		this.cartridgeCallbacks.push(callback);
	}

	public clearCartridgeCallbacks() : void {
		this.cartridgeCallbacks.length = 0;
	}

	/** Fires the event, calling to all the connected callbacks */
	public fire() : void {
		for (let i = 0; i < this.systemCallbacks.length; i++) {
			this.systemCallbacks[i]();
		}
		
		for (let i = 0; i < this.cartridgeCallbacks.length; i++) {
			this.cartridgeCallbacks[i]();
		}
	}
}

/**
 * Represents the RD line on Address Bus A. When fired, each connected callback
 * will be run, to allow each device the option to respond to the read request.
 */
export const RD = new Event();

/**
 * Represents the WR line on Address Bus A. When fired, each connected callback
 * will be run, to allow each device the option to respond to the write request.
 */
export const WR = new Event();

/**
 * Represents the PARD line on Address Bus B. When fired, each connected callback
 * will be run, to allow each device the option to respond to the read request.
 */
export const PARD = new Event();

/**
 * Represents the PAWR line on Address Bus B. When fired, each connected callback
 * will be run, to allow each device the option to respond to the write request.
 */
export const PAWD = new Event();
