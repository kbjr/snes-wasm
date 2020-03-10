
# Primary Addressing Modes

This folder contains functions for emulating the primary addressing modes of the CPU.



## Immediate

In immediate addressing, the effective address is the Program Counter (`PC`). A one byte operand is read from immediately after the opcode itself, incrementing the Program Counter as it reads.

| Syntax      | Addressing Method    | Operand | Effective Address |
|-------------|----------------------|---------|-------------------|
| `op #const` | `addr_immediate_u8`  | 1 Byte  | `$PBR:$(PC++)`    |
| `op #const` | `addr_immediate_u16` | 2 Bytes | `$PBR:$(PC+=2)`   |




## Absolute

In absolute addressing, the effective address is read from the operand bytes. In the 2 byte operand modes, the operand address is assumed to be in the Data Bank Register (`DBR`) bank. In the 3 byte modes, the full 24-bit address comes from the operand.

| Syntax      | Addressing Method           | Operand | Effective Address  |
|-------------|-----------------------------|---------|--------------------|
| `op addr`   | `addr_absolute`             | 2 Bytes | `$DBR:$(op)`       |
| `op addr,X` | `addr_absoluteIndexedX`     | 2 Bytes | `$DBR:$(op + X)`   |
| `op addr,Y` | `addr_absoluteIndexedY`     | 2 Bytes | `$DBR:$(op + Y)`   |
| `op long`   | `addr_absoluteLong`         | 3 Bytes | `$(op)`            |
| `op long,X` | `addr_absoluteLongIndexedX` | 3 Bytes | `$(op + X)`        |
| `op long,Y` | `addr_absoluteLongIndexedY` | 3 Bytes | `$(op + Y)`        |




## Direct Page

In direct page addressing, the effective (or indirect) address is calculated relative to the Direct Page Register (`D`).

| Syntax      | Addressing Method                     | Operand | Indirect Address    | Effective Address   |
|-------------|---------------------------------------|---------|---------------------|---------------------|
| `op dp`     | `addr_directPage`                     | 1 Byte  | N/A                 | `$00:$(D + op)`     |
| `op dp,X`   | `addr_directPageIndexedX`             | 1 Byte  | N/A                 | `$00:$(D + op + X)` |
| `op dp,Y`   | `addr_directPageIndexedY`             | 1 Byte  | N/A                 | `$00:$(D + op + Y)` |
| `op (dp)`   | `addr_directPageIndirect`             | 1 Byte  | `$00:$(D + op)`     | `$DBR:$(ind16)`     |
| `op (dp,X)` | `addr_directPageIndexedIndirectX`     | 1 Byte  | `$00:$(D + op + X)` | `$DBR:$(ind16)`     |
| `op (dp),Y` | `addr_directPageIndirectIndexedY`     | 1 Byte  | `$00:$(D + op)`     | `$DBR:$(ind16 + Y)` |
| `op [dp]`   | `addr_directPageIndirectLong`         | 1 Byte  | `$00:$(D + op)`     | `$(ind24)`          |
| `op [dp],X` | `addr_directPageIndirectLongIndexedX` | 1 Byte  | `$00:$(D + op)`     | `$(ind24 + X)`      |
| `op [dp],Y` | `addr_directPageIndirectLongIndexedY` | 1 Byte  | `$00:$(D + op)`     | `$(ind24 + Y)`      |


### Indirect Addressing

The addressing modes that make use of indirect addresses all work roughly the same way. A first, indirect address is calculated, and 16 or 24 bits are read from that location (indicated above by `ind16` or `ind24`) to derive the effective address.




## Stack Relative

In stack relative addressing, the effective (or indirect) address is calculated relative to the Stack Pointer Register (`S`).

| Syntax        | Addressing Method                    | Operand | Indirect Address    | Effective Address   |
|---------------|--------------------------------------|---------|---------------------|---------------------|
| `op sr,S`     | `addr_stackRelative`                 | 1 Byte  | N/A                 | `$00:$(S + op)`     |
| `op (sr,S),X` | `addr_stackRelativeIndirectIndexedX` | 1 Byte  | `$00:$(S + op)`     | `$DBR:$(ind16 + X)` |
| `op (sr,S),Y` | `addr_stackRelativeIndirectIndexedY` | 1 Byte  | `$00:$(S + op)`     | `$DBR:$(ind16 + Y)` |


### Indirect Addressing

The addressing modes that make use of indirect addresses all work roughly the same way. A first, indirect address is calculated, and 16 are read from that location (indicated above by `ind16`) to derive the effective address.







## Program Counter Relative

In program counter relative addressing, the effective address is the sum of the operand (interpreted as a signed integer) and the Program Counter Register (`PC`). The bank is always the Program Bank Register (`PBR`) bank.

| Syntax         | Addressing Method                 | Operand          | Effective Address  |
|----------------|-----------------------------------|------------------|--------------------|
| `op nearlabel` | `addr_programCounterRelative`     | 1 Byte  (signed) | `$PBR:$(PC + op)`  |
| `op label`     | `addr_programCounterRelativeLong` | 2 Bytes (signed) | `$PBR:$(PC + op)`  |







# Other Addressing Modes

Not all addressing modes are handled here. Specifically, block move addressing and all of the various stack operation addressing modes are implemented directly in their instructions.



## Block Move

Block move addressing is used by block move instructions (`mvn` and `mvp`). In this addressing mode, the 2 1-byte operands are the source and destination banks, and the addresses are derived from the `X`, `Y` and `C` registers.

| Syntax            | Addressing Method | Operand | Effective Address |
|-------------------|-------------------|---------|-------------------|
| `op srcbk,destbk` | N/A               | 2 Bytes | _see below_       |

### Operand Order

Despite the assembler instrution sytax list the source bank before the destination bank, the compiled machine code actually lists the operands in the other order, with the destination bank preceeding the source bank.

### Addresses

The block move instructions `mvn` and `mvp` both copy a block of memory from one location to another. The banks that are read/written to are controlled by the instruction operands. The remaining lower 16 bits of the addresses are determined by the `X` (source address) and `Y` (destination address) registers, and the number of bytes to copy is determined by the full Accumulator (`C`). For each byte copied, the `X` and `Y` registers are incremented or decremented to seek forwards (`mvn`) or backwards (`mvp`) through memory. The Accumulator is then decremented. This process continues until `C` becomes `$FFFF`




## Stack (...)

For the most point, the stack addressing modes are just the same as other addressing modes, except that they additionally, implicitly reference the current Stack Pointer in order to push or pop values on the stack.


