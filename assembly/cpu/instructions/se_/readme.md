
## `sec`

**Set Carry Flag**

Sets the carry flag in the Processor Status (P) register

#### Affected Flags

```
-------C-
```

#### Modes

| OpCode | Syntax   | Addressing     | Bytes | Cycles |
|--------|----------|----------------|-------|--------|
| `0x38` | `sec`    | Implied        | 1     | 2      |





## `sed`

**Set Decimal Mode Flag**

Sets the decimal mode flag in the Processor Status (P) register

#### Affected Flags

```
----D----
```

#### Modes

| OpCode | Syntax   | Addressing     | Bytes | Cycles |
|--------|----------|----------------|-------|--------|
| `0xF8` | `sed`    | Implied        | 1     | 2      |





## `sei`

**Set Interrupt Disable Flag**

Sets the interrupt disable flag in the Processor Status (P) register

#### Affected Flags

```
-----I---
```

#### Modes

| OpCode | Syntax   | Addressing     | Bytes | Cycles |
|--------|----------|----------------|-------|--------|
| `0x78` | `sei`    | Implied        | 1     | 2      |





## `sep`

**Set Processor status bits**

Applies the given bit mask to the Processor Status (P1) Register with a bitwise OR operation, allowing the setting of status flags.

#### Affected Flags

```
NVMXDIZC-
```

#### Modes

| OpCode | Syntax       | Addressing     | Bytes | Cycles |
|--------|--------------|----------------|-------|--------|
| `0xE2` | `sep #const` | Immediate      | 2     | 3      |
