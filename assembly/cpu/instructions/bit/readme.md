
## (`bit`)

Test Memory Bits Against Accumulator

TODO: Fill in description

| OpCode | Syntax     | Addressing             | Flags     | Bytes | Cycles     |
|--------|------------|------------------------|-----------|-------|------------|
| 0x24   | bit dp     | Direct Page            | --------- | 2     | 3 [1],[2]  |
| 0x2C   | bit addr   | Absolute               | --------- | 3     | 4 [1]      |
| 0x34   | bit dp,X   | Direct Page Indexed, X | --------- | 2     | 4 [1],[2]  |
| 0x3C   | bit addr,X | Absolute Indexed, X    | --------- | 3     | 4 [1],[4]  |
| 0x89   | bit #const | Immediate              | --------- | 2 [3] | 2 [1]      |

[1]: Add 1 cycle if M = 0
[2]: Add 1 cycle if low byte of D is non-zero
[3]: Add 1 byte if M = 0
[4]: Add 1 cycle if adding index crosses a page boundary
