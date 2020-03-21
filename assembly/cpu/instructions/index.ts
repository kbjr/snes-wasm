
import { instruction } from '../instruction';
import * as addr_immediate_u8 from '../addressing/immediate/u8';

import * as adc from './adc';
import * as and from './and';
import * as asl from './asl';
import { bcc, bcs, beq, bmi, bne, bpl, bra, brl, bvc, bvs } from './b__';
import * as bit from './bit';
import * as brk from './brk';
import { clc, cld, cli, clv } from './cl_';
import * as cmp from './cmp';
import * as cop from './cop';
import { cpx, cpy } from './cp_';
import { dec, dex, dey } from './de_';
import * as eor from './eor';
import { inc, inx, iny } from './in_';
import * as jmp from './jmp';
// import * as jsr from './jsr';
// import * as lda from './lda';
// import * as ldx from './ldx';
// import * as ldy from './ldy';
// import * as lsr from './lsr';
import { mvn, mvp } from './mv_';
import * as nop from './nop';
import * as ora from './ora';
import { pea, pei, per, pha, phb, phd, phk, php, phx, phy } from './ph_';
import { pla, plb, pld, plp, plx, ply } from './pl_';
import * as rep from './rep';
import * as rol from './rol';
import * as ror from './ror';
import { rti, rtl, rts } from './rt_';
import * as sbc from './sbc';
import { sec, sed, sei, sep } from './se_';
// import * as sta from './sta';
// import { stp, stx, sty, stz } from './st_';
// import { tax, tay, tcd, tcs, tdc, trb, tsb, tsc, tsx, txa, txs, txy, tya, tyx } from './t__';
import * as wai from './wai';
import * as wdm from './wdm';
import * as xba from './xba';
import * as xce from './xce';

