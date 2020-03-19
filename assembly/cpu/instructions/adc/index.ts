
import { adc_, adc_u8, adc_u16 } from './implementation';
import { addr_absolute, addr_immediate, addr_stackRelative, addr_directPage } from '../../addressing';

/** 0x61 - Direct Page Indirect Indexed,X */
// export const $61 = create(addr_directPage.indexedX.indirect.Instruction);
// export const $61 = new adc.adc61();
export const $61 = new addr_directPage.indexedX.indirect.Instruction(adc_);

/** 0x63 - Stack Relative */
export const $63 = new addr_stackRelative.Instruction(adc_);

/** 0x65 - Direct Page */
export const $65 = new addr_directPage.Instruction(adc_);

/** 0x67 - Direct Page Indirect Long */
export const $67 = new addr_directPage.indirect.long.Instruction(adc_);

/** 0x69 - Immediate */
export const $69 = new addr_immediate.Instruction(adc_u8, adc_u16);

/** 0x6D - Absolute */
export const $6D = new addr_absolute.Instruction(adc_);

/** 0x6F - Absolute Long */
export const $6F = new addr_absolute.long.Instruction(adc_);

/** 0x71 - Direct Page Indirect Indexed,Y */
export const $71 = new addr_directPage.indirect.indexedY.Instruction(adc_);

/** 0x72 - Direct Page Indirect */
export const $72 = new addr_directPage.indirect.Instruction(adc_);

/** 0x73 - Stack Relative Indirect Indexed,Y */
export const $73 = new addr_stackRelative.indirectIndexedY.Instruction(adc_);

/** 0x75 - Direct Page Indexed,X */
export const $75 = new addr_directPage.indexedX.Instruction(adc_);

/** 0x77 - Direct Indirect Long Indexed,Y */
export const $77 = new addr_directPage.indirect.long.indexedY.Instruction(adc_);

/** 0x79 - Absolute Indexed,Y */
export const $79 = new addr_absolute.indexedY.Instruction(adc_);

/** 0x7D - Absolute Indexed,X */
export const $7D = new addr_absolute.indexedX.Instruction(adc_);

/** 0x7F - Absolute Long Indexed,X */
export const $7F = new addr_absolute.long.indexedX.Instruction(adc_);

