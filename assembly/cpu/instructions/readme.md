
# CPU Instructions

| ASM   | Instruction                                                        | Modes |
|-------|--------------------------------------------------------------------|-------|
| `adc` | [Add With Carry](./adc#readme)                                     | 15    |
| `and` | [And Accumulator with Memory](./and#readme)                        | 15    |
| `asl` | [Shift Memory or Accumulator Left](./asl#readme)                   | 5     |
| `bcc` | [Branch if Carry Clear](./b__#bcc)                                 | 1     |
| `bcs` | [Branch if Carry Set](./b__#bcs)                                   | 1     |
| `beq` | [Branch if Equal](./b__#beq)                                       | 1     |
| `bmi` | [Branch if Minus](./b__#bmi)                                       | 1     |
| `bne` | [Branch if Not Equal](./b__#bne)                                   | 1     |
| `bpl` | [Branch if Plus](./b__#bpl)                                        | 1     |
| `bra` | [Branch Always](./b__#bra)                                         | 1     |
| `brl` | [Branch Always Long](./b__#brl)                                    | 1     |
| `bvc` | [Branch if Overflow Clear](./b__#bvc)                              | 1     |
| `bvs` | [Branch if Overflow Set](./b__#bvs)                                | 1     |
| `bit` | [Test Memory Bits Against Accumulator](./bit#readme)               | 5     |
| `brk` | [Software Break](./brk#readme)                                     | 1     |
| `clc` | [Clear Carry](./cl_#clc)                                           | 1     |
| `cld` | [Clear Decimal](./cl_#cld)                                         | 1     |
| `cli` | [Clear IRQ Disable](./cl_#cli)                                     | 1     |
| `clv` | [Clear Overflow](./cl_#clv)                                        | 1     |
| `cmp` | [Compare Accumulator with Memory](./cmp)                           | 15    |
| `cop` | [Co-Processor Enable](./cop#readme)                                | 1     |
| `cpx` | [Compare Index Register X with Memory](./cp_#cpx)                  | 3     |
| `cpy` | [Compare Index Register Y with Memory](./cp_#cpy)                  | 3     |
| `dec` | [Decrement](./de_#dec)                                             | 5     |
| `dex` | [Decrement Index Register X](./de_#dex)                            | 1     |
| `dey` | [Decrement Index Register Y](./de_#dey)                            | 1     |
| `eor` | [Exclusive-OR Accumulator with Memory](./eor#readme)               | 15    |
| `inc` | [Increment](./in_#inc)                                             | 5     |
| `inx` | [Increment Index Register X](./in_#inx)                            | 1     |
| `iny` | [Increment Index Register Y](./in_#iny)                            | 1     |
| `jmp` | [Jump](./jmp#readme)                                               | 5     |
| `jsr` | [Jump to Subroutine](./jsr#readme)                                 | 3     |
| `lda` | [Load Accumulator from Memory](./lda#readme)                       | 15    |
| `ldx` | [Load Index Register X from Memory](./ld_#ldx)                     | 5     |
| `ldy` | [Load Index Register Y from Memory](./ld_#ldy)                     | 5     |
| `lsr` | [Logical Shift Memory or Accumulator Right](./lsr#readme)          | 5     |
| `mvn` | [Block Move Next](./mv_#mvn)                                       | 1     |
| `mvp` | [Block Move Previous](./mv_#mvp)                                   | 1     |
| `nop` | [No Operation](./nop#readme)                                       | 1     |
| `ora` | [OR Accumulator with Memory](./ora#readme)                         | 15    |
| `pea` | [Push Effective Absolute Address](./ph_#pea)                       | 1     |
| `pei` | [Push Effective Indirect Address](./ph_#pei)                       | 1     |
| `per` | [Push Effective PC Relative Indirect Address](./ph_#per)           | 1     |
| `pha` | [Push Accumulator](./ph_#pha)                                      | 1     |
| `phb` | [Push Data Bank Register](./ph_#phb)                               | 1     |
| `phd` | [Push Direct Page Register](./ph_#phd)                             | 1     |
| `phk` | [Push Program Bank Register](./ph_#phk)                            | 1     |
| `php` | [Push Processor Status Register](./ph_#php)                        | 1     |
| `phx` | [Push X Index Register](./ph_#phx)                                 | 1     |
| `phy` | [Push Y Index Register](./ph_#phy)                                 | 1     |
| `pla` | [Pull Accumulator](./pl_#pla)                                      | 1     |
| `plb` | [Pull Data Bank Register](./pl_#plb)                               | 1     |
| `pld` | [Pull Direct Page Register](./pl_#pld)                             | 1     |
| `plp` | [Pull Status Flags](./pl_#plp)                                     | 1     |
| `plx` | [Pull Index X Register](./pl_#plx)                                 | 1     |
| `ply` | [Pull Index Y Register](./pl_#ply)                                 | 1     |
| `rep` | [Reset Processor status bits](./rep#readme)                        | 1     |
| `rol` | [Rotate Memory or Accumulator Left](./rol#readme)                  | 5     |
| `ror` | [Rotate Memory or Accumulator Right](./ror#readme)                 | 5     |
| `rti` | [Return from Interupt](./rt_#rti)                                  | 1     |
| `rtl` | [Return from Subroutine Long](./rt_#rtl)                           | 1     |
| `rts` | [Return from Subroutine](./rt_#rts)                                | 1     |
| `sbc` | [Subtract with Borrow](./sbc)                                      | 15    |
| `sec` | [Set Carry Flag](./se_#sec)                                        | 1     |
| `sed` | [Set Decimal Mode Flag](./se_#sed)                                 | 1     |
| `sei` | [Set Interrupt Disable Flag](./se_#sei)                            | 1     |
| `sep` | [Set Processor status bits](./se_#sep)                             | 1     |
| `sta` | [Store Accumulator to Memory](./sta#readme)                        | 14    |
| `stp` | [Stop the Processor](./stp#readme)                                 | 1     |
| `stx` | [Store Index Register X to Memory](./st_#stx)                      | 3     |
| `sty` | [Store Index Register Y to Memory](./st_#sty)                      | 3     |
| `stz` | [Store Zero to Memory](./st_#stz)                                  | 4     |
| `tax` | [Transfer Accumulator to Index Register X](./t__#tax)              | 1     |
| `tay` | [Transfer Accumulator to Index Register Y](./t__#tay)              | 1     |
| `tcd` | [Transfer 16-bit Accumulator to Direct Page Register](./t__#tcd)   | 1     |
| `tcs` | [Transfer Accumulator to Stack Pointer Register](./t__#tcs)        | 1     |
| `tdc` | [Transfer Direct Page Register to 16-bit Accumulator](./t__#tdc)   | 1     |
| `trb` |                                                                    | 2     |
| `tsb` |                                                                    | 2     |
| `tsc` | [Transfer Stack Pointer Register to 16-bit Accumulator](./t__#tsc) | 1     |
| `tsx` | [Transfer Stack Pointer to Index Register X](./t__#tsx)            | 1     |
| `txa` | [Transfer Index Register X to Accumulator](./t__#txa)              | 1     |
| `txs` | [Transfer Index Register X to Stack Pointer](./t__#txs)            | 1     |
| `txy` | [Transfer Index Register X to Y](./t__#txy)                        | 1     |
| `tya` | [Transfer Index Register Y to Accumulator](./t__#tya)              | 1     |
| `tyx` | [Transfer Index register Y to X](./t__#tyx)                        | 1     |
| `wai` | [Wait for Interrupt](./wai#readme)                                 | 1     |
| `wdm` | [Reserved for Future Expansion](./wdm#readme)                      | 1     |
| `xba` | [Exchange B and A Accumulators](./xba#readme)                      | 1     |
| `xce` | [Exchange Carry with Emulation bit](./xce#readme)                  | 1     |