export function getNextInstruction() : instruction.Instruction {
	addr_immediate_u8.step0();
	addr_immediate_u8.step1();

	const opcode: u8 = addr_immediate_u8.operand;

	switch (opcode) {
		case 0x61: return adc.$61;  // adc (dp,X)
		case 0x63: return adc.$63;  // adc sr,s
		case 0x65: return adc.$65;  // adc dp
		case 0x67: return adc.$67;  // adc [dp]
		case 0x69: return adc.$69;  // adc #const
		case 0x6d: return adc.$6D;  // adc addr
		case 0x6f: return adc.$6F;  // adc long
		case 0x71: return adc.$71;  // adc (dp),Y
		case 0x72: return adc.$72;  // adc (dp)
		case 0x73: return adc.$73;  // adc (sr,S),Y
		case 0x75: return adc.$75;  // adc dp,X
		case 0x77: return adc.$77;  // adc [dp],Y
		case 0x79: return adc.$79;  // adc addr,Y
		case 0x7d: return adc.$7D;  // adc addr,X
		case 0x7f: return adc.$7F;  // adc long,X

		case 0x21: return and.$21;  // and (dp,X)
		case 0x23: return and.$23;  // and sr,S
		case 0x25: return and.$25;  // and dp
		case 0x27: return and.$27;  // and [dp]
		case 0x29: return and.$29;  // and #const
		case 0x2d: return and.$2D;  // and addr
		case 0x2f: return and.$2F;  // and long
		case 0x31: return and.$31;  // and (dp),Y
		case 0x32: return and.$32;  // and (dp)
		case 0x33: return and.$33;  // and (sr,S),Y
		case 0x35: return and.$35;  // and dp,X
		case 0x37: return and.$37;  // and [dp],Y
		case 0x39: return and.$39;  // and addr,Y
		case 0x3d: return and.$3D;  // and addr,X
		case 0x3f: return and.$3F;  // and long,X

		case 0x06: return asl.$06;  // asl dp
		case 0x0a: return asl.$0A;  // asl A
		case 0x0e: return asl.$0E;  // asl addr
		case 0x16: return asl.$16;  // asl dp,X
		case 0x1e: return asl.$1E;  // asl addr,X

		case 0x90: return bcc.$90;  // bcc nearlabel
		case 0xb0: return bcs.$B0;  // bcs nearlabel
		case 0xf0: return beq.$F0;  // beq nearlabel

		case 0x24: return bit.$24;  // bit dp
		case 0x2c: return bit.$2C;  // bit addr
		case 0x34: return bit.$34;  // bit dp,X
		case 0x3c: return bit.$3C;  // bit addr,X
		case 0x89: return bit.$89;  // bit #const

		case 0x30: return bmi.$30;  // bmi nearlabel
		case 0xd0: return bne.$D0;  // bne nearlabel
		case 0x10: return bpl.$10;  // bpl nearlabel
		case 0x80: return bra.$80;  // bra nearlabel

		case 0x00: return brk.$00;  // brk

		case 0x82: return brl.$82;  // brl label
		case 0x50: return bvc.$50;  // bvc nearlabel
		case 0x70: return bvs.$70;  // bvs nearlabel
		
		case 0x18: return clc.$18;  // clc
		case 0xd8: return cld.$D8;  // cld
		case 0x58: return cli.$58;  // cli
		case 0xb8: return clv.$B8;  // clv

		case 0xc1: return cmp.$C1;  // cmp (dp,X)
		case 0xc3: return cmp.$C3;  // cmp sr,S
		case 0xc5: return cmp.$C5;  // cmp dp
		case 0xc7: return cmp.$C7;  // cmp [dp]
		case 0xc9: return cmp.$C9;  // cmp #const
		case 0xcd: return cmp.$CD;  // cmp addr
		case 0xcf: return cmp.$CF;  // cmp long
		case 0xd1: return cmp.$D1;  // cmp (dp),Y
		case 0xd2: return cmp.$D2;  // cmp (dp)
		case 0xd3: return cmp.$D3;  // cmp (sr,S),Y
		case 0xd5: return cmp.$D5;  // cmp dp,X
		case 0xd7: return cmp.$D7;  // cmp [dp],Y
		case 0xd9: return cmp.$D9;  // cmp addr,Y
		case 0xdd: return cmp.$DD;  // cmp addr,X
		case 0xdf: return cmp.$DF;  // cmp long,X

		case 0x02: return cop.$02;  // cop const

		case 0xe0: return cpx.$E0;  // cpx #const
		case 0xe4: return cpx.$E4;  // cpx dp
		case 0xec: return cpx.$EC;  // cpx addr
		case 0xc0: return cpy.$C0;  // cpy #const
		case 0xc4: return cpy.$C4;  // cpy dp
		case 0xcc: return cpy.$CC;  // cpy addr

		case 0x3a: return dec.$3A;  // dec A
		case 0xc6: return dec.$C6;  // dec dp
		case 0xce: return dec.$CE;  // dec addr
		case 0xd6: return dec.$D6;  // dec dp,X
		case 0xde: return dec.$DE;  // dec addr,X
		case 0xca: return dex.$CA;  // dex
		case 0x88: return dey.$88;  // dey

		case 0x41: return eor.$41;  // eor (dp,X)
		case 0x43: return eor.$43;  // eor sr,S
		case 0x45: return eor.$45;  // eor dp
		case 0x47: return eor.$47;  // eor [dp]
		case 0x49: return eor.$49;  // eor #const
		case 0x4d: return eor.$4D;  // eor addr
		case 0x4f: return eor.$4F;  // eor long
		case 0x51: return eor.$51;  // eor (dp),Y
		case 0x52: return eor.$52;  // eor (dp)
		case 0x53: return eor.$53;  // eor (sr,S),Y
		case 0x55: return eor.$55;  // eor dp,X
		case 0x57: return eor.$57;  // eor [dp],Y
		case 0x59: return eor.$59;  // eor addr,Y
		case 0x5d: return eor.$5D;  // eor addr,X
		case 0x5f: return eor.$5F;  // eor long,X

		case 0x1a: return inc.$1A;  // inc A
		case 0xe6: return inc.$E6;  // inc dp
		case 0xee: return inc.$EE;  // inc addr
		case 0xf6: return inc.$F6;  // inc dp,X
		case 0xfe: return inc.$FE;  // inc addr,X
		case 0xe8: return inx.$E8;  // inx
		case 0xc8: return iny.$C8;  // iny

		case 0x4c: return jmp.$4C;  // jmp addr
		case 0x5c: return jmp.$5C;  // jmp long
		case 0x6c: return jmp.$6C;  // jmp (addr)
		case 0x7c: return jmp.$7C;  // jmp (addr,X)
		case 0xdc: return jmp.$DC;  // jmp [addr]

		// case 0x20: return jsr.$20;  // jsr addr
		// case 0x22: return jsr.$22;  // jsr long
		// case 0xfc: return jsr.$FC;  // jsr (addr,X))

		// case 0xa1: return lda.$A1;  // lda (dp,X)
		// case 0xa3: return lda.$A3;  // lda sr,S
		// case 0xa5: return lda.$A5;  // lda dp
		// case 0xa7: return lda.$A7;  // lda [dp]
		// case 0xa9: return lda.$A9;  // lda #const
		// case 0xad: return lda.$AD;  // lda addr
		// case 0xaf: return lda.$AF;  // lda long
		// case 0xb1: return lda.$B1;  // lda (dp),Y
		// case 0xb2: return lda.$B2;  // lda (dp)
		// case 0xb3: return lda.$B3;  // lda (sr,S),Y
		// case 0xb5: return lda.$B5;  // lda dp,X
		// case 0xb7: return lda.$B7;  // lda [dp],Y
		// case 0xb9: return lda.$B9;  // lda addr,Y
		// case 0xbd: return lda.$BD;  // lda addr,X
		// case 0xbf: return lda.$BF;  // lda long,X

		// case 0xa2: return ldx.$A2;  // ldx #const
		// case 0xa6: return ldx.$A6;  // ldx dp
		// case 0xae: return ldx.$AE;  // ldx addr
		// case 0xb6: return ldx.$B6;  // ldx dp,Y
		// case 0xbe: return ldx.$BE;  // ldx addr,Y

		// case 0xa0: return ldy.$A0;  // ldy #const
		// case 0xa4: return ldy.$A4;  // ldy dp
		// case 0xac: return ldy.$AC;  // ldy addr
		// case 0xb4: return ldy.$B4;  // ldy dp,X
		// case 0xbc: return ldy.$BC;  // ldy addr,X

		// case 0x46: return lsr.$46;  // lsr dp
		// case 0x4a: return lsr.$4A;  // lsr A
		// case 0x4e: return lsr.$4E;  // lsr addr
		// case 0x56: return lsr.$56;  // lsr dp,X
		// case 0x5e: return lsr.$5E;  // lsr addr,X

		case 0x54: return mvn.$54;  // mvn srcbk,destbk
		case 0x44: return mvp.$44;  // mvp srcbk,destbk

		case 0xea: return nop.$EA;  // nop

		case 0x01: return ora.$01;  // ora (dp,X)
		case 0x03: return ora.$03;  // ora sr,S
		case 0x05: return ora.$05;  // ora dp
		case 0x07: return ora.$07;  // ora [dp]
		case 0x09: return ora.$09;  // ora #const
		case 0x0d: return ora.$0D;  // ora addr
		case 0x0f: return ora.$0F;  // ora long
		case 0x11: return ora.$11;  // ora (dp),Y
		case 0x12: return ora.$12;  // ora (dp)
		case 0x13: return ora.$13;  // ora (sr,S),Y
		case 0x15: return ora.$15;  // ora dp,X
		case 0x17: return ora.$17;  // ora [dp],Y
		case 0x19: return ora.$19;  // ora addr,Y
		case 0x1d: return ora.$1D;  // ora addr,X
		case 0x1f: return ora.$1F;  // ora long,X

		case 0xf4: return pea.$F4;  // pea addr
		case 0xd4: return pei.$D4;  // pei (dp)
		case 0x62: return per.$62;  // per label
		
		case 0x48: return pha.$48;  // pha
		case 0x8b: return phb.$8B;  // phb
		case 0x0b: return phd.$0B;  // phd
		case 0x4b: return phk.$4B;  // phk
		case 0x08: return php.$08;  // php
		case 0xda: return phx.$DA;  // phx
		case 0x5a: return phy.$5A;  // phy

		case 0x68: return pla.$68;  // pla
		case 0xab: return plb.$AB;  // plb
		case 0x2b: return pld.$2B;  // pld
		case 0x28: return plp.$28;  // plp
		case 0xfa: return plx.$FA;  // plx
		case 0x7a: return ply.$7A;  // ply

		case 0xc2: return rep.$C2;  // rep #const

		case 0x2a: return rol.$2A;  // rol A
		case 0x2e: return rol.$2E;  // rol addr
		case 0x26: return rol.$26;  // rol dp
		case 0x3e: return rol.$3E;  // rol addr,X
		case 0x36: return rol.$36;  // rol dp,X

		case 0x6a: return ror.$6A;  // ror A
		case 0x6e: return ror.$6E;  // ror addr
		case 0x66: return ror.$66;  // ror dp
		case 0x7e: return ror.$7E;  // ror addr,X
		case 0x76: return ror.$76;  // ror dp,X
		
		case 0x40: return rti.$40;  // rti
		case 0x6b: return rtl.$6B;  // rtl
		case 0x60: return rts.$60;  // rts

		case 0xe1: return sbc.$E1;  // sbc (dp,X)
		case 0xe3: return sbc.$E3;  // sbc sr,S
		case 0xe5: return sbc.$E5;  // sbc dp
		case 0xe7: return sbc.$E7;  // sbc [dp]
		case 0xe9: return sbc.$E9;  // sbc #const
		case 0xed: return sbc.$ED;  // sbc addr
		case 0xef: return sbc.$EF;  // sbc long
		case 0xf1: return sbc.$F1;  // sbc (dp),Y
		case 0xf2: return sbc.$F2;  // sbc (dp)
		case 0xf3: return sbc.$F3;  // sbc (sr,S),Y
		case 0xf5: return sbc.$F5;  // sbc dp,X
		case 0xf7: return sbc.$F7;  // sbc [dp],Y
		case 0xf9: return sbc.$F9;  // sbc addr,Y
		case 0xfd: return sbc.$FD;  // sbc addr,X
		case 0xff: return sbc.$FF;  // sbc long,X

		case 0x38: return sec.$38;  // sec
		case 0xf8: return sed.$F8;  // sed
		case 0x78: return sei.$78;  // sei

		case 0xe2: return sep.$E2;  // sep #const 

		// case 0x81: return sta.$81;  // sta (dp,X)
		// case 0x83: return sta.$83;  // sta sr,S
		// case 0x85: return sta.$85;  // sta dp
		// case 0x87: return sta.$87;  // sta [dp]
		// case 0x8d: return sta.$8D;  // sta addr
		// case 0x8f: return sta.$8F;  // sta long
		// case 0x91: return sta.$91;  // sta (dp),Y
		// case 0x92: return sta.$92;  // sta (dp)
		// case 0x93: return sta.$93;  // sta (sr,S),Y
		// case 0x95: return sta.$95;  // sta _dp_X
		// case 0x97: return sta.$97;  // sta [dp],Y
		// case 0x99: return sta.$99;  // sta addr,Y
		// case 0x9d: return sta.$9D;  // sta addr,X
		// case 0x9f: return sta.$9F;  // sta long,X

		// case 0xdb: return stp.$DB;  // stp

		// case 0x86: return stx.$86;  // stx dp
		// case 0x8e: return stx.$8E;  // stx addr
		// case 0x96: return stx.$96;  // stx dp,Y
		// case 0x84: return sty.$84;  // sty dp
		// case 0x8c: return sty.$8C;  // sty addr
		// case 0x94: return sty.$94;  // sty dp,X

		// case 0x64: return stz.$64;  // stz dp
		// case 0x74: return stz.$74;  // stz dp,X
		// case 0x9c: return stz.$9C;  // stz addr
		// case 0x9e: return stz.$9E;  // stz addr,X

		// case 0xaa: return tax.$AA;  // tax
		// case 0xa8: return tay.$A8;  // tay
		// case 0x5b: return tcd.$5B;  // tcd
		// case 0x1b: return tcs.$1B;  // tcs
		// case 0x7b: return tdc.$7B;  // tdc

		// case 0x14: return trb.$14;  // trb dp
		// case 0x1c: return trb.$1C;  // trb addr
		// case 0x04: return tsb.$04;  // tsb dp
		// case 0x0c: return tsb.$0C;  // tsb addr

		// case 0x3b: return tsc.$3B;  // tsc
		// case 0xba: return tsx.$BA;  // tsx
		// case 0x8a: return txa.$8A;  // txa
		// case 0x9a: return txs.$9A;  // txs
		// case 0x9b: return txy.$9B;  // txy
		// case 0x98: return tya.$98;  // tya
		// case 0xbb: return tyx.$BB;  // tyx
		
		case 0xcb: return wai.$CB;  // wai

		case 0x42: return wdm.$42;  // wdm

		case 0xeb: return xba.$EB;  // xba
		case 0xfb: return xce.$FB;  // xce

		// This should never happen, but at least nop should be safe....
		default: return nop.$EA;
	}
}
