
## `stp`

**Stop the Processor**

The processor is effectively shutdown until a reset occurs.

#### Affected Flags

```
---------
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0xDB` | `stp`  | Implied          | 1     | 3 [1]  |

<sub>**[1]**: Uses 3 cycles to shut the processor down; additional cycles are required by interrupt to restart it</sub><br />
