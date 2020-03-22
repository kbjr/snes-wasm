
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






## `tsc`

**Transfer Stack Pointer Register to 16-bit Accumulator**

Transfer the value in the Stack Pointer Register to the Accumulator `C`. This instruction always transfers the full 16-bits, regardless of the `E` or `M` flags.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0x3B` | `tsc`  | Implied          | 1     | 2      |






## `tsx`

**Transfer Stack Pointer to Index Register X**

Transfer the value in the Stack Pointer Register to the X Index Register.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0xBA` | `tsx`  | Implied          | 1     | 2      |






## `txa`

**Transfer Index Register X to Accumulator**

Transfer the value in the X Index Register to the Accumulator.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0x8A` | `txa`  | Implied          | 1     | 2      |







## `txs`

**Transfer Index Register X to Stack Pointer**

Transfer the value in the X Index Register to the Stack Pointer.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0x9A` | `txs`  | Implied          | 1     | 2      |







## `txy`

**Transfer Index Register X to Y**

Transfer the value in the X Index Register to the Y Index Register.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0x9B` | `txy`  | Implied          | 1     | 2      |







## `tya`

**Transfer Index Register Y to Accumulator**

Transfer the value in the Y Index Register to the Accumulator.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0x98` | `tya`  | Implied          | 1     | 2      |







## `tyx`

**Transfer Index register Y to X**

Transfer the value in the Y Index Register to the X Index Register.

#### Affected Flags

```
N-----Z--
```

#### Modes

| OpCode | Syntax | Addressing       | Bytes | Cycles |
|--------|--------|------------------|-------|--------|
| `0xBB` | `tyx`  | Implied          | 1     | 2      |


