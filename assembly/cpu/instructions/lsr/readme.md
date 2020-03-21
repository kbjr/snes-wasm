
## `lsr`

**Logical Shift Memory or Accumulator Right**

Shift the memory or accumulator reference by the operand left 1 bit. In 8-bit mode (M = 1)
or Emulation mode (E = 1), the data shifted is 1 byte. Otherwise, the data is 16-bit.

#### Affected Flags

```
N-----ZC-
```

#### Modes

| OpCode | Syntax       | Addressing                  | Bytes | Cycles     |
|--------|--------------|-----------------------------|-------|------------|
| `0x46` | `lsr dp`     | Direct Page                 | 2     | 5 [1],[2]  |
| `0x4A` | `lsr A`      | Accumulator                 | 1     | 2          |
| `0x4E` | `lsr addr`   | Absolute                    | 3     | 6 [1]      |
| `0x56` | `lsr dp,X`   | DP Indexed, X               | 2     | 6 [1],[2]  |
| `0x5E` | `lsr addr,X` | Absolute Indexed, X         | 3     | 4 [1]      |

<sub>**[1]**: Add 2 cycle if M = 0 (16-bit memory/accumulator)</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of Direct Page register is not zero</sub><br />
