
# S-CPU (Ricoh 5A22, aka the WDC 65816)

## Basic Info

The 65816 is a 16-bit processor. It uses a 24-bit address bus, allowing for it to map up to 16MB of memory. It also has a 6502 Emulation Mode, that causes it to operate like the 8-bit processor with a 16-bit address bus.




## Internal CPU Registers

### Accumulator (A/B/C)

The accumulator is the math register. It stores one of two operands, or the result of, most arithmetic and logical operations. It is a 16-bit register. The accumulator is usually refered to as `A`, `B`, or `C` depending on which portion of the accumulator is being referred to.

Depending on the mode the CPU is running on, `A` refers to either the low byte, or the full 16 bits.

```
f e d c b a 9 8   7 6 5 4 3 2 1 0
a a a a a a a a   a a a a a a a a    <-- Native Mode
- - - - - - - -   a a a a a a a a    <-- Emulation Mode / 8-Bit Memory Mode
```

Register `B` always refers to the high byte of the accumulator.

```
f e d c b a 9 8   7 6 5 4 3 2 1 0
b b b b b b b b   - - - - - - - -
```

Register `C` always refers to the full 16 bits of the accumulator.

```
f e d c b a 9 8   7 6 5 4 3 2 1 0
c c c c c c c c   c c c c c c c c
```

### X Index Register (X)

The `X` index register is intended for generic use by the programmer. Depending on the values of the Index Size (`X`) and Emulation Mode (`E`) flags, the register will be either 8 or 16 bits.

```
f e d c b a 9 8  7 6 5 4 3 2 1 0
x x x x x x x x  x x x x x x x x    <-- Native Mode
- - - - - - - -  x x x x x x x x    <-- Emulation Mode / 8-bit Index Mode
```

### Y Index Register (Y)

The `Y` index register is intended for generic use by the programmer. Depending on the values of the Index Size (`X`) and Emulation Mode (`E`) flags, the register will be either 8 or 16 bits.

```
f e d c b a 9 8  7 6 5 4 3 2 1 0
y y y y y y y y  y y y y y y y y    <-- Native Mode
- - - - - - - -  y y y y y y y y    <-- Emulation Mode / 8-bit Index Mode
```

### Direct Page Register (D)

The Direct Page (`D`) register holds a 16-bit address (always in bank `$00`) relative to which Direct Page addressing modes are resolved.

```
f e d c b a 9 8  7 6 5 4 3 2 1 0
d d d d d d d d  d d d d d d d d
```

### Stack Pointer Register (S)

The `S` stack pointer register points to the next available (unused) location on the stack. The stack is always located in bank `$00`. In Emulation mode (`E`), the stack pointer is 8 bits and always points to page 1. In Native mode, it is 16 bits.

```
f e d c b a 9 8  7 6 5 4 3 2 1 0
s s s s s s s s  s s s s s s s s    <-- Native Mode
- - - - - - - -  s s s s s s s s    <-- Emulation Mode
```

### Program Counter Register (PC)

The `PC` program counter register holds a 16-bit address, pointing to the current instruction. The bank for the `PC` is found in the `PBR` register.

```
f e d c b a 9 8  7 6 5 4 3 2 1 0
p p p p p p p p  p p p p p p p p
```

### Data Bank Register (DBR)

The `DBR` data bank register holds the default bank for all addressing modes that do not otherwise specify a bank. It is always 8 bits.

```
7 6 5 4 3 2 1 0
d d d d d d d d
```

### Program Bank Register (PBR)

The `PBR` program bank register holds the bank byte for the Program Counter (`PC`). It is always 8 bits.

```
7 6 5 4 3 2 1 0
p p p p p p p p
```

### Processor Status Register (P)

The `P` Processor Status Register contains the various Processor Status Flags (see below). The flags and their meanings vary between Emulation mode (`E`) and Native mode.

```
7 6 5 4 3 2 1 0
N V M X D I Z C    <-- Native Mode
N V - B D I Z C    <-- Emulation Mode
```

| Flag  | Name                | Modes            | Values                             |
|-------|---------------------|------------------|------------------------------------|
| `N`   | Negative            | native/emulation | 1 = Negative                       |
| `V`   | Overflow            | native/emulation | 1 = Overflow                       |
| `M`   | Memory size         | native           | 1 = 8-bit / 0 = 16-bit             |
| `X`   | Index register size | native           | 1 = 8-bit / 0 = 16-bit             |
| `B`   | Break               |        emulation | 1 = BRK caused IRQ                 |
| `D`   | Decimal mode        | native/emulation | 1 = Decimal mode / 0 = Binary mode |
| `I`   | IRQ disable         | native/emulation | 1 = Disabled                       |
| `Z`   | Zero                | native/emulation | 1 = Result Zero                    |
| `C`   | Carry               | native/emulation | 1 = Carry                          |





## Processor Status Flags

### Emulation (E)

The `E` emulation status flag is a hidden flag, not normally accessible in the Processor Status Register (`P`). It controls whether the CPU is operating in 6502 Emulation mode (`1`) or in Native mode (`0`). The system always boots in emulation mode.

The only way to access `E` is by using the Exchange Carry with Emulation bit Instruction (`xce`). Using this instruction, `E` and `C` are swapped, allowing you to read/write `E` by swapping and then reading `C`, or by writing `C` before swapping.

### Negative (N)

The `N` negative status flag is set when the high bit of the result of an operation is set.

### Overflow (V)

The `V` overflow status flag is set when a signed overflow occurs during an operation.

### Memory / Accumulator Register Size (M)

Available only in Native mode, the `M` memory size flag controls the size of most memory operations, and the size of the accumulator `A`. When `M` is set, memory is in 8-bit mode. Otherwise, it's 16-bit mode.

### Index Register Size (X)

Available only in Native mode, the `X` index register size flag controls the size of the `X` and `Y` index registers. When `X` is set, the registers are 8 bits. Otherwise, they are 16 bits.

### Break (B)

<!--  -->

### Decimal Mode (D)

The `D` decimal mode flag controls whether the processor is running in Binary Coded Decimal (BCD) mode. When `D` is set, BCD mode is enabled.

### IRQ Disable (I)

The `I` IRQ disable flag controls whether IRQ interupts are disabled.

### Zero (Z)

The `Z` zero flag is set when the result of an operation is zero.

### Carry (C)

The `C` carry flag is set when an unsigned overflow occurs during an operation.





## Additional Info

### CPU Addressing Modes

See: [addressing](./addressing/readme.md)

### CPU Instructions

See: [instructions](./instructions/readme.md)

### Address Bus A/B and Data Bus

See: [../system-bus](../system-bus/readme.md)

### 65816 Programming Manual

A copy of the official WDC 65816 programming manual is located in this directory to provide any additional missing details not covered in this documentation.

See: [wdc_65816_programming_manual.pdf](./wdc_65816_programming_manual.pdf)
