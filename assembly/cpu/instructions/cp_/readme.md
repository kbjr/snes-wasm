
## `cpx`

**Compare Index Register X with Memory**

Behaves exactly like `cmp`, except that is compares Index Register X instead of the Accumulator.

#### Affected Flags

```
N-----ZC-
```

#### Modes

| OpCode | Syntax         | Addressing                 | Bytes | Cycles        |
|--------|----------------|----------------------------|-------|---------------|
| `0xE0` | `cpx dp`       | Direct Page (DP)           | 2     | 3 [1],[2]     |
| `0xE4` | `cpx #const`   | Immediate                  | 2 [4] | 2 [1]         |
| `0xEC` | `cpx addr`     | Absolute                   | 3     | 4 [1]         |

- [1]: Add 1 cycle if M = 0
- [2]: Add 1 cycle if low byte of D is non-zero





## `cpy`

**Compare Index Register Y with Memory**

Behaves exactly like `cmp`, except that is compares Index Register Y instead of the Accumulator.

#### Affected Flags

```
N-----ZC-
```

#### Modes

| OpCode | Syntax         | Addressing                 | Bytes | Cycles        |
|--------|----------------|----------------------------|-------|---------------|
| `0xC0` | `cpy dp`       | Direct Page (DP)           | 2     | 3 [1],[2]     |
| `0xC4` | `cpy #const`   | Immediate                  | 2 [4] | 2 [1]         |
| `0xCC` | `cpy addr`     | Absolute                   | 3     | 4 [1]         |

- [1]: Add 1 cycle if M = 0
- [2]: Add 1 cycle if low byte of D is non-zero
