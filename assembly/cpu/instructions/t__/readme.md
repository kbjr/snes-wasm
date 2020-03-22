
## `tax`

**Transfer Accumulator to Index Register X**

Transfer the value in the Accumulator to Index Register X.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0xAA` | `tax`  | Implied          | 1     | 2      |






## `tay`

**Transfer Accumulator to Index Register Y**

Transfer the value in the Accumulator to Index Register Y.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0xA8` | `tax`  | Implied          | 1     | 2      |






## `tcd`

**Transfer 16-bit Accumulator to Direct Page Register**

Transfer the value in the full Accumulator (`C`) to the Direct Page Register.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0x5B` | `tcd`  | Implied          | 1     | 2      |






## `tcs`

**Transfer Accumulator to Stack Pointer Register**

Transfer the value in the Accumulator to the Stack Pointer Register. This instruction does not look at the `M` flag, and in Native mode will always copy the full 16-bit Accumulator. In Emulation mode, only the low byte `A` is transfered.

#### Affected Flags

```
---------
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0x1B` | `tcs`  | Implied          | 1     | 2      |






## `tdc`

**Transfer Direct Page Register to 16-bit Accumulator**

Transfer the value in the Direct Page Register to the Accumulator `C`.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0x7B` | `tdc`  | Implied          | 1     | 2      |

















/**
 * tyx
 * Transfer Index Register Y to X Instruction
 *
 * Opcode:     0xBB
 * Flags:      n-----z--
 * Addressing: Implied
 * Bytes:      1
 * Cycles:     2
 *
 *     tyx
 *
 * Transfer the value in index register Y to index register X.
 */