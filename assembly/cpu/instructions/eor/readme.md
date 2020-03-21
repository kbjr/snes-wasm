
## `eor`

**Exclusive-OR Accumulator with Memory**

Perform a bitwise logical exclusive OR of the contents at the effective address against the Accumulator. In 8-bit mode (M = 1) or Emulation mode (E = 1), the data from the effective address is 1 byte, and it is XOR'ed against the low byte of the Accumulator (A). Otherwise, both the data and Accumulator are 16-bit.

#### Flags Affected

```
N-----Z--
```

#### Modes

| OpCode | Syntax         | Addressing                  | Bytes | Cycles        |
|--------|----------------|-----------------------------|-------|---------------|
| `0x41` | `eor (dp,X)`   | DP Indexed Indirect, X      | 2     | 6 [2],[3]     |
| `0x43` | `eor sr,S`     | Stack Relative              | 2     | 4 [2]         |
| `0x45` | `eor dp`       | Direct Page                 | 2     | 3 [2],[3]     |
| `0x47` | `eor [dp]`     | DP Indirect Long            | 2     | 6 [2],[3]     |
| `0x49` | `eor #const`   | Immediate                   | 2 [1] | 2 [2]         |
| `0x4D` | `eor addr`     | Absolute                    | 3     | 4 [2]         |
| `0x4F` | `eor long`     | Absolute Long               | 4     | 5 [2]         |
| `0x51` | `eor (dp),Y`   | DP Indirect Indexed, Y      | 2     | 5 [2],[3],[4] |
| `0x52` | `eor (dp)`     | DP Indirect                 | 2     | 5 [2],[3]     |
| `0x53` | `eor (sr,S),Y` | SR Indirect Indexed, Y      | 2     | 7 [2]         |
| `0x55` | `eor dp,X`     | DP Indexed, X               | 2     | 4 [2],[3]     |
| `0x57` | `eor [dp],Y`   | DP Indirect Long Indexed, Y | 2     | 6 [2],[3]     |
| `0x59` | `eor addr,Y`   | Absolute Indexed, Y         | 3     | 4 [2],[4]     |
| `0x5D` | `eor addr,X`   | Absolute Indexed, X         | 3     | 4 [2],[4]     |
| `0x5F` | `eor long,X`   | Absolute Long Indexed, X    | 4     | 5 [2]         |

[1]: Add 1 byte if m = 0 (16-bit memory/accumulator)
[2]: Add 1 cycle if m = 0 (16-bit memory/accumulator)
[3]: Add 1 cycle if low byte of Direct Page register is not zero
[4]: Add 1 cycle if adding index crosses a page boundary
