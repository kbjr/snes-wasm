
## `and`

**And Accumulator with Memory**

Perform a bitwise logical AND of the contents at the effective address against the
Accumulator. In 8-bit mode (M = 1) or Emulation mode (E = 1), the data from the
effective address is 1 byte, and it is OR'ed against the low byte of the Accumulator (A).

Otherwise, both the data and Accumulator are 16-bit.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax         | Addressing                  | Bytes | Cycles     |
|--------|----------------|-----------------------------|-------|------------|
| `0x21` | `and (dp,X)`   | DP Indexed Indirect, X      | 2     | 6 [2],[3]  |
| `0x23` | `and sr,S`     | Stack Relative              | 2     | 4 [2]      |
| `0x25` | `and dp`       | Direct Page                 | 2     | 3 [2],[3]  |
| `0x27` | `and [dp]`     | DP Indirect Long            | 2     | 6 [2],[3]  |
| `0x29` | `and #const`   | Immediate                   | 2 [1] | 2 [2]      |
| `0x2D` | `and addr`     | Absolute                    | 3     | 4 [2]      |
| `0x2F` | `and long`     | Absolute Long               | 4     | 5 [2]      |
| `0x31` | `and (dp),Y`   | DP Indirect Indexed, Y      | 2     | 5 [2],[3]  |
| `0x32` | `and (dp)`     | DP Indirect                 | 2     | 5 [2],[3]  |
| `0x33` | `and (sr,S),Y` | SR Indirect Indexed, Y      | 2     | 7 [2]      |
| `0x35` | `and dp,X`     | DP Indexed, X               | 2     | 4 [2],[3]  |
| `0x37` | `and [dp],Y`   | DP Indirect Long Indexed, Y | 2     | 6 [2],[3]  |
| `0x39` | `and addr,Y`   | Absolute Indexed,Y          | 3     | 4 [2],[4]  |
| `0x3D` | `and addr,X`   | Absolute Indexed, X         | 3     | 4 [2],[4]  |
| `0x3F` | `and long,X`   | Absolute Long Indexed, X    | 4     | 5 [2]      |

- [1]: Add 1 byte if m = 0 (16-bit memory/accumulator)
- [2]: Add 1 cycle if m = 0 (16-bit memory/accumulator)
- [3]: Add 1 cycle if low byte of Direct Page register is not zero
- [4]: Add 1 cycle if adding index crosses a page boundary
