
## `sta`

**Store Accumulator to Memory**

Stores the value currently in the Accumulator to the effective address

#### Affected Flags

```
---------
```

#### Modes

| OpCode | Syntax         | Addressing                          | Bytes  | Cycles        |
|--------|----------------|-------------------------------------|--------|---------------|
| `0x81` | `sta (dp,X)`   | Direct Page Indirect Indexed,X      | 2      | 6 [1],[2]     |
| `0x83` | `sta sr,S`     | Stack Relative                      | 2      | 4 [1]         |
| `0x85` | `sta dp`       | Direct Page                         | 2      | 3 [1],[2]     |
| `0x87` | `sta [dp]`     | Direct Page Indirect Long           | 2      | 6 [1],[2]     |
| `0x8D` | `sta addr`     | Absolute                            | 3      | 4 [1]         |
| `0x8F` | `sta long`     | Absolute Long                       | 4      | 5 [1]         |
| `0x91` | `sta (dp),Y`   | Direct Page Indirect Indexed,Y      | 2      | 5 [1],[2]     |
| `0x92` | `sta (dp)`     | Direct Page Indirect                | 2      | 5 [1],[2]     |
| `0x93` | `sta (sr,S),Y` | Stack Relative Indirect Indexed,Y   | 2      | 7 [1]         |
| `0x95` | `sta dp,X`     | Direct Page Indexed,X               | 2      | 4 [1],[2]     |
| `0x97` | `sta [dp],Y`   | Direct Page Indirect Long Indexed,Y | 2      | 6 [1],[2]     |
| `0x99` | `sta addr,Y`   | Absolute Indexed,Y                  | 3      | 4 [1]         |
| `0x9D` | `sta addr,X`   | Absolute Indexed,X                  | 3      | 4 [1]         |
| `0x9F` | `sta long,X`   | Absolute Long Indexed,X             | 4      | 5 [1]         |

<sub>**[1]**: Add 1 cycle if M = 0</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of D is non-zero</sub><br />
