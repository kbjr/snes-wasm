
## `lda`

**Load Accumulator from Memory**

Loads the value from the effective address into the Accumulator

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax         | Addressing                          | Bytes  | Cycles        |
|--------|----------------|-------------------------------------|--------|---------------|
| `0xA1` | `lda (dp,X)`   | Direct Page Indirect Indexed,X      | 2      | 6 [1],[2]     |
| `0xA3` | `lda sr,S`     | Stack Relative                      | 2      | 4 [1]         |
| `0xA5` | `lda dp`       | Direct Page                         | 2      | 3 [1],[2]     |
| `0xA7` | `lda [dp]`     | Direct Page Indirect Long           | 2      | 6 [1],[2]     |
| `0xA9` | `lda #const`   | Immediate                           | 2 [3]  | 2 [1]         |
| `0xAD` | `lda addr`     | Absolute                            | 3      | 4 [1]         |
| `0xAF` | `lda long`     | Absolute Long                       | 4      | 5 [1]         |
| `0xB1` | `lda (dp),Y`   | Direct Page Indirect Indexed,Y      | 2      | 5 [1],[2],[4] |
| `0xB2` | `lda (dp)`     | Direct Page Indirect                | 2      | 5 [1],[2]     |
| `0xB3` | `lda (sr,S),Y` | Stack Relative Indirect Indexed,Y   | 2      | 7 [1]         |
| `0xB5` | `lda dp,X`     | Direct Page Indexed,X               | 2      | 4 [1],[2]     |
| `0xB7` | `lda [dp],Y`   | Direct Page Indirect Long Indexed,Y | 2      | 6 [1],[2]     |
| `0xB9` | `lda addr,Y`   | Absolute Indexed,Y                  | 3      | 4 [1],[4]     |
| `0xBD` | `lda addr,X`   | Absolute Indexed,X                  | 3      | 4 [1],[4]     |
| `0xBF` | `lda long,X`   | Absolute Long Indexed,X             | 4      | 5 [1]         |

<sub>**[1]**: Add 1 cycle if M = 0</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of D is non-zero</sub><br />
<sub>**[3]**: Add 1 byte if M = 0</sub><br />
<sub>**[4]**: Add 1 cycle if adding index crosses a page boundary or X = 0 (16-bit index registers)</sub><br />
