
export interface Machine {
	memory: WebAssembly.Memory;
	CPU: {
		getRegisters() : u24;
	};
	SystemBus: {
		getSystemBus() : u24;
	};
	Joypad: {
		getPort1() : u24;
		getPort2() : u24;
		getPort3() : u24;
		getPort4() : u24;
		getRegisters() : u24;
	};
	read(pointer: u24) : u8;
	write(pointer: u24, value: u8) : void;
	// load_u24(pointer: u24) : u24;
	// store_u24(pointer: u24, value: u24) : void;
}
