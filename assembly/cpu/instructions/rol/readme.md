
## `rol`

**Rotate Memory or Accumulator Left**

Rotate the contents of the operand (op) left one bit. The carry flag is used for the 17th (or 9th) bit, the highest bit, when rotating. The high bit from op will end up in the carry flag, and the carry flag will end up in bit 0 of op

#### Flags Affected

```
N-----ZC-
```

#### Modes

| OpCode | Syntax       | Addressing            | Bytes | Cycles     |
|--------|--------------|-----------------------|-------|------------|
| `0x2A` | `rol A`      | Accumulator           | 1     | 2          |
| `0x2E` | `rol addr`   | Absolute              | 3     | 6 [1]      |
| `0x26` | `rol dp`     | Direct Page           | 2     | 5 [1], [2] |
| `0x3E` | `rol addr,X` | Absolute Indexed,X    | 3     | 7 [1]      |
| `0x36` | `rol dp,X`   | Direct Page Indexed,X | 2     | 6 [1], [2] |

[1]: Add 2 cycles if M = 0 (16-bit memory/accumulator)
[2]: Add 1 cycle if low byte of Direct Page register is other than 0
