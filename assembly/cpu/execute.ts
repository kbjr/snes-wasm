
import { addr_immediate_u8 } from './addressing';

import { adc } from './instructions/adc';

export function executeInstruction() : void {
	const opcode: u8 = addr_immediate_u8();

	switch (opcode) {
		case 0x61: adc.$61(); break;  // adc (dp,X)
		case 0x63: adc.$63(); break;  // adc sr,s
		case 0x65: adc.$65(); break;  // adc dp
		case 0x67: adc.$65(); break;  // adc [dp]
		case 0x69: adc.$65(); break;  // adc #const
		case 0x6d: adc.$6D(); break;  // adc addr
		case 0x6f: adc.$6F(); break;  // adc long
		case 0x71: adc.$71(); break;  // adc (dp),Y
		case 0x72: adc.$72(); break;  // adc (dp)
		case 0x73: adc.$73(); break;  // adc (sr,S),Y
		case 0x75: adc.$75(); break;  // adc dp,X
		case 0x77: adc.$77(); break;  // adc [dp],Y
		case 0x79: adc.$79(); break;  // adc addr,Y
		case 0x7d: adc.$7D(); break;  // adc addr,X
		case 0x7f: adc.$7F(); break;  // adc long,X

		// case 0x21: this.and$21(); break;  // and (dp,X)
		// case 0x23: this.and$23(); break;  // and sr,S
		// case 0x25: this.and$25(); break;  // and dp
		// case 0x27: this.and$27(); break;  // and [dp]
		// case 0x29: this.and$29(); break;  // and #const
		// case 0x2d: this.and$2D(); break;  // and addr
		// case 0x2f: this.and$2F(); break;  // and long
		// case 0x31: this.and$31(); break;  // and (dp),Y
		// case 0x32: this.and$32(); break;  // and (dp)
		// case 0x33: this.and$33(); break;  // and (sr,S),Y
		// case 0x35: this.and$35(); break;  // and dp,X
		// case 0x37: this.and$37(); break;  // and [dp],Y
		// case 0x39: this.and$39(); break;  // and addr,Y
		// case 0x3d: this.and$3D(); break;  // and addr,X
		// case 0x3f: this.and$3F(); break;  // and long,X

		// case 0x06: this.asl$06(); break;  // asl dp
		// case 0x0a: this.asl$0A(); break;  // asl A
		// case 0x0e: this.asl$0E(); break;  // asl addr
		// case 0x16: this.asl$16(); break;  // asl dp,X
		// case 0x1e: this.asl$1E(); break;  // asl addr,X

		// case 0x90: this.bcc$90(); break;  // bcc nearlabel
		// case 0xb0: this.bcs$B0(); break;  // bcs nearlabel
		// case 0xf0: this.beq$F0(); break;  // beq nearlabel

		// case 0x24: this.bit$24(); break;  // bit dp
		// case 0x2c: this.bit$2C(); break;  // bit addr
		// case 0x34: this.bit$34(); break;  // bit dp,X
		// case 0x3c: this.bit$3C(); break;  // bit addr,X
		// case 0x89: this.bit$89(); break;  // bit #const

		// case 0x30: this.bmi$30(); break;  // bmi nearlabel
		// case 0xd0: this.bne$D0(); break;  // bne nearlabel
		// case 0x10: this.bpl$10(); break;  // bpl nearlabel
		// case 0x80: this.bra$80(); break;  // bra nearlabel

		// case 0x00: this.brk$00(); break;  // brk

		// case 0x82: this.brl$82(); break;  // brl label
		// case 0x50: this.bvc$50(); break;  // bvc nearlabel
		// case 0x70: this.bvs$70(); break;  // bvs nearlabel
		
		// case 0x18: this.clc$18(); break;  // clc
		// case 0xd8: this.cld$D8(); break;  // cld
		// case 0x58: this.cli$58(); break;  // cli
		// case 0xb8: this.clv$B8(); break;  // clv

		// case 0xc1: this.cmp$C1(); break;  // cmp (dp,X)
		// case 0xc3: this.cmp$C3(); break;  // cmp sr,S
		// case 0xc5: this.cmp$C5(); break;  // cmp dp
		// case 0xc7: this.cmp$C7(); break;  // cmp [dp]
		// case 0xc9: this.cmp$C9(); break;  // cmp #const
		// case 0xcd: this.cmp$CD(); break;  // cmp addr
		// case 0xcf: this.cmp$CF(); break;  // cmp long
		// case 0xd1: this.cmp$D1(); break;  // cmp (dp),Y
		// case 0xd2: this.cmp$D2(); break;  // cmp (dp)
		// case 0xd3: this.cmp$D3(); break;  // cmp (sr,S),Y
		// case 0xd5: this.cmp$D5(); break;  // cmp dp,X
		// case 0xd7: this.cmp$D7(); break;  // cmp [dp],Y
		// case 0xd9: this.cmp$D9(); break;  // cmp addr,Y
		// case 0xdd: this.cmp$DD(); break;  // cmp addr,X
		// case 0xdf: this.cmp$DF(); break;  // cmp long,X

		// case 0x02: this.cop$02(); break;  // cop const

		// case 0xe0: this.cpx$E0(); break;  // cpx #const
		// case 0xe4: this.cpx$E4(); break;  // cpx dp
		// case 0xec: this.cpx$EC(); break;  // cpx addr
		// case 0xc0: this.cpy$C0(); break;  // cpy #const
		// case 0xc4: this.cpy$C4(); break;  // cpy dp
		// case 0xcc: this.cpy$CC(); break;  // cpy addr

		// case 0x3a: this.dec$3A(); break;  // dec A
		// case 0xc6: this.dec$C6(); break;  // dec dp
		// case 0xce: this.dec$CE(); break;  // dec addr
		// case 0xd6: this.dec$D6(); break;  // dec dp,X
		// case 0xde: this.dec$DE(); break;  // dec addr,X
		// case 0xca: this.dex$CA(); break;  // dex
		// case 0x88: this.dey$88(); break;  // dey

		// case 0x41: this.eor$41(); break;  // eor (dp,X)
		// case 0x43: this.eor$43(); break;  // eor sr,S
		// case 0x45: this.eor$45(); break;  // eor dp
		// case 0x47: this.eor$47(); break;  // eor [dp]
		// case 0x49: this.eor$49(); break;  // eor #const
		// case 0x4d: this.eor$4D(); break;  // eor addr
		// case 0x4f: this.eor$4F(); break;  // eor long
		// case 0x51: this.eor$51(); break;  // eor (dp),Y
		// case 0x52: this.eor$52(); break;  // eor (dp)
		// case 0x53: this.eor$53(); break;  // eor (sr,S),Y
		// case 0x55: this.eor$55(); break;  // eor dp,X
		// case 0x57: this.eor$57(); break;  // eor [dp],Y
		// case 0x59: this.eor$59(); break;  // eor addr,Y
		// case 0x5d: this.eor$5D(); break;  // eor addr,X
		// case 0x5f: this.eor$5F(); break;  // eor long,X

		// case 0x1a: this.inc$1A(); break;  // inc A
		// case 0xe6: this.inc$E6(); break;  // inc dp
		// case 0xee: this.inc$EE(); break;  // inc addr
		// case 0xf6: this.inc$F6(); break;  // inc dp,X
		// case 0xfe: this.inc$FE(); break;  // inc addr,X
		// case 0xe8: this.inx$E8(); break;  // inx
		// case 0xc8: this.iny$C8(); break;  // iny

		// case 0x4c: this.jmp$4C(); break;  // jmp addr
		// case 0x5c: this.jmp$5C(); break;  // jmp long
		// case 0x6c: this.jmp$6C(); break;  // jmp (addr)
		// case 0x7c: this.jmp$7C(); break;  // jmp (addr,X)
		// case 0xdc: this.jmp$DC(); break;  // jmp [addr]

		// case 0x20: this.jsr$20(); break;  // jsr addr
		// case 0x22: this.jsr$22(); break;  // jsr long
		// case 0xfc: this.jsr$FC(); break;  // jsr (addr,X))

		// case 0xa1: this.lda$A1(); break;  // lda (dp,X)
		// case 0xa3: this.lda$A3(); break;  // lda sr,S
		// case 0xa5: this.lda$A5(); break;  // lda dp
		// case 0xa7: this.lda$A7(); break;  // lda [dp]
		// case 0xa9: this.lda$A9(); break;  // lda #const
		// case 0xad: this.lda$AD(); break;  // lda addr
		// case 0xaf: this.lda$AF(); break;  // lda long
		// case 0xb1: this.lda$B1(); break;  // lda (dp),Y
		// case 0xb2: this.lda$B2(); break;  // lda (dp)
		// case 0xb3: this.lda$B3(); break;  // lda (sr,S),Y
		// case 0xb5: this.lda$B5(); break;  // lda dp,X
		// case 0xb7: this.lda$B7(); break;  // lda [dp],Y
		// case 0xb9: this.lda$B9(); break;  // lda addr,Y
		// case 0xbd: this.lda$BD(); break;  // lda addr,X
		// case 0xbf: this.lda$BF(); break;  // lda long,X

		// case 0xa2: this.ldx$A2(); break;  // ldx #const
		// case 0xa6: this.ldx$A6(); break;  // ldx dp
		// case 0xae: this.ldx$AE(); break;  // ldx addr
		// case 0xb6: this.ldx$B6(); break;  // ldx dp,Y
		// case 0xbe: this.ldx$BE(); break;  // ldx addr,Y

		// case 0xa0: this.ldy$A0(); break;  // ldy #const
		// case 0xa4: this.ldy$A4(); break;  // ldy dp
		// case 0xac: this.ldy$AC(); break;  // ldy addr
		// case 0xb4: this.ldy$B4(); break;  // ldy dp,X
		// case 0xbc: this.ldy$BC(); break;  // ldy addr,X

		// case 0x46: this.lsr$46(); break;  // lsr dp
		// case 0x4a: this.lsr$4A(); break;  // lsr A
		// case 0x4e: this.lsr$4E(); break;  // lsr addr
		// case 0x56: this.lsr$56(); break;  // lsr dp,X
		// case 0x5e: this.lsr$5E(); break;  // lsr addr,X

		// case 0x54: this.mvn$54(); break;  // mvn srcbk,destbk
		// case 0x44: this.mvp$44(); break;  // mvp srcbk,destbk

		// case 0xea: this.nop$EA(); break;  // nop

		// case 0x01: this.ora$01(); break;  // ora (dp,X)
		// case 0x03: this.ora$03(); break;  // ora sr,S
		// case 0x05: this.ora$05(); break;  // ora dp
		// case 0x07: this.ora$07(); break;  // ora [dp]
		// case 0x09: this.ora$09(); break;  // ora #const
		// case 0x0d: this.ora$0D(); break;  // ora addr
		// case 0x0f: this.ora$0F(); break;  // ora long
		// case 0x11: this.ora$11(); break;  // ora (dp),Y
		// case 0x12: this.ora$12(); break;  // ora (dp)
		// case 0x13: this.ora$13(); break;  // ora (sr,S),Y
		// case 0x15: this.ora$15(); break;  // ora dp,X
		// case 0x17: this.ora$17(); break;  // ora [dp],Y
		// case 0x19: this.ora$19(); break;  // ora addr,Y
		// case 0x1d: this.ora$1D(); break;  // ora addr,X
		// case 0x1f: this.ora$1F(); break;  // ora long,X

		// case 0xf4: this.pea$F4(); break;  // pea addr
		// case 0xd4: this.pei$D4(); break;  // pei (dp)
		// case 0x62: this.per$62(); break;  // per label
		
		// case 0x48: this.pha$48(); break;  // pha
		// case 0x8b: this.phb$8B(); break;  // phb
		// case 0x0b: this.phd$0B(); break;  // phd
		// case 0x4b: this.phk$4B(); break;  // phk
		// case 0x08: this.php$08(); break;  // php
		// case 0xda: this.phx$DA(); break;  // phx
		// case 0x5a: this.phy$5A(); break;  // phy

		// case 0x68: this.pla$68(); break;  // pla
		// case 0xab: this.plb$AB(); break;  // plb
		// case 0x2b: this.pld$2B(); break;  // pld
		// case 0x28: this.plp$28(); break;  // plp
		// case 0xfa: this.plx$FA(); break;  // plx
		// case 0x7a: this.ply$7A(); break;  // ply

		// case 0xc2: this.rep$C2(); break;  // rep #const

		// case 0x2a: this.rol$2A(); break;  // rol A
		// case 0x2e: this.rol$2E(); break;  // rol addr
		// case 0x26: this.rol$26(); break;  // rol dp
		// case 0x3e: this.rol$3E(); break;  // rol addr,X
		// case 0x36: this.rol$36(); break;  // rol dp,X

		// case 0x6a: this.ror$6A(); break;  // ror A
		// case 0x6e: this.ror$6E(); break;  // ror addr
		// case 0x66: this.ror$66(); break;  // ror dp
		// case 0x7e: this.ror$7E(); break;  // ror addr,X
		// case 0x76: this.ror$76(); break;  // ror dp,X
		
		// case 0x40: this.rti$40(); break;  // rti
		// case 0x6b: this.rtl$6B(); break;  // rtl
		// case 0x60: this.rts$60(); break;  // rts

		// case 0xe1: this.sbc$E1(); break;  // sbc (dp,X)
		// case 0xe3: this.sbc$E3(); break;  // sbc sr,S
		// case 0xe5: this.sbc$E5(); break;  // sbc dp
		// case 0xe7: this.sbc$E7(); break;  // sbc [dp]
		// case 0xe9: this.sbc$E9(); break;  // sbc #const
		// case 0xed: this.sbc$ED(); break;  // sbc addr
		// case 0xef: this.sbc$EF(); break;  // sbc long
		// case 0xf1: this.sbc$F1(); break;  // sbc (dp),Y
		// case 0xf2: this.sbc$F2(); break;  // sbc (dp)
		// case 0xf3: this.sbc$F3(); break;  // sbc (sr,S),Y
		// case 0xf5: this.sbc$F5(); break;  // sbc dp,X
		// case 0xf7: this.sbc$F7(); break;  // sbc [dp],Y
		// case 0xf9: this.sbc$F9(); break;  // sbc addr,Y
		// case 0xfd: this.sbc$FD(); break;  // sbc addr,X
		// case 0xff: this.sbc$FF(); break;  // sbc long,X

		// case 0x38: this.sec$38(); break;  // sec
		// case 0xf8: this.sed$F8(); break;  // sed
		// case 0x78: this.sei$78(); break;  // sei

		// case 0xe2: this.sep$E2(); break;  // sep #const 

		// case 0x81: this.sta$81(); break;  // sta (dp,X)
		// case 0x83: this.sta$83(); break;  // sta sr,S
		// case 0x85: this.sta$85(); break;  // sta dp
		// case 0x87: this.sta$87(); break;  // sta [dp]
		// case 0x8d: this.sta$8D(); break;  // sta addr
		// case 0x8f: this.sta$8F(); break;  // sta long
		// case 0x91: this.sta$91(); break;  // sta (dp),Y
		// case 0x92: this.sta$92(); break;  // sta (dp)
		// case 0x93: this.sta$93(); break;  // sta (sr,S),Y
		// case 0x95: this.sta$95(); break;  // sta _dp_X
		// case 0x97: this.sta$97(); break;  // sta [dp],Y
		// case 0x99: this.sta$99(); break;  // sta addr,Y
		// case 0x9d: this.sta$9D(); break;  // sta addr,X
		// case 0x9f: this.sta$9F(); break;  // sta  long,X

		// case 0xdb: this.stp$DB(); break;  // stp

		// case 0x86: this.stx$86(); break;  // stx dp
		// case 0x8e: this.stx$8E(); break;  // stx addr
		// case 0x96: this.stx$96(); break;  // stx dp,Y
		// case 0x84: this.sty$84(); break;  // sty dp
		// case 0x8c: this.sty$8C(); break;  // sty addr
		// case 0x94: this.sty$94(); break;  // sty dp,X

		// case 0x64: this.stz$64(); break;  // stz dp
		// case 0x74: this.stz$74(); break;  // stz dp,X
		// case 0x9c: this.stz$9C(); break;  // stz addr
		// case 0x9e: this.stz$9E(); break;  // stz addr,X

		// case 0xaa: this.tax$AA(); break;  // tax
		// case 0xa8: this.tay$A8(); break;  // tay
		// case 0x5b: this.tcd$5B(); break;  // tcd
		// case 0x1b: this.tcs$1B(); break;  // tcs
		// case 0x7b: this.tdc$7B(); break;  // tdc

		// case 0x14: this.trb$14(); break;  // trb dp
		// case 0x1c: this.trb$1C(); break;  // trb addr
		// case 0x04: this.tsb$04(); break;  // tsb dp
		// case 0x0c: this.tsb$0C(); break;  // tsb addr

		// case 0x3b: this.tsc$3B(); break;  // tsc
		// case 0xba: this.tsx$BA(); break;  // tsx
		// case 0x8a: this.txa$8A(); break;  // txa
		// case 0x9a: this.txs$9A(); break;  // txs
		// case 0x9b: this.txy$9B(); break;  // txy
		// case 0x98: this.tya$98(); break;  // tya
		// case 0xbb: this.tyx$BB(); break;  // tyx
		
		// case 0xcb: this.wai$CB(); break;  // wai

		// case 0x42: this.wdm$42(); break;  // wdm

		// case 0xeb: this.xba$EB(); break;  // xba
		// case 0xfb: this.xce$FB(); break;  // xce
	}
}
