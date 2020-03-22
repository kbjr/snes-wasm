
## `stx`

**Store Index Register X to Memory**

Stores the value currently in the X Index Register to the effective address

#### Affected Flags

```
---------
```

#### Modes

| OpCode | Syntax         | Addressing        | Bytes  | Cycles        |
|--------|----------------|-------------------|--------|---------------|
| `0x86` | `stx dp`       | Direct Page (DP)  | 2      | 3 [1],[2]     |
| `0x8E` | `stx addr`     | Absolute          | 3      | 4 [1]         |
| `0x96` | `stx dp,Y`     | DP Indexed,Y      | 2      | 4 [1],[2]     |

<sub>**[1]**: Add 1 cycle if X = 0</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of D is non-zero</sub><br />




## `sty`

**Store Index Register Y to Memory**

Stores the value currently in the Y Index Register to the effective address

#### Affected Flags

```
---------
```

#### Modes

| OpCode | Syntax         | Addressing        | Bytes  | Cycles        |
|--------|----------------|-------------------|--------|---------------|
| `0x84` | `sty dp`       | Direct Page (DP)  | 2      | 3 [1],[2]     |
| `0x8C` | `sty addr`     | Absolute          | 3      | 4 [1]         |
| `0x94` | `sty dp,Y`     | DP Indexed,X      | 2      | 4 [1],[2]     |

<sub>**[1]**: Add 1 cycle if X = 0</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of D is non-zero</sub><br />



## `stz`

**Store Zero to Memory**

Stores `0x00` (or `0x0000`) to the effective address

#### Affected Flags

```
---------
```

#### Modes

| OpCode | Syntax         | Addressing         | Bytes  | Cycles        |
|--------|----------------|--------------------|--------|---------------|
| `0x64` | `stz dp`       | Direct Page (DP)   | 2      | 3 [1],[2]     |
| `0x74` | `stz dp,X`     | DP Indexed,X       | 2      | 4 [1],[2]     |
| `0x9C` | `stz addr`     | Absolute           | 3      | 4 [1]         |
| `0x9E` | `stz addr,X`   | Absolute Indexed,X | 3      | 5 [1]         |

<sub>**[1]**: Add 1 cycle if X = 0</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of D is non-zero</sub><br />
