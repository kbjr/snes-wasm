
## `sbc`

**Subtract with Borrow**

Subtract the data located at the effective address specified by the operand from the contexts of the accumulator; Subtract one more if the carry flag is clear, and store the result in the accumulator.

#### Affected Flags

```
NV----ZC-
```

#### Modes

| OpCode | Syntax         | Addressing                 | Bytes | Cycles        |
|--------|----------------|----------------------------|-------|---------------|
| `0xE1` | `sbc (dp,X)`   | DP Indexed Indirect,X      | 2     | 6 [1],[2]     |
| `0xE3` | `sbc sr,S`     | Stack Relative (SR)        | 2     | 4 [1]         |
| `0xE5` | `sbc dp`       | Direct Page (DP)           | 2     | 3 [1],[2]     |
| `0xE7` | `sbc [dp]`     | DP Indirect Long           | 2     | 6 [1],[2]     |
| `0xE9` | `sbc #const`   | Immediate                  | 2 [4] | 2 [1]         |
| `0xED` | `sbc addr`     | Absolute                   | 3     | 4 [1]         |
| `0xEF` | `sbc long`     | Absolute Long              | 4     | 5 [1]         |
| `0xF1` | `sbc (dp),Y`   | DP Indirect Indexed,Y      | 2     | 5 [1],[2],[3] |
| `0xF2` | `sbc (dp)`     | DP Indirect                | 2     | 5 [1],[2]     |
| `0xF3` | `sbc (sr,S),Y` | SR Indirect Indexed,Y      | 2     | 7 [1]         |
| `0xF5` | `sbc dp,X`     | DP Indexed,X               | 2     | 4 [1],[2],[3] |
| `0xF7` | `sbc [dp],Y`   | DP Indirect Long Indexed,Y | 2     | 6 [1],[2]     |
| `0xF9` | `sbc addr,Y`   | Absolute Indexed,Y         | 3     | 4 [1],[3]     |
| `0xFD` | `sbc addr,X`   | Absolute Indexed,X         | 3     | 4 [1],[3]     |
| `0xFF` | `sbc long,X`   | Absolute Long Indexed,X    | 4     | 5 [1]         |

<sub>**[1]**: Add 1 cycle if M = 0</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of D is non-zero</sub><br />
<sub>**[3]**: Add 1 cycle if adding index crosses a page boundary or X = 0 (16-bit index registers)</sub><br />
<sub>**[4]**: Add 1 byte if M = 0</sub><br />
