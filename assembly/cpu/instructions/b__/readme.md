
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

<sub>**[1]**: Add 1 extra cycle if branch is taken</sub><br />
<sub>**[2]**: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary</sub><br />





## `bcs`

**Branch if Carry Set**

Takes a branch if the Carry (`C`) Processor Status flag is set. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax          | Addressing               | Bytes | Cycles     |
|--------|-----------------|--------------------------|-------|------------|
| `0xB0` | `bcs nearlabel` | Program Counter Relative | 2     | 2 [1],[2]  |

<sub>**[1]**: Add 1 extra cycle if branch is taken</sub><br />
<sub>**[2]**: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary</sub><br />




## `beq`

**Branch if Equal**

Takes a branch if the Zero (`Z`) Processor Status flag is set. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax          | Addressing               | Bytes | Cycles     |
|--------|-----------------|--------------------------|-------|------------|
| `0xF0` | `beq nearlabel` | Program Counter Relative | 2     | 2 [1],[2]  |

<sub>**[1]**: Add 1 extra cycle if branch is taken</sub><br />
<sub>**[2]**: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary</sub><br />




## `bmi`

**Branch if Minus**

Takes a branch if the Negative (`N`) Processor Status flag is set. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax          | Addressing               | Bytes | Cycles     |
|--------|-----------------|--------------------------|-------|------------|
| `0x30` | `bmi nearlabel` | Program Counter Relative | 2     | 2 [1],[2]  |

<sub>**[1]**: Add 1 extra cycle if branch is taken</sub><br />
<sub>**[2]**: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary</sub><br />




## `bne`

**Branch if Not Equal**

Takes a branch if the Zero (`Z`) Processor Status flag is clear. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax          | Addressing               | Bytes | Cycles     |
|--------|-----------------|--------------------------|-------|------------|
| `0xD0` | `bne nearlabel` | Program Counter Relative | 2     | 2 [1],[2]  |

<sub>**[1]**: Add 1 extra cycle if branch is taken</sub><br />
<sub>**[2]**: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary</sub><br />




## `bpl`

**Branch if Plus**

Takes a branch if the Negative (`N`) Processor Status flag is clear. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax          | Addressing               | Bytes | Cycles     |
|--------|-----------------|--------------------------|-------|------------|
| `0x10` | `bpl nearlabel` | Program Counter Relative | 2     | 2 [1],[2]  |

<sub>**[1]**: Add 1 extra cycle if branch is taken</sub><br />
<sub>**[2]**: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary</sub><br />




## `bra`

**Branch Always**

Takes a branch.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax          | Addressing               | Bytes | Cycles     |
|--------|-----------------|--------------------------|-------|------------|
| `0x80` | `bra nearlabel` | Program Counter Relative | 2     | 3 [1]      |

<sub>**[1]**: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary</sub><br />




## `brl`

**Branch Always Long**

Takes a branch with a 2-byte operand.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax          | Addressing                    | Bytes | Cycles     |
|--------|-----------------|-------------------------------|-------|------------|
| `0x82` | `brl nearlabel` | Program Counter Relative Long | 3     | 4 [1]      |

<sub>**[1]**: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary</sub><br />




## `bvc`

**Branch if Overflow Clear**

Takes a branch if the Overflow (`V`) Processor Status flag is clear. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax          | Addressing               | Bytes | Cycles     |
|--------|-----------------|--------------------------|-------|------------|
| `0x50` | `bvc nearlabel` | Program Counter Relative | 2     | 2 [1],[2]  |

<sub>**[1]**: Add 1 extra cycle if branch is taken</sub><br />
<sub>**[2]**: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary</sub><br />




## `bvs`

**Branch if Overflow Set**

Takes a branch if the Overflow (`V`) Processor Status flag is set. Otherwise, continues
with normal execution of the next instruction.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax          | Addressing               | Bytes | Cycles     |
|--------|-----------------|--------------------------|-------|------------|
| `0x70` | `bvs nearlabel` | Program Counter Relative | 2     | 2 [1],[2]  |

<sub>**[1]**: Add 1 extra cycle if branch is taken</sub><br />
<sub>**[2]**: Add 1 extra cycle in Emulation (E = 1) mode if branch taken crosses page boundary</sub><br />
