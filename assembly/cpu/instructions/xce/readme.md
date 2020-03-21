 
## xce

**Exchange Carry with Emulation bit**

Swaps the value of the hidden `E` (Emulation) flag into the `C` (Carry) flag location, allowing it to be inspected or set.

#### Affected Flags

```
--MX---CE
```

#### Modes

| OpCode | Syntax | Addressing | Bytes | Cycles     |
|--------|--------|------------|-------|------------|
| `0xFB` | `xce`  | Implied    | 1     | 2          |
