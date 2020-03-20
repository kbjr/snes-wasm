
## clc

Clear Carry

Clears the carry bit of the Processor Status (P) Register, setting it to 0

#### Affected Flags

```
-------C-
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0x18` | `clc`  | Implied          | 1     | 2      |


## cld

Clear Decimal

Clears the decimal bit of the Processor Status (P) Register, setting it to 0

#### Affected Flags

```
----D----
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0xD8` | `cld`  | Implied          | 1     | 2      |


## cli

Clear IRQ Disable

Clears the IRQ disable bit of the Processor Status (P) Register, setting it to 0

#### Affected Flags

```
-----I---
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0x58` | `cli`  | Implied          | 1     | 2      |


## clv

Clear Overflow

Clears the Overflow bit of the Processor Status (P) Register, setting it to 0

#### Affected Flags

```
-V-------
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0xB8` | `clv`  | Implied          | 1     | 2      |
