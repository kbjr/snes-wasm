
import { Controller } from './controller';

const enum Button {
	// Low byte
	B      = 0x80,
	Y      = 0x40,
	Select = 0x20,
	Start  = 0x10,
	Up     = 0x08,
	Down   = 0x04,
	Left   = 0x02,
	Right  = 0x01,

	// High byte
	A      = 0x80,
	X      = 0x40,
	L      = 0x20,
	R      = 0x10
}

export class JoyPad extends Controller {
	protected onConnect() {
		this.port[0] = 0;
		this.port[1] = 0;
	}

	/** The status of the B button (true = pressed, false = not pressed) */
	public get buttonB() {
		return (this.port[0] & Button.B) === Button.B;
	}

	public set buttonB(value) {
		this.port[0] = value
			? this.port[0] | Button.B
			: this.port[0] & (Button.B ^ 0xff);
	}

	/** The status of the Y button (true = pressed, false = not pressed) */
	public get buttonY() {
		return (this.port[0] & Button.Y) === Button.Y;
	}

	public set buttonY(value) {
		this.port[0] = value
			? this.port[0] | Button.Y
			: this.port[0] & (Button.Y ^ 0xff);
	}

	/** The status of the Select button (true = pressed, false = not pressed) */
	public get buttonSelect() {
		return (this.port[0] & Button.Select) === Button.Select;
	}

	public set buttonSelect(value) {
		this.port[0] = value
			? this.port[0] | Button.Select
			: this.port[0] & (Button.Select ^ 0xff);
	}

	/** The status of the Start button (true = pressed, false = not pressed) */
	public get buttonStart() {
		return (this.port[0] & Button.Start) === Button.Start;
	}

	public set buttonStart(value) {
		this.port[0] = value
			? this.port[0] | Button.Start
			: this.port[0] & (Button.Start ^ 0xff);
	}

	/** The status of the Up button (true = pressed, false = not pressed) */
	public get buttonUp() {
		return (this.port[0] & Button.Up) === Button.Up;
	}

	public set buttonUp(value) {
		this.port[0] = value
			? this.port[0] | Button.Up
			: this.port[0] & (Button.Up ^ 0xff);
	}

	/** The status of the Down button (true = pressed, false = not pressed) */
	public get buttonDown() {
		return (this.port[0] & Button.Down) === Button.Down;
	}

	public set buttonDown(value) {
		this.port[0] = value
			? this.port[0] | Button.Down
			: this.port[0] & (Button.Down ^ 0xff);
	}

	/** The status of the Left button (true = pressed, false = not pressed) */
	public get buttonLeft() {
		return (this.port[0] & Button.Left) === Button.Left;
	}

	public set buttonLeft(value) {
		this.port[0] = value
			? this.port[0] | Button.Left
			: this.port[0] & (Button.Left ^ 0xff);
	}

	/** The status of the Right button (true = pressed, false = not pressed) */
	public get buttonRight() {
		return (this.port[0] & Button.Right) === Button.Right;
	}

	public set buttonRight(value) {
		this.port[0] = value
			? this.port[0] | Button.Right
			: this.port[0] & (Button.Right ^ 0xff);
	}

	/** The status of the A button (true = pressed, false = not pressed) */
	public get buttonA() {
		return (this.port[1] & Button.A) === Button.A;
	}

	public set buttonA(value) {
		this.port[1] = value
			? this.port[1] | Button.A
			: this.port[1] & (Button.A ^ 0xff);
	}

	/** The status of the X button (true = pressed, false = not pressed) */
	public get buttonX() {
		return (this.port[1] & Button.X) === Button.X;
	}

	public set buttonX(value) {
		this.port[1] = value
			? this.port[1] | Button.X
			: this.port[1] & (Button.X ^ 0xff);
	}

	/** The status of the L button (true = pressed, false = not pressed) */
	public get buttonL() {
		return (this.port[1] & Button.L) === Button.L;
	}

	public set buttonL(value) {
		this.port[1] = value
			? this.port[1] | Button.L
			: this.port[1] & (Button.L ^ 0xff);
	}

	/** The status of the R button (true = pressed, false = not pressed) */
	public get buttonR() {
		return (this.port[1] & Button.R) === Button.R;
	}

	public set buttonR(value) {
		this.port[1] = value
			? this.port[1] | Button.R
			: this.port[1] & (Button.R ^ 0xff);
	}
}
