






#### Various Random Notes

- WRAM responds to Address Bus A whenever /WRAM is active, and to registers $2180–$2183 on Address Bus B
- APU responds to $40–$7F on Address Bus B
- PPU1 and PPU2 respond to $2100–$213F on Address Bus B
- The cart is expected to respond when /CART is active, but it can respond to any address on either bus that is not otherwise mapped
- Similarly, the device plugged into the expansion port may respond to any unmapped register on Address Bus B.


|  Banks  |  Addresses  | Speed | Mapping
|---------|-------------|-------|---------
| $00-$3F | $0000-$1FFF | Slow  | Address Bus A + /WRAM (mirror $7E:0000-$1FFF)
|         | $2000-$20FF | Fast  | Address Bus A
|         | $2100-$21FF | Fast  | Address Bus B
|         | $2200-$3FFF | Fast  | Address Bus A
|         | $4000-$41FF | XSlow | Internal CPU registers (see Note 1 below)
|         | $4200-$43FF | Fast  | Internal CPU registers (see Note 1 below)
|         | $4400-$5FFF | Fast  | Address Bus A
|         | $6000-$7FFF | Slow  | Address Bus A
|         | $8000-$FFFF | Slow  | Address Bus A + /CART
|---------|-------------|-------|---------
| $40-$7D | $0000-$FFFF | Slow  | Address Bus A + /CART
|---------|-------------|-------|---------
| $7E-$7F | $0000-$FFFF | Slow  | Address Bus A + /WRAM
|---------|-------------|-------|---------
| $80-$BF | $0000-$1FFF | Slow  | Address Bus A + /WRAM (mirror $7E:0000-$1FFF)
|         | $2000-$20FF | Fast  | Address Bus A
|         | $2100-$21FF | Fast  | Address Bus B
|         | $2200-$3FFF | Fast  | Address Bus A
|         | $4000-$41FF | XSlow | Internal CPU registers (see Note 1 below)
|         | $4200-$43FF | Fast  | Internal CPU registers (see Note 1 below)
|         | $4400-$5FFF | Fast  | Address Bus A
|         | $6000-$7FFF | Slow  | Address Bus A
|         | $8000-$FFFF | Note2 | Address Bus A + /CART
|---------|-------------|-------|---------
| $C0-$FF | $0000-$FFFF | Note2 | Address Bus A + /CART

 Note 1: The address for internal CPU registers may go out Address Bus A, however the CPU ignores the data bus. It is
 unknown whether the data bus is ignored for the whole memory region, or just for those addresses which are actually
 registers. It is also unknown whether CPU writes show up on the data bus or not. Current theory is that addresses and
 writes will show up, but reads may or may not, and the data bus is only ignored for those bits of those registers actually
 mapped (e.g., data bus is ignored for only bit 7 of $4211).

 Note 2: If bit 1 of CPU register $420d is set, the speed is Fast, otherwise it is Slow.