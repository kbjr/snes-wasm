
import { Instruction } from '../../scheduler';
import { addr_immediate_u8 } from '../addressing';

import { adc } from './adc';
import { and } from './and';
import { asl } from './asl';
import { bcc, bcs, beq, bmi, bne, bpl, bra, brl, bvc, bvs } from './b__';
import { bit } from './bit';
import { brk } from './brk';
import { clc, cld, cli, clv } from './cl_';
import { cmp } from './cmp';
import { cop } from './cop';
import { cpx, cpy } from './cp_';
import { dec, dex, dey } from './de_';
import { eor } from './eor';
import { inc, inx, iny } from './in_';
import { jmp } from './jmp';
import { jsr } from './jsr';
import { lda } from './lda';
import { ldx } from './ldx';
import { ldy } from './ldy';
import { lsr } from './lsr';
import { mvn, mvp } from './mv_';
import { nop } from './nop';
import { ora } from './ora';
import { pea, pei, per, pha, phb, phd, phk, php, phx, phy } from './ph_';
import { pla, plb, pld, plp, plx, ply } from './pl_';
import { rep } from './rep';
import { rol } from './rol';
import { ror } from './ror';
import { rti, rtl, rts } from './rt_';
import { sbc } from './sbc';
import { sec, sed, sei, sep } from './se_';
import { sta } from './sta';
import { stp, stx, sty, stz } from './st_';
import { tax, tay, tcd, tcs, tdc, trb, tsb, tsc, tsx, txa, txs, txy, tya, tyx } from './t__';
import { wai } from './wai';
import { wdm } from './wdm';
import { xba } from './xba';
import { xce } from './xce';

