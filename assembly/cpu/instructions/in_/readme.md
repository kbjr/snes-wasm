
## `inc`

**Increment**

Increment the contents of the effective address by 1.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax         | Addressing           | Bytes | Cycles        |
|--------|----------------|----------------------|-------|---------------|
| `0x1A` | `inc A`        | Accumulator          | 1     | 2             |
| `0xE6` | `inc dp`       | Direct Page (DP)     | 2     | 5 [1],[2]     |
| `0xEE` | `inc addr`     | Absolute             | 3     | 6 [1]         |
| `0xF6` | `inc dp,X`     | DP Indexed,X         | 2     | 6 [1],[2]     |
| `0xFE` | `inc addr,X`   | Absolute Indexed,X   | 3     | 7 [1]         |

<sub>**[1]**: Add 2 cycle if M = 0</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of D is non-zero</sub><br />





## `inx`

**Increment Index Register X**

Increment the contents of the Index Register X by 1.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax         | Addressing           | Bytes | Cycles        |
|--------|----------------|----------------------|-------|---------------|
| `0xE8` | `inx`          | Implied              | 1     | 2             |





## `iny`

**Increment Index Register Y**

Increment the contents of the Index Register Y by 1.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax         | Addressing           | Bytes | Cycles        |
|--------|----------------|----------------------|-------|---------------|
| `0xC8` | `iny`          | Implied              | 1     | 2             |
