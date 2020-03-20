
import { registers } from '../../registers';
import { instruction } from '../../instruction';
import { bus } from '../../../bus';
import { u24 } from '../../../u24';
import { scheduler } from '../../../scheduler';

export function mvn_(inst: instruction.Instruction, source: bus.bank, dest: bus.bank) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
			// In this instruction, we don't really care what step we're on, we just keep
			// doing the same thing over and over until C = $FFFF (Essentially, each 3 calls into
			// this instruction is one iteration of a for loop counting down C until overflows)
			if (registers.C === 0xffff) {
				// When mvn is complete, the DBR should be the destination bank
				registers.DBR = dest;
		
				// Tell the scheduler we're done
				return true;
			}

			// Read one byte from ${srcbk}:${X}, and increment X
			bus.read.setup(u24.from_bank_addr(source, registers.X++));
			inst.step++;
			return false;
		
		case 1:
			// Grab the byte we read
			const byte: u8 = bus.read.fetch();

			// Write the byte we read to ${destbk}:${Y}, and increment Y
			bus.write.setup(u24.from_bank_addr(dest, registers.Y++), byte);
			inst.step++;
			return false;

		case 2:
			// Actually write the byte
			bus.write.exec();

			// And decrement our counter
			registers.C--;

			// Count 5 additional cycles (30 master cycles)
			scheduler.scheduler.cpuThread.countCycles(30);

			// Loop back to step 0
			inst.step = instruction.firstStep;
			return false;
		
		// This should never happen
		default: return true;
	}
}

export function mvp_(inst: instruction.Instruction, source: bus.bank, dest: bus.bank) : bool {
	switch (inst.step - instruction.firstStep) {
		case 0:
			// In this instruction, we don't really care what step we're on, we just keep
			// doing the same thing over and over until C = $FFFF (Essentially, each 3 calls into
			// this instruction is one iteration of a for loop counting down C until overflows)
			if (registers.C === 0xffff) {
				// When mvn is complete, the DBR should be the destination bank
				registers.DBR = dest;
		
				// Tell the scheduler we're done
				return true;
			}

			// Read one byte from ${srcbk}:${X}, and decrement X
			bus.read.setup(u24.from_bank_addr(source, registers.X--));
			inst.step++;
			return false;
		
		case 1:
			// Grab the byte we read
			const byte: u8 = bus.read.fetch();

			// Write the byte we read to ${destbk}:${Y}, and decrement Y
			bus.write.setup(u24.from_bank_addr(dest, registers.Y--), byte);
			inst.step++;
			return false;

		case 2:
			// Actually write the byte
			bus.write.exec();

			// And decrement our counter
			registers.C--;

			// Count 5 additional cycles (30 master cycles)
			scheduler.scheduler.cpuThread.countCycles(30);

			// Loop back to step 0
			inst.step = instruction.firstStep;
			return false;
		
		// This should never happen
		default: return true;
	}
}