export function getNextInstruction() : Instruction {
	const opcode: u8 = addr_immediate_u8();

	switch (opcode) {
		case 0x61: return new adc.$61();  // adc (dp,X)
		case 0x63: return new adc.$63();  // adc sr,s
		case 0x65: return new adc.$65();  // adc dp
		case 0x67: return new adc.$67();  // adc [dp]
		case 0x69: return new adc.$69();  // adc #const
		case 0x6d: return new adc.$6D();  // adc addr
		case 0x6f: return new adc.$6F();  // adc long
		case 0x71: return new adc.$71();  // adc (dp),Y
		case 0x72: return new adc.$72();  // adc (dp)
		case 0x73: return new adc.$73();  // adc (sr,S),Y
		case 0x75: return new adc.$75();  // adc dp,X
		case 0x77: return new adc.$77();  // adc [dp],Y
		case 0x79: return new adc.$79();  // adc addr,Y
		case 0x7d: return new adc.$7D();  // adc addr,X
		case 0x7f: return new adc.$7F();  // adc long,X

		case 0x21: return new and.$21();  // and (dp,X)
		case 0x23: return new and.$23();  // and sr,S
		case 0x25: return new and.$25();  // and dp
		case 0x27: return new and.$27();  // and [dp]
		case 0x29: return new and.$29();  // and #const
		case 0x2d: return new and.$2D();  // and addr
		case 0x2f: return new and.$2F();  // and long
		case 0x31: return new and.$31();  // and (dp),Y
		case 0x32: return new and.$32();  // and (dp)
		case 0x33: return new and.$33();  // and (sr,S),Y
		case 0x35: return new and.$35();  // and dp,X
		case 0x37: return new and.$37();  // and [dp],Y
		case 0x39: return new and.$39();  // and addr,Y
		case 0x3d: return new and.$3D();  // and addr,X
		case 0x3f: return new and.$3F();  // and long,X

		case 0x06: return new asl.$06();  // asl dp
		case 0x0a: return new asl.$0A();  // asl A
		case 0x0e: return new asl.$0E();  // asl addr
		case 0x16: return new asl.$16();  // asl dp,X
		case 0x1e: return new asl.$1E();  // asl addr,X

		case 0x90: return new bcc.$90();  // bcc nearlabel
		case 0xb0: return new bcs.$B0();  // bcs nearlabel
		case 0xf0: return new beq.$F0();  // beq nearlabel

		case 0x24: return new bit.$24();  // bit dp
		case 0x2c: return new bit.$2C();  // bit addr
		case 0x34: return new bit.$34();  // bit dp,X
		case 0x3c: return new bit.$3C();  // bit addr,X
		case 0x89: return new bit.$89();  // bit #const

		case 0x30: return new bmi.$30();  // bmi nearlabel
		case 0xd0: return new bne.$D0();  // bne nearlabel
		case 0x10: return new bpl.$10();  // bpl nearlabel
		case 0x80: return new bra.$80();  // bra nearlabel

		case 0x00: return new brk.$00();  // brk

		case 0x82: return new brl.$82();  // brl label
		case 0x50: return new bvc.$50();  // bvc nearlabel
		case 0x70: return new bvs.$70();  // bvs nearlabel
		
		case 0x18: return new clc.$18();  // clc
		case 0xd8: return new cld.$D8();  // cld
		case 0x58: return new cli.$58();  // cli
		case 0xb8: return new clv.$B8();  // clv

		case 0xc1: return new cmp.$C1();  // cmp (dp,X)
		case 0xc3: return new cmp.$C3();  // cmp sr,S
		case 0xc5: return new cmp.$C5();  // cmp dp
		case 0xc7: return new cmp.$C7();  // cmp [dp]
		case 0xc9: return new cmp.$C9();  // cmp #const
		case 0xcd: return new cmp.$CD();  // cmp addr
		case 0xcf: return new cmp.$CF();  // cmp long
		case 0xd1: return new cmp.$D1();  // cmp (dp),Y
		case 0xd2: return new cmp.$D2();  // cmp (dp)
		case 0xd3: return new cmp.$D3();  // cmp (sr,S),Y
		case 0xd5: return new cmp.$D5();  // cmp dp,X
		case 0xd7: return new cmp.$D7();  // cmp [dp],Y
		case 0xd9: return new cmp.$D9();  // cmp addr,Y
		case 0xdd: return new cmp.$DD();  // cmp addr,X
		case 0xdf: return new cmp.$DF();  // cmp long,X

		case 0x02: return new cop.$02();  // cop const

		case 0xe0: return new cpx.$E0();  // cpx #const
		case 0xe4: return new cpx.$E4();  // cpx dp
		case 0xec: return new cpx.$EC();  // cpx addr
		case 0xc0: return new cpy.$C0();  // cpy #const
		case 0xc4: return new cpy.$C4();  // cpy dp
		case 0xcc: return new cpy.$CC();  // cpy addr

		case 0x3a: return new dec.$3A();  // dec A
		case 0xc6: return new dec.$C6();  // dec dp
		case 0xce: return new dec.$CE();  // dec addr
		case 0xd6: return new dec.$D6();  // dec dp,X
		case 0xde: return new dec.$DE();  // dec addr,X
		case 0xca: return new dex.$CA();  // dex
		case 0x88: return new dey.$88();  // dey

		case 0x41: return new eor.$41();  // eor (dp,X)
		case 0x43: return new eor.$43();  // eor sr,S
		case 0x45: return new eor.$45();  // eor dp
		case 0x47: return new eor.$47();  // eor [dp]
		case 0x49: return new eor.$49();  // eor #const
		case 0x4d: return new eor.$4D();  // eor addr
		case 0x4f: return new eor.$4F();  // eor long
		case 0x51: return new eor.$51();  // eor (dp),Y
		case 0x52: return new eor.$52();  // eor (dp)
		case 0x53: return new eor.$53();  // eor (sr,S),Y
		case 0x55: return new eor.$55();  // eor dp,X
		case 0x57: return new eor.$57();  // eor [dp],Y
		case 0x59: return new eor.$59();  // eor addr,Y
		case 0x5d: return new eor.$5D();  // eor addr,X
		case 0x5f: return new eor.$5F();  // eor long,X

		case 0x1a: return new inc.$1A();  // inc A
		case 0xe6: return new inc.$E6();  // inc dp
		case 0xee: return new inc.$EE();  // inc addr
		case 0xf6: return new inc.$F6();  // inc dp,X
		case 0xfe: return new inc.$FE();  // inc addr,X
		case 0xe8: return new inx.$E8();  // inx
		case 0xc8: return new iny.$C8();  // iny

		case 0x4c: return new jmp.$4C();  // jmp addr
		case 0x5c: return new jmp.$5C();  // jmp long
		case 0x6c: return new jmp.$6C();  // jmp (addr)
		case 0x7c: return new jmp.$7C();  // jmp (addr,X)
		case 0xdc: return new jmp.$DC();  // jmp [addr]

		case 0x20: return new jsr.$20();  // jsr addr
		case 0x22: return new jsr.$22();  // jsr long
		case 0xfc: return new jsr.$FC();  // jsr (addr,X))

		case 0xa1: return new lda.$A1();  // lda (dp,X)
		case 0xa3: return new lda.$A3();  // lda sr,S
		case 0xa5: return new lda.$A5();  // lda dp
		case 0xa7: return new lda.$A7();  // lda [dp]
		case 0xa9: return new lda.$A9();  // lda #const
		case 0xad: return new lda.$AD();  // lda addr
		case 0xaf: return new lda.$AF();  // lda long
		case 0xb1: return new lda.$B1();  // lda (dp),Y
		case 0xb2: return new lda.$B2();  // lda (dp)
		case 0xb3: return new lda.$B3();  // lda (sr,S),Y
		case 0xb5: return new lda.$B5();  // lda dp,X
		case 0xb7: return new lda.$B7();  // lda [dp],Y
		case 0xb9: return new lda.$B9();  // lda addr,Y
		case 0xbd: return new lda.$BD();  // lda addr,X
		case 0xbf: return new lda.$BF();  // lda long,X

		case 0xa2: return new ldx.$A2();  // ldx #const
		case 0xa6: return new ldx.$A6();  // ldx dp
		case 0xae: return new ldx.$AE();  // ldx addr
		case 0xb6: return new ldx.$B6();  // ldx dp,Y
		case 0xbe: return new ldx.$BE();  // ldx addr,Y

		case 0xa0: return new ldy.$A0();  // ldy #const
		case 0xa4: return new ldy.$A4();  // ldy dp
		case 0xac: return new ldy.$AC();  // ldy addr
		case 0xb4: return new ldy.$B4();  // ldy dp,X
		case 0xbc: return new ldy.$BC();  // ldy addr,X

		case 0x46: return new lsr.$46();  // lsr dp
		case 0x4a: return new lsr.$4A();  // lsr A
		case 0x4e: return new lsr.$4E();  // lsr addr
		case 0x56: return new lsr.$56();  // lsr dp,X
		case 0x5e: return new lsr.$5E();  // lsr addr,X

		case 0x54: return new mvn.$54();  // mvn srcbk,destbk
		case 0x44: return new mvp.$44();  // mvp srcbk,destbk

		case 0xea: return new nop.$EA();  // nop

		case 0x01: return new ora.$01();  // ora (dp,X)
		case 0x03: return new ora.$03();  // ora sr,S
		case 0x05: return new ora.$05();  // ora dp
		case 0x07: return new ora.$07();  // ora [dp]
		case 0x09: return new ora.$09();  // ora #const
		case 0x0d: return new ora.$0D();  // ora addr
		case 0x0f: return new ora.$0F();  // ora long
		case 0x11: return new ora.$11();  // ora (dp),Y
		case 0x12: return new ora.$12();  // ora (dp)
		case 0x13: return new ora.$13();  // ora (sr,S),Y
		case 0x15: return new ora.$15();  // ora dp,X
		case 0x17: return new ora.$17();  // ora [dp],Y
		case 0x19: return new ora.$19();  // ora addr,Y
		case 0x1d: return new ora.$1D();  // ora addr,X
		case 0x1f: return new ora.$1F();  // ora long,X

		case 0xf4: return new pea.$F4();  // pea addr
		case 0xd4: return new pei.$D4();  // pei (dp)
		case 0x62: return new per.$62();  // per label
		
		case 0x48: return new pha.$48();  // pha
		case 0x8b: return new phb.$8B();  // phb
		case 0x0b: return new phd.$0B();  // phd
		case 0x4b: return new phk.$4B();  // phk
		case 0x08: return new php.$08();  // php
		case 0xda: return new phx.$DA();  // phx
		case 0x5a: return new phy.$5A();  // phy

		case 0x68: return new pla.$68();  // pla
		case 0xab: return new plb.$AB();  // plb
		case 0x2b: return new pld.$2B();  // pld
		case 0x28: return new plp.$28();  // plp
		case 0xfa: return new plx.$FA();  // plx
		case 0x7a: return new ply.$7A();  // ply

		case 0xc2: return new rep.$C2();  // rep #const

		case 0x2a: return new rol.$2A();  // rol A
		case 0x2e: return new rol.$2E();  // rol addr
		case 0x26: return new rol.$26();  // rol dp
		case 0x3e: return new rol.$3E();  // rol addr,X
		case 0x36: return new rol.$36();  // rol dp,X

		case 0x6a: return new ror.$6A();  // ror A
		case 0x6e: return new ror.$6E();  // ror addr
		case 0x66: return new ror.$66();  // ror dp
		case 0x7e: return new ror.$7E();  // ror addr,X
		case 0x76: return new ror.$76();  // ror dp,X
		
		case 0x40: return new rti.$40();  // rti
		case 0x6b: return new rtl.$6B();  // rtl
		case 0x60: return new rts.$60();  // rts

		case 0xe1: return new sbc.$E1();  // sbc (dp,X)
		case 0xe3: return new sbc.$E3();  // sbc sr,S
		case 0xe5: return new sbc.$E5();  // sbc dp
		case 0xe7: return new sbc.$E7();  // sbc [dp]
		case 0xe9: return new sbc.$E9();  // sbc #const
		case 0xed: return new sbc.$ED();  // sbc addr
		case 0xef: return new sbc.$EF();  // sbc long
		case 0xf1: return new sbc.$F1();  // sbc (dp),Y
		case 0xf2: return new sbc.$F2();  // sbc (dp)
		case 0xf3: return new sbc.$F3();  // sbc (sr,S),Y
		case 0xf5: return new sbc.$F5();  // sbc dp,X
		case 0xf7: return new sbc.$F7();  // sbc [dp],Y
		case 0xf9: return new sbc.$F9();  // sbc addr,Y
		case 0xfd: return new sbc.$FD();  // sbc addr,X
		case 0xff: return new sbc.$FF();  // sbc long,X

		case 0x38: return new sec.$38();  // sec
		case 0xf8: return new sed.$F8();  // sed
		case 0x78: return new sei.$78();  // sei

		case 0xe2: return new sep.$E2();  // sep #const 

		case 0x81: return new sta.$81();  // sta (dp,X)
		case 0x83: return new sta.$83();  // sta sr,S
		case 0x85: return new sta.$85();  // sta dp
		case 0x87: return new sta.$87();  // sta [dp]
		case 0x8d: return new sta.$8D();  // sta addr
		case 0x8f: return new sta.$8F();  // sta long
		case 0x91: return new sta.$91();  // sta (dp),Y
		case 0x92: return new sta.$92();  // sta (dp)
		case 0x93: return new sta.$93();  // sta (sr,S),Y
		case 0x95: return new sta.$95();  // sta _dp_X
		case 0x97: return new sta.$97();  // sta [dp],Y
		case 0x99: return new sta.$99();  // sta addr,Y
		case 0x9d: return new sta.$9D();  // sta addr,X
		case 0x9f: return new sta.$9F();  // sta long,X

		case 0xdb: return new stp.$DB();  // stp

		case 0x86: return new stx.$86();  // stx dp
		case 0x8e: return new stx.$8E();  // stx addr
		case 0x96: return new stx.$96();  // stx dp,Y
		case 0x84: return new sty.$84();  // sty dp
		case 0x8c: return new sty.$8C();  // sty addr
		case 0x94: return new sty.$94();  // sty dp,X

		case 0x64: return new stz.$64();  // stz dp
		case 0x74: return new stz.$74();  // stz dp,X
		case 0x9c: return new stz.$9C();  // stz addr
		case 0x9e: return new stz.$9E();  // stz addr,X

		case 0xaa: return new tax.$AA();  // tax
		case 0xa8: return new tay.$A8();  // tay
		case 0x5b: return new tcd.$5B();  // tcd
		case 0x1b: return new tcs.$1B();  // tcs
		case 0x7b: return new tdc.$7B();  // tdc

		case 0x14: return new trb.$14();  // trb dp
		case 0x1c: return new trb.$1C();  // trb addr
		case 0x04: return new tsb.$04();  // tsb dp
		case 0x0c: return new tsb.$0C();  // tsb addr

		case 0x3b: return new tsc.$3B();  // tsc
		case 0xba: return new tsx.$BA();  // tsx
		case 0x8a: return new txa.$8A();  // txa
		case 0x9a: return new txs.$9A();  // txs
		case 0x9b: return new txy.$9B();  // txy
		case 0x98: return new tya.$98();  // tya
		case 0xbb: return new tyx.$BB();  // tyx
		
		case 0xcb: return new wai.$CB();  // wai

		case 0x42: return new wdm.$42();  // wdm

		case 0xeb: return new xba.$EB();  // xba
		case 0xfb: return new xce.$FB();  // xce
	}

	unreachable();
}
