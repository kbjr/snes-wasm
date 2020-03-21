
## `dec`

**Decrement**

Decrement the contents of the effective address by 1.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax         | Addressing           | Bytes | Cycles        |
|--------|----------------|----------------------|-------|---------------|
| `0x3A` | `dec A`        | Accumulator          | 1     | 2             |
| `0xC6` | `dec dp`       | Direct Page (DP)     | 2     | 5 [1],[2]     |
| `0xCE` | `dec addr`     | Absolute             | 3     | 6 [1]         |
| `0xD6` | `dec dp,X`     | DP Indexed,X         | 2     | 6 [1],[2]     |
| `0xDE` | `dec addr,X`   | Absolute Indexed,X   | 3     | 7 [1]         |

<sub>**[1]**: Add 2 cycle if M = 0</sub><br />
<sub>**[2]**: Add 1 cycle if low byte of D is non-zero</sub><br />





## `dex`

**Decrement Index Register X**

Decrement the contents of the Index Register X by 1.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax         | Addressing           | Bytes | Cycles        |
|--------|----------------|----------------------|-------|---------------|
| `0xCA` | `dex`          | Implied              | 1     | 2             |





## `dey`

**Decrement Index Register Y**

Decrement the contents of the Index Register Y by 1.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax         | Addressing           | Bytes | Cycles        |
|--------|----------------|----------------------|-------|---------------|
| `0x88` | `dey`          | Implied              | 1     | 2             |
