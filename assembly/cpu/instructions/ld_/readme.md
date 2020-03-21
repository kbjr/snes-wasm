
## `ldx`

**Load Index Register X from Memory**

Loads the value at the effective address into Index Register X

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax         | Addressing         | Bytes | Cycles        |
|--------|----------------|--------------------|-------|---------------|
| `0xA2` | `ldx #const`   | Immediate          | 2 [4] | 2 [1]         |
| `0xA6` | `ldx dp`       | Direct Page (DP)   | 2     | 3 [1],[2]     |
| `0xAE` | `ldx addr`     | Absolute           | 3     | 4 [1]         |
| `0xB6` | `ldx dp,Y`     | DP Indexed,Y       | 2     | 4 [1],[2],[3] |
| `0xBE` | `ldx addr,Y`   | Absolute Indexed,Y | 3     | 4 [1],[3]     |

<sub>**[1]**: Add 1 cycle if X = 0</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of D is non-zero</sub><br />
<sub>**[3]**: Add 1 cycle if adding index crosses page boundry</sub><br />
<sub>**[4]**: Add 1 byte if X = 0</sub><br />





## `ldy`

**Load Index Register Y from Memory**

Loads the value at the effective address into Index Register Y

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax         | Addressing         | Bytes | Cycles        |
|--------|----------------|--------------------|-------|---------------|
| `0xA0` | `ldy #const`   | Immediate          | 2 [4] | 2 [1]         |
| `0xA4` | `ldy dp`       | Direct Page (DP)   | 2     | 3 [1],[2]     |
| `0xAC` | `ldy addr`     | Absolute           | 3     | 4 [1]         |
| `0xB4` | `ldy dp,Y`     | DP Indexed,Y       | 2     | 4 [1],[2],[3] |
| `0xBC` | `ldy addr,Y`   | Absolute Indexed,Y | 3     | 4 [1],[3]     |

<sub>**[1]**: Add 1 cycle if X = 0</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of D is non-zero</sub><br />
<sub>**[3]**: Add 1 cycle if adding index crosses page boundry</sub><br />
<sub>**[4]**: Add 1 byte if X = 0</sub><br />
