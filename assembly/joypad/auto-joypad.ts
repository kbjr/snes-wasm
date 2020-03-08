
import { readJoypad1, readJoypad2, readJoypad3, readJoypad4 } from './ports';
import { setJOY1L, setJOY1H, setJOY2L, setJOY2H, setJOY3L, setJOY3H, setJOY4L, setJOY4H } from './registers';

/**
 * Runs the auto-joypad process to read from the controller ports and write
 * the data to the joypad registers.
 * 
 * TODO:
 *   - Set the flag to mark that auto-joypad is running
 *   - How many cycles does this take? How do we space out execution?
 */
export function runAutoJoyPad() : void {
	const joypad1: u16 = readJoypad1();

	setJOY1L(joypad1 & 0xff);
	setJOY1H((joypad1 >> 8) & 0xff);
	
	const joypad2: u16 = readJoypad2();

	setJOY2L(joypad2 & 0xff);
	setJOY2H((joypad2 >> 8) & 0xff);
	
	const joypad3: u16 = readJoypad3();

	setJOY3L(joypad3 & 0xff);
	setJOY3H((joypad3 >> 8) & 0xff);
	
	const joypad4: u16 = readJoypad4();

	setJOY4L(joypad4 & 0xff);
	setJOY4H((joypad4 >> 8) & 0xff);
}
