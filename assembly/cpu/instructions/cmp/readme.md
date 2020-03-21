
## `cmp`

**Compare Accumulator with Memory**

Behaves almost entirely like `sbc`, but with some exceptions:

- The result is not saved (the value in the accumulator is left intact)
- The value in the carry prior to the operation is irrelevant to the operation; that is, the carry does not have to be set prior to a compare as it is with 65x subtractions
- The compare instruction does not set the overflow flag, so it cannot be used for signed comparisons

Although decimal mode does not affect the `cmp` instruction, decimal comparisons are effective, since the equivalent binary values maintain the same magnitude relationships as the decimal values have, for example, 0x99 > 0x04 just as 99 > 4.

#### Affected Flags

```
N-----ZC-
```

#### Modes

| OpCode | Syntax         | Addressing                 | Bytes | Cycles        |
|--------|----------------|----------------------------|-------|---------------|
| `0xC1` | `cmp (dp,X)`   | DP Indexed Indirect,X      | 2     | 6 [1],[2]     |
| `0xC3` | `cmp sr,S`     | Stack Relative (SR)        | 2     | 4 [1]         |
| `0xC5` | `cmp dp`       | Direct Page (DP)           | 2     | 3 [1],[2]     |
| `0xC7` | `cmp [dp]`     | DP Indirect Long           | 2     | 6 [1],[2]     |
| `0xC9` | `cmp #const`   | Immediate                  | 2 [4] | 2 [1]         |
| `0xCD` | `cmp addr`     | Absolute                   | 3     | 4 [1]         |
| `0xCF` | `cmp long`     | Absolute Long              | 4     | 5 [1]         |
| `0xD1` | `cmp (dp),Y`   | DP Indirect Indexed,Y      | 2     | 5 [1],[2],[3] |
| `0xD2` | `cmp (dp)`     | DP Indirect                | 2     | 5 [1],[2]     |
| `0xD3` | `cmp (sr,S),Y` | SR Indirect Indexed,Y      | 2     | 7 [1]         |
| `0xD5` | `cmp dp,X`     | DP Indexed,X               | 2     | 4 [1],[2],[3] |
| `0xD7` | `cmp [dp],Y`   | DP Indirect Long Indexed,Y | 2     | 6 [1],[2]     |
| `0xD9` | `cmp addr,Y`   | Absolute Indexed,Y         | 3     | 4 [1],[3]     |
| `0xDD` | `cmp addr,X`   | Absolute Indexed,X         | 3     | 4 [1],[3]     |
| `0xDF` | `cmp long,X`   | Absolute Long Indexed,X    | 4     | 5 [1]         |

<sub>**[1]**: Add 1 cycle if M = 0</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of D is non-zero</sub><br />
<sub>**[3]**: Add 1 cycle if adding index crosses a page boundary or X = 0 (16-bit index registers)</sub><br />
<sub>**[4]**: Add 1 byte if M = 0</sub><br />
