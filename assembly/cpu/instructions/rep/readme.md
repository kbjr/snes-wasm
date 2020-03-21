
## `rep`

**Reset Processor status bits**

Applies the inverse of the given mask to the Processor Status (P1) Register with a bitwise OR operation, allowing the resetting of status flags.

#### Flags Affected

```
NVMXDIZC-
```

#### Modes

| OpCode | Syntax       | Addressing    | Bytes | Cycles |
|--------|--------------|---------------|-------|--------|
| `0xC2` | `rep #const` | Immediate     | 2     | 3      |
