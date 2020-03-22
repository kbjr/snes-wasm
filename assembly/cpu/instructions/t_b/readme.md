
## `trb`

**Test and Reset Memory Bits Against Accumulator**

Applies a logical AND of the compliment of the accumulator to the memory specified by the effective address.

#### Affected Flags

```
------Z--
```

#### Modes

| OpCode | Syntax     | Addressing       | Bytes | Cycles    |
|--------|------------|------------------|-------|-----------|
| `0x14` | `trb dp`   | Direct Page (DP) | 2     | 5 [1],[2] |
| `0x1C` | `trb addr` | Absolute         | 3     | 6 [1]     |

<sub>**[1]**: Add 2 cycle if M = 0</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of D is non-zero</sub><br />




## `tsb`

**Test and Set Memory Bits Against Accumulator**

Applies a logical OR of the accumulator to the memory specified by the effective address.

#### Affected Flags

```
------Z--
```

#### Modes

| OpCode | Syntax     | Addressing       | Bytes | Cycles    |
|--------|------------|------------------|-------|-----------|
| `0x04` | `tsb dp`   | Direct Page (DP) | 2     | 5 [1],[2] |
| `0x0C` | `tsb addr` | Absolute         | 3     | 6 [1]     |

<sub>**[1]**: Add 2 cycle if M = 0</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of D is non-zero</sub><br />
