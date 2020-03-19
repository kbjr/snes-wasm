
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
