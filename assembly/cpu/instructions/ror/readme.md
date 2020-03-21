
## `ror`

**Rotate Memory or Accumulator Right**

Rotate the contents stored at the given address right one bit. The carry flag is used for the 17th (or 9th) bit, the highest bit, when rotating. The low bit will end up in the carry flag, and the carry flag will end up in bit 16 (or 8)

#### Flags Affected

```
N-----ZC-
```

#### Modes

| OpCode | Syntax       | Addressing            | Bytes | Cycles     |
|--------|--------------|-----------------------|-------|------------|
| `0x6A` | `ror A`      | Accumulator           | 1     | 2          |
| `0x6E` | `ror addr`   | Absolute              | 3     | 6 [1]      |
| `0x66` | `ror dp`     | Direct Page           | 2     | 5 [1], [2] |
| `0x7E` | `ror addr,X` | Absolute Indexed,X    | 3     | 7 [1]      |
| `0x76` | `ror dp,X`   | Direct Page Indexed,X | 2     | 6 [1], [2] |

[1]: Add 2 cycles if M = 0 (16-bit memory/accumulator)
[2]: Add 1 cycle if low byte of Direct Page register is other than 0
