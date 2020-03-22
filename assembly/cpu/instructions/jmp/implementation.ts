
import { instruction } from '../../instruction';
import { registers } from '../../registers';

export function jmp(inst: instruction.Instruction, effective: u32) : true {
	registers.PC = <u16>(effective & 0xffff);

	return true;
}

export function jml(inst: instruction.Instruction, effective: u32) : true {
	registers.PC = <u16>(effective & 0xffff);
	registers.PBR = <u8>(effective >> 16);

	return true;
}
