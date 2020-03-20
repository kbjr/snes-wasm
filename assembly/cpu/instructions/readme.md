
# CPU Instructions

| ASM   | Instruction                                              | Modes |
|-------|----------------------------------------------------------|-------|
| `adc` | [Add With Carry](./adc#readme)                           | 15    |
| `and` | [And Accumulator with Memory](./and#readme)              | 15    |
| `asl` | [Shift Memory or Accumulator Left](./asl#readme)         | 5     |
| `bcc` | [Branch if Carry Clear](./b__#bcc)                       | 1     |
| `bcs` | [Branch if Carry Set](./b__#bcs)                         | 1     |
| `beq` | [Branch if Equal](./b__#beq)                             | 1     |
| `bmi` | [Branch if Minus](./b__#bmi)                             | 1     |
| `bne` | [Branch if Not Equal](./b__#bne)                         | 1     |
| `bpl` | [Branch if Plus](./b__#bpl)                              | 1     |
| `bra` | [Branch Always](./b__#bra)                               | 1     |
| `brl` | [Branch Always Long](./b__#brl)                          | 1     |
| `bvc` | [Branch if Overflow Clear](./b__#bvc)                    | 1     |
| `bvs` | [Branch if Overflow Set](./b__#bvs)                      | 1     |
| `bit` | [Test Memory Bits Against Accumulator](./bit#readme)     | 5     |
| `brk` | [Software Break](./brk#readme)                           | 1     |
| `clc` | [Clear Carry](./cl_#clc)                                 | 1     |
| `cld` | [Clear Decimal](./cl_#cld)                               | 1     |
| `cli` | [Clear IRQ Disable](./cl_#cli)                           | 1     |
| `clv` | [Clear Overflow](./cl_#clv)                              | 1     |
| `cmp` |                                                          | 15    |
| `cop` |                                                          | 1     |
| `cpx` |                                                          | 3     |
| `cpy` |                                                          | 3     |
| `dec` |                                                          | 5     |
| `dex` |                                                          | 1     |
| `dey` |                                                          | 1     |
| `eor` |                                                          | 15    |
| `inc` |                                                          | 5     |
| `inx` |                                                          | 1     |
| `iny` |                                                          | 1     |
| `jmp` |                                                          | 5     |
| `jsr` |                                                          | 3     |
| `lda` |                                                          | 15    |
| `ldx` |                                                          | 5     |
| `ldy` |                                                          | 5     |
| `lsr` |                                                          | 5     |
| `mvn` | [Block Move Next](./mv_#mvn)                             | 1     |
| `mvp` | [Block Move Previous](./mv_#mvp)                         | 1     |
| `nop` | [No Operation](./nop#readme)                             | 1     |
| `ora` | [OR Accumulator with Memory](./ora#readme)               | 15    |
| `pea` | [Push Effective Absolute Address](./ph_#pea)             | 1     |
| `pei` | [Push Effective Indirect Address](./ph_#pei)             | 1     |
| `per` | [Push Effective PC Relative Indirect Address](./ph_#per) | 1     |
| `pha` | [Push Accumulator](./ph_#pha)                            | 1     |
| `phb` | [Push Data Bank Register](./ph_#phb)                     | 1     |
| `phd` | [Push Direct Page Register](./ph_#phd)                   | 1     |
| `phk` | [Push Program Bank Register](./ph_#phk)                  | 1     |
| `php` | [Push Processor Status Register](./ph_#php)              | 1     |
| `phx` | [Push X Index Register](./ph_#phx)                       | 1     |
| `phy` | [Push Y Index Register](./ph_#phy)                       | 1     |
| `pla` | [Pull Accumulator](./pl_#pla)                            | 1     |
| `plb` | [Pull Data Bank Register](./pl_#plb)                     | 1     |
| `pld` | [Pull Direct Page Register](./pl_#pld)                   | 1     |
| `plp` | [Pull Status Flags](./pl_#plp)                           | 1     |
| `plx` | [Pull Index X Register](./pl_#plx)                       | 1     |
| `ply` | [Pull Index Y Register](./pl_#ply)                       | 1     |
| `rep` | [Reset Processor status bits](./rep#readme)              | 1     |
| `rol` |                                                          | 5     |
| `ror` |                                                          | 5     |
| `rti` |                                                          | 1     |
| `rtl` |                                                          | 1     |
| `rts` |                                                          | 1     |
| `sbc` |                                                          | 15    |
| `sec` |                                                          | 1     |
| `sed` |                                                          | 1     |
| `sei` |                                                          | 1     |
| `sep` |                                                          | 1     |
| `sta` |                                                          | 14    |
| `stp` |                                                          | 1     |
| `stx` |                                                          | 3     |
| `sty` |                                                          | 3     |
| `stz` |                                                          | 4     |
| `tax` |                                                          | 1     |
| `tay` |                                                          | 1     |
| `tcd` |                                                          | 1     |
| `tcs` |                                                          | 1     |
| `tdc` |                                                          | 1     |
| `trb` |                                                          | 2     |
| `tsb` |                                                          | 2     |
| `tsc` |                                                          | 1     |
| `tsx` |                                                          | 1     |
| `txa` |                                                          | 1     |
| `txs` |                                                          | 1     |
| `txy` |                                                          | 1     |
| `tya` |                                                          | 1     |
| `tyx` |                                                          | 1     |
| `wai` | [Wait for Interrupt](./wai#readme)                       | 1     |
| `wdm` | [Reserved for Future Expansion](./wdm#readme)            | 1     |
| `xba` | [Exchange B and A Accumulators](./xba#readme)            | 1     |
| `xce` | [Exchange Carry with Emulation bit](./xce#readme)        | 1     |
