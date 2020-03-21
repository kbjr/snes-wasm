
## `jmp`

**Jump**

The Program Counter (and, in the case of a long jump, the Program Bank) are set to the effective address

#### Affected Flags

```
---------
```

#### Modes

| OpCode | Syntax         | Addressing                  | Bytes | Cycles  |
|--------|----------------|-----------------------------|-------|---------|
| `0x4C` | `jmp addr`     | Absolute                    | 3     | 3       |
| `0x5C` | `jmp long`     | Absolute Long               | 4     | 4       |
| `0x6C` | `jmp (addr)`   | Absolute Indirect           | 3     | 5       |
| `0x7C` | `jmp (addr,X)` | Absolute Indexed Indirect,X | 3     | 6       |
| `0xDC` | `jmp [addr]`   | Absolute Indirect Long      | 3     | 6       |
