
## `rti`

Return from Interupt

Pulls the status register and program counter from the stack. In native mode (E = 0), also pull the program bank register from the stack.

#### Flags Affected

```
NVMXDIZC-
```

#### Modes

| OpCode | Syntax       | Addressing            | Bytes | Cycles     |
|--------|--------------|-----------------------|-------|------------|
| `0x40` | `rti`        | Stack (RTI)           | 1     | 6 [1]      |

[1]: Add 1 cycle if Native mode (E = 0)





## `rtl`

Return from Subroutine Long

Pulls the Program Counter register (incrementing by one before loading) from the stack. Then pulls the Program Bank register from the stack.

#### Flags Affected

```
NVMXDIZC-
```

#### Modes

| OpCode | Syntax       | Addressing            | Bytes | Cycles     |
|--------|--------------|-----------------------|-------|------------|
| `0x6B` | `rtl`        | Stack (RTL)           | 1     | 6          |





## `rts`

Return from Subroutine

Pulls the Program Counter register (incrementing by one before loading) from the stack.

#### Flags Affected

```
NVMXDIZC-
```

#### Modes

| OpCode | Syntax       | Addressing            | Bytes | Cycles     |
|--------|--------------|-----------------------|-------|------------|
| `0x60` | `rts`        | Stack (RTS)           | 1     | 6          |
