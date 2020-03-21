
## `pea`

**Push Effective Absolute Address**

Pushes the given constant value onto the stack.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax     | Addressing       | Bytes | Cycles |
|--------|------------|------------------|-------|--------|
| `0xF4` | `pea addr` | Stack (Absolute) | 3     | 5      |



## `pei`

**Push Effective Indirect Address**

Pushes the given indirect address onto the stack.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax     | Addressing                   | Bytes | Cycles |
|--------|------------|------------------------------|-------|--------|
| `0xD4` | `pei (dp)` | Stack (Direct Page Indirect) | 2     | 6 [1]  |

[1]: Add 1 cycle if low byte of Direct Page register is non-zero



## `per`

**Push Effective PC Relative Indirect Address**

Pushes the given PC relative indirect address onto the stack.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax      | Addressing                            | Bytes | Cycles |
|--------|-------------|---------------------------------------|-------|--------|
| `0x62` | `per label` | Stack (Program Counter Relative Long) | 3     | 6      |



## `pha`

**Push Accumulator**

Pushes the contents of the Accumulator (A) onto the stack.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax | Addressing      | Bytes | Cycles |
|--------|--------|-----------------|-------|--------|
| `0x48` | `pha`  | Stack (Implied) | 1     | 3 [1]  |

[1]: Add 1 cycle if M = 0 (16-bit memory/accumulator)



## `phb`

**Push Data Bank Register**

Pushes the Data Bank Register onto the stack.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax | Addressing      | Bytes | Cycles |
|--------|--------|-----------------|-------|--------|
| `0x8B` | `phb`  | Stack (Implied) | 1     | 3      |



## `phd`

**Push Direct Page Register**

Pushes the Direct Page Register onto the stack.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax | Addressing      | Bytes | Cycles |
|--------|--------|-----------------|-------|--------|
| `0x0B` | `phd`  | Stack (Implied) | 1     | 4      |



## `phk`

**Push Program Bank Register**

Pushes the Program Bank Register onto the stack.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax | Addressing      | Bytes | Cycles |
|--------|--------|-----------------|-------|--------|
| `0x4B` | `phk`  | Stack (Implied) | 1     | 3      |



## `php`

**Push Processor Status Register**

Pushes the Processor Status Register onto the stack.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax | Addressing      | Bytes | Cycles |
|--------|--------|-----------------|-------|--------|
| `0x08` | `php`  | Stack (Implied) | 1     | 3      |



## `phx`

**Push X Index Register**

Pushes the X Index Register onto the stack.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax | Addressing      | Bytes | Cycles |
|--------|--------|-----------------|-------|--------|
| `0xDA` | `phx`  | Stack (Implied) | 1     | 3 [1]  |

[1]: Add 1 cycle if X = 0 (16-bit index registers)



## `phy`

**Push Y Index Register**

Pushes the Y Index Register onto the stack.

#### Flags Affected

```
---------
```

#### Modes

| OpCode | Syntax | Addressing      | Bytes | Cycles |
|--------|--------|-----------------|-------|--------|
| `0x5A` | `phy`  | Stack (Implied) | 1     | 3 [1]  |

[1]: Add 1 cycle if X = 0 (16-bit index registers)

