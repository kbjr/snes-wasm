
import { registers } from '../../registers';
import { scheduler } from '../../../scheduler';
import { instruction } from '../../instruction';
import * as addr_programCounterRelative from '../../addressing/program-counter-relative/program-counter-relative';
import * as addr_programCounterRelative_long from '../../addressing/program-counter-relative/long';

// TODO: Implement [2]

export class Instruction_branch extends instruction.Instruction {
	public exec() : bool {
		switch (this.step) {
			case 0:
				addr_programCounterRelative.step0();
				this.step++;
				return false;
			
			case 1:
				addr_programCounterRelative.step1();
				this.step++;
				return false;

			case 2:
				registers.PC += <u16>(addr_programCounterRelative.effective & 0xffff);

				// Count 1 extra cycle (6 master cycles) for the branch
				scheduler.scheduler.cpuThread(6);

				// We're all done
				this.step = 0;
				return true;
			
			// This should never happen
			default: return true;
		}
	}
}

export class Instruction_branch_conditional extends Instruction_branch {
	public branch: bool = false;
	
	constructor(public readonly condition: instruction.callback.exec) {
		super();
	}

	public exec() : bool {
		if (this.step === 0) {
			this.branch = this.condition(this);
		}

		if (this.branch) {
			return super.exec();
		}

		else {
			// Skip over the operand
			registers.PC++;

			// Count 1 cycle (6 master cycles) for the operand we pretended to read
			scheduler.scheduler.cpuThread.countCycles(6);

			return true;
		}
	}
}

export class Instruction_branch_long extends instruction.Instruction {
	public exec() : bool {
		switch (this.step) {
			case 0:
				addr_programCounterRelative_long.step0();
				this.step++;
				return false;
			
			case 1:
				addr_programCounterRelative_long.step1();
				this.step++;
				return false;
			
			case 2:
				addr_programCounterRelative_long.step2();
				this.step++;
				return false;

			case 3:
				registers.PC += <u16>(addr_programCounterRelative_long.effective & 0xffff);

				// Count 1 extra cycle (6 master cycles) for the branch
				scheduler.scheduler.cpuThread(6);

				// We're all done
				this.step = 0;
				return true;
			
			// This should never happen
			default: return true;
		}
	}
}
