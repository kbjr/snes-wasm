
## `ora`

**OR Accumulator with Memory**

Perform a bitwise logical OR of the contents at the effective address against the
Accumulator. In 8-bit mode (M = 1) or Emulation mode (E = 1), the data from the
effective address is 1 byte, and it is OR'ed against the low byte of the Accumulator (A).
Otherwise, both the data and Accumulator are 16-bit.

#### Flags Affected

```
N-----Z--
```

#### Modes

| OpCode | Syntax         | Addressing                  | Bytes | Cycles        |
|--------|----------------|-----------------------------|-------|---------------|
| `0x01` | `ora (dp,X)`   | DP Indexed Indirect, X      | 2     | 6 [2],[3]     |
| `0x03` | `ora sr,S`     | Stack Relative              | 2     | 4 [2]         |
| `0x05` | `ora dp`       | Direct Page                 | 2     | 3 [2],[3]     |
| `0x07` | `ora [dp]`     | DP Indirect Long            | 2     | 6 [2],[3]     |
| `0x09` | `ora #const`   | Immediate                   | 2 [1] | 2 [2]         |
| `0x0D` | `ora addr`     | Absolute                    | 3     | 4 [2]         |
| `0x0F` | `ora long`     | Absolute Long               | 4     | 5 [2]         |
| `0x11` | `ora (dp),Y`   | DP Indirect Indexed, Y      | 2     | 5 [2],[3],[4] |
| `0x12` | `ora (dp)`     | DP Indirect                 | 2     | 5 [2],[3]     |
| `0x13` | `ora (sr,S),Y` | SR Indirect Indexed, Y      | 2     | 7 [2]         |
| `0x15` | `ora dp,X`     | DP Indexed, X               | 2     | 4 [2],[3]     |
| `0x17` | `ora [dp],Y`   | DP Indirect Long Indexed, Y | 2     | 6 [2],[3]     |
| `0x19` | `ora addr,Y`   | Absolute Indexed, Y         | 3     | 4 [2],[4]     |
| `0x1D` | `ora addr,X`   | Absolute Indexed, X         | 3     | 4 [2],[4]     |
| `0x1F` | `ora long,X`   | Absolute Long Indexed, X    | 4     | 5 [2]         |

<sub>**[1]**: Add 1 byte if m = 0 (16-bit memory/accumulator)</sub><br />
<sub>**[2]**: Add 1 cycle if m = 0 (16-bit memory/accumulator)</sub><br />
<sub>**[3]**: Add 1 cycle if low byte of Direct Page register is not zero</sub><br />
<sub>**[4]**: Add 1 cycle if adding index crosses a page boundary</sub><br />
