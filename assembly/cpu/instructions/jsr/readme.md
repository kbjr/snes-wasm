
## `jsr`

**Jump to Subroutine**

Transfer control to the subroutine at the location specified by the operand, after first pushing onto the stack, as a return address, the current program counter value, that is, the address of the last instruction byte (the third byte of a three-byte instruction, the fourth byte of a four-byte instruction), not the address of the next instruction.

If long addressing is used, the current program counter bank is pushed onto the stack first. Next – or first in the more normal case of intra-bank addressing – the high order byte of the return address is pushed,followed by the low order byte. This leaves it on the stack in standard 65x order (lowest byte at the lowest address, highest byte at the highest address). After the return address is pushed, the stack pointer points to the next available location (next lower byte) on the stack. Finally, the program counter (and, in the case of long addressing, the program counter bank register) is loaded with the values specified by the operand, and control is transferred to the target location.

#### Affected Flags

```
---------
```

#### Modes

| OpCode | Syntax         | Addressing                  | Bytes | Cycles  |
|--------|----------------|-----------------------------|-------|---------|
| `0x20` | `jsr addr`     | Absolute                    | 3     | 6       |
| `0x22` | `jsr long`     | Absolute Long               | 4     | 8       |
| `0xFC` | `jsr (addr,X)` | Absolute Indexed Indirect,X | 3     | 8       |
