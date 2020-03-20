
## wdm

Reserved for Future Expansion

The WDM "instruction" is a placeholder in case of future use of two-byte opcodes. In the context of a SNES, there's no reason this instruction should ever be executed. If the WDM instruction is accidentally executed, it acts like a two-byte NOP instuctions, as the 65816 did.

#### Affected Flags

```
---------
```

#### Modes

| OpCode | Syntax | Addressing | Bytes | Cycles |
|--------|--------|------------|-------|--------|
| `0x42` | `wdm`  | N/A        | 2     | 2      |
