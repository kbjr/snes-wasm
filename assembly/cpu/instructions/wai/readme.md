
## `wai`

**Wait for Interrupt**

Put the processor to sleep (sets the RDY pin low) until a hardware interrupt (NMI, IRQ, ABORT, or RESET) is received. Once an interrupt is received, the RTI from the interrupt handler will return control to the instruction following the original WAI. If, however, interrupts are disabled due to setting the I flag _before_ WAI is called, an IRQ will immediately return control to next instsruction, rather than going through the interrupt handler.

#### Affected Flags

```
---------
```

#### Modes

| OpCode | Syntax | Addressing | Bytes | Cycles     |
|--------|--------|------------|-------|------------|
| `0xCB` | `wai`  | Implied    | 2     | 3 [1]      |

[1]: Uses 3 cycles to shut the processor down; additional cycles are required by interrupt to restart it
