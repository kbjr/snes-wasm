
## `brk`

**Software Break**

Forces a software interrupt. This interrupt is unaffected by the Interrupt Disable (`I`) flag.

Although `brk` is a 1 byte instruction, the Program Counter (`PC`) is incremented by 2, allowing for a signature byte to indicate the cause of the interrupt.

#### Affected Flags

```
----DI--0   <-- Native mode
---BDI--1   <-- Emulation mode
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0x00` | `brk`  | Stack Interrupt  | 2     | 7 [1]  |

<sub>**[1]**: Add 1 extra cycle if Native mode (E = 0)</sub><br />
