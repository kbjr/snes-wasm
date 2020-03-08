
export abstract class Controller {
	/**
	 * The port the controller is connected to. A 2-byte array, representing the two
	 * 8-bit registers for the controller [low, high]
	 */
	protected port: Uint8Array;

	protected abstract onConnect() : void;

	/**
	 * Connect the controller to a SNES JoyPad bus port
	 * 
	 * @param port The port to connect the controller to
	 */
	public connect(port: Uint8Array) {
		this.port = port;
		this.onConnect();
	}

	/**
	 * Disconnect the controller from its port
	 */
	public disconnect() {
		this.port = null;
	}
}
