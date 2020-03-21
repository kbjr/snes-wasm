
## `pla`

**Pull Accumulator**

Pulls the top of the stack and stores it in the accumulator

#### Flags Affected

```
N-----Z--
```

#### Modes

| OpCode | Syntax     | Addressing       | Bytes | Cycles |
|--------|------------|------------------|-------|--------|
| `0x68` | `pla`      | Stack (Implied)  | 1     | 4 [1]  |

[1]: Add 1 cycle if M = 0 (16-bit memory/accumulator)





## `plb`

**Pull Data Bank Register**

Pulls the top of the stack and stores it in the Data Bank Register

#### Flags Affected

```
N-----Z--
```

#### Modes

| OpCode | Syntax     | Addressing       | Bytes | Cycles |
|--------|------------|------------------|-------|--------|
| `0xAB` | `plb`      | Stack (Implied)  | 1     | 4      |





## `pld`

**Pull Direct Page Register**

Pulls the top of the stack and stores it in the Direct Page Register

#### Flags Affected

```
N-----Z--
```

#### Modes

| OpCode | Syntax     | Addressing       | Bytes | Cycles |
|--------|------------|------------------|-------|--------|
| `0x2B` | `pld`      | Stack (Implied)  | 1     | 5      |





## `plp`

**Pull Status Flags**

Pulls the top of the stack and stores it in the Processor Status Flags Register

#### Flags Affected

```
NVMXDIZC-   <-- Native Mode
NV-BDIZC-   <-- Emulation Mode
```

#### Modes

| OpCode | Syntax     | Addressing       | Bytes | Cycles |
|--------|------------|------------------|-------|--------|
| `0x28` | `plp`      | Stack (Implied)  | 1     | 4      |





## `plx`

**Pull Index X Register**

Pulls the top of the stack and stores it in the Index Register X

#### Flags Affected

```
N-----Z--
```

#### Modes

| OpCode | Syntax     | Addressing       | Bytes | Cycles |
|--------|------------|------------------|-------|--------|
| `0xFA` | `plx`      | Stack (Implied)  | 1     | 4 [1]  |

[1]: Add 1 cycle if X = 0 (16-bit index registers)





## `ply`

**Pull Index Y Register**

Pulls the top of the stack and stores it in the Index Register Y

#### Flags Affected

```
N-----Z--
```

#### Modes

| OpCode | Syntax     | Addressing       | Bytes | Cycles |
|--------|------------|------------------|-------|--------|
| `0x7A` | `ply`      | Stack (Implied)  | 1     | 4 [1]  |

[1]: Add 1 cycle if X = 0 (16-bit index registers)

