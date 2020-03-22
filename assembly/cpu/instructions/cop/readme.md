
## `cop`

**Co-Processor Enable**

Causes a software interrupt, similar to `brk`, but using a separate `cop` vector. Unlike `brk`, the signature operand byte is required when using `cop`. Signature bytes in the range `$80` - `$FF` are reserved by the Western Design Center for implementation of co-processor control; signatures in the range `$00` - `$7F` are available for use with software-implemented `cop` handlers.

#### Affected Flags

```
----DI---
```

#### Modes

| OpCode | Syntax       | Addressing       | Bytes | Cycles |
|--------|--------------|------------------|-------|--------|
| `0x02` | `cop #const` | Stack Interrupt  | 2     | 7 [1]  |

<sub>**[1]**: Add 1 extra cycle if Native mode (E = 0)</sub><br />
