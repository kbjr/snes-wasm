
# CPU Instructions

- [Add With Carry (`adc`)](#adc)
- [And Accumulator with Memory (`and`)](#and)
- [Shift Memory or Accumulator Left (`asl`)](#asl)
- [Branch if Carry Clear (`bcc`)](#bcc)
- [Branch if Carry Set (`bcs`)](#bcs)
- [Branch if Equal (`beq`)](#beq)
- [Branch if Minus (`bmi`)](#bmi)
- [Branch if Not Equal (`bne`)](#bne)
- [Branch if Plus (`bpl`)](#bpl)
- [Branch Always (`bra`)](#bra)
- [Branch Always Long (`brl`)](#brl)
- [Branch if Overflow Clear (`bvc`)](#bvc)
- [Branch if Overflow Set (`bvs`)](#bvs)






## `adc`

**Add With Carry**

Adds operand to the Accumulator; adds an additional 1 if `C` is set

#### Affected Flags

```
NV----ZC-
```

#### Modes

| OpCode | Syntax         | Addressing                          | Bytes  | Cycles        |
|--------|----------------|-------------------------------------|--------|---------------|
| `0x61` | `and (dp,X)`   | Direct Page Indirect Indexed,X      | 2      | 6 [1],[2]     |
| `0x63` | `and sr,S`     | Stack Relative                      | 2      | 4 [1]         |
| `0x65` | `and dp`       | Direct Page                         | 2      | 3 [1],[2]     |
| `0x67` | `and [dp]`     | Direct Page Indirect Long           | 2      | 6 [1],[2]     |
| `0x69` | `and #const`   | Immediate                           | 2 [3]  | 2 [1]         |
| `0x6D` | `and addr`     | Absolute                            | 3      | 4 [1]         |
| `0x6F` | `and long`     | Absolute Long                       | 4      | 5 [1]         |
| `0x71` | `and (dp),Y`   | Direct Page Indirect Indexed,Y      | 2      | 5 [1],[2],[4] |
| `0x72` | `and (dp)`     | Direct Page Indirect                | 2      | 5 [1],[2]     |
| `0x73` | `and (sr,S),Y` | Stack Relative Indirect Indexed,Y   | 2      | 7 [1]         |
| `0x75` | `and dp,X`     | Direct Page Indexed,X               | 2      | 4 [1],[2]     |
| `0x77` | `and [dp],Y`   | Direct Page Indirect Long Indexed,Y | 2      | 6 [1],[2]     |
| `0x79` | `and addr,Y`   | Absolute Indexed,Y                  | 3      | 4 [1],[4]     |
| `0x7D` | `and addr,X`   | Absolute Indexed,X                  | 3      | 4 [1],[4]     |
| `0x7F` | `and long,X`   | Absolute Long Indexed,X             | 4      | 5 [1]         |

- [1]: Add 1 cycle if M = 0
- [2]: Add 1 cycle if low byte of D is non-zero
- [3]: Add 1 byte if M = 0
- [4]: Add 1 cycle if adding index crosses a page boundary or X = 0 (16-bit index registers)





## `and`

**And Accumulator with Memory**

Perform a bitwise logical AND of the contents at the effective address against the
Accumulator. In 8-bit mode (M = 1) or Emulation mode (E = 1), the data from the
effective address is 1 byte, and it is OR'ed against the low byte of the Accumulator (A).

Otherwise, both the data and Accumulator are 16-bit.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax         | Addressing                  | Bytes | Cycles     |
|--------|----------------|-----------------------------|-------|------------|
| `0x21` | `and (dp,X)`   | DP Indexed Indirect, X      | 2     | 6 [2],[3]  |
| `0x23` | `and sr,S`     | Stack Relative              | 2     | 4 [2]      |
| `0x25` | `and dp`       | Direct Page                 | 2     | 3 [2],[3]  |
| `0x27` | `and [dp]`     | DP Indirect Long            | 2     | 6 [2],[3]  |
| `0x29` | `and #const`   | Immediate                   | 2 [1] | 2 [2]      |
| `0x2D` | `and addr`     | Absolute                    | 3     | 4 [2]      |
| `0x2F` | `and long`     | Absolute Long               | 4     | 5 [2]      |
| `0x31` | `and (dp),Y`   | DP Indirect Indexed, Y      | 2     | 5 [2],[3]  |
| `0x32` | `and (dp)`     | DP Indirect                 | 2     | 5 [2],[3]  |
| `0x33` | `and (sr,S),Y` | SR Indirect Indexed, Y      | 2     | 7 [2]      |
| `0x35` | `and dp,X`     | DP Indexed, X               | 2     | 4 [2],[3]  |
| `0x37` | `and [dp],Y`   | DP Indirect Long Indexed, Y | 2     | 6 [2],[3]  |
| `0x39` | `and addr,Y`   | Absolute Indexed,Y          | 3     | 4 [2],[4]  |
| `0x3D` | `and addr,X`   | Absolute Indexed, X         | 3     | 4 [2],[4]  |
| `0x3F` | `and long,X`   | Absolute Long Indexed, X    | 4     | 5 [2]      |

- [1]: Add 1 byte if m = 0 (16-bit memory/accumulator)
- [2]: Add 1 cycle if m = 0 (16-bit memory/accumulator)
- [3]: Add 1 cycle if low byte of Direct Page register is not zero
- [4]: Add 1 cycle if adding index crosses a page boundary





## `asl`

**Shift Memory or Accumulator Left**

Shift the memory or accumulator reference by the operand left 1 bit. In 8-bit mode (M = 1)
or Emulation mode (E = 1), the data shifted is 1 byte. Otherwise, the data is 16-bit.

#### Affected Flags

```
N-----ZC-
```

#### Modes

| OpCode | Syntax       | Addressing                  | Bytes | Cycles     |
|--------|--------------|-----------------------------|-------|------------|
| `0x06` | `asl dp`     | Direct Page                 | 2     | 5 [1],[2]  |
| `0x0A` | `asl A`      | Accumulator                 | 1     | 2 [1]      |
| `0x0E` | `asl addr`   | Absolute                    | 3     | 6 [1]      |
| `0x16` | `asl dp,X`   | DP Indexed, X               | 2     | 6 [1],[2]  |
| `0x1E` | `asl addr,X` | Absolute Indexed, X         | 3     | 4 [1]      |

- [1]: Add 2 cycle if M = 0 (16-bit memory/accumulator)
- [2]: Add 1 cycle if low byte of Direct Page register is not zero





## `bcc`

**Branch if Carry Clear**

Takes a branch if the Carry (`C`) Processor Status flag is clear. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax          | Addressing               | Bytes | Cycles     |
|--------|-----------------|--------------------------|-------|------------|
| `0x90` | `bcc nearlabel` | Program Counter Relative | 2     | 2 [1],[2]  |

- [1]: Add 1 extra cycle if branch is taken
- [2]: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary





## `bcs`

**Branch if Carry Set**

Takes a branch if the Carry (`C`) Processor Status flag is set. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax        | Addressing               | Bytes | Cycles     |
|--------|---------------|--------------------------|-------|------------|
| 0xB0   | bcs nearlabel | Program Counter Relative | 2     | 2 [1],[2]  |




## `beq`

**Branch if Equal**

Takes a branch if the Zero (`Z`) Processor Status flag is set. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax        | Addressing               | Bytes | Cycles     |
|--------|---------------|--------------------------|-------|------------|
| 0xF0   | beq nearlabel | Program Counter Relative | 2     | 2 [1],[2]  |




## `bmi`

**Branch if Minus**

Takes a branch if the Negative (`N`) Processor Status flag is set. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax        | Addressing               | Bytes | Cycles     |
|--------|---------------|--------------------------|-------|------------|
| 0x30   | bmi nearlabel | Program Counter Relative | 2     | 2 [1],[2]  |




## `bne`

**Branch if Not Equal**

Takes a branch if the Zero (`Z`) Processor Status flag is clear. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax        | Addressing               | Bytes | Cycles     |
|--------|---------------|--------------------------|-------|------------|
| 0xD0   | bne nearlabel | Program Counter Relative | 2     | 2 [1],[2]  |




## `bpl`

**Branch if Plus**

Takes a branch if the Negative (`N`) Processor Status flag is clear. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax        | Addressing               | Bytes | Cycles     |
|--------|---------------|--------------------------|-------|------------|
| 0x10   | bpl nearlabel | Program Counter Relative | 2     | 2 [1],[2]  |




## `bra`

**Branch Always**

Takes a branch.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax        | Addressing               | Bytes | Cycles     |
|--------|---------------|--------------------------|-------|------------|
| 0x80   | bra nearlabel | Program Counter Relative | 2     | 3 [1]      |




## `brl`

**Branch Always Long**

Takes a branch with a 2-byte operand.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax        | Addressing                    | Bytes | Cycles     |
|--------|---------------|-------------------------------|-------|------------|
| 0x82   | brl nearlabel | Program Counter Relative Long | 3     | 4 [1]      |




## `bvc`

**Branch if Overflow Clear**

Takes a branch if the Overflow (`V`) Processor Status flag is clear. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax        | Addressing               | Bytes | Cycles     |
|--------|---------------|--------------------------|-------|------------|
| 0x50   | bvc nearlabel | Program Counter Relative | 2     | 2 [1],[2]  |




## `bvs`

**Branch if Overflow Set**

Takes a branch if the Overflow (`V`) Processor Status flag is set. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax        | Addressing               | Bytes | Cycles     |
|--------|---------------|--------------------------|-------|------------|
| 0x70   | bvs nearlabel | Program Counter Relative | 2     | 2 [1],[2]  |








