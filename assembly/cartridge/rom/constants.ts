
import { p } from '../../mem';

/** The location of the ROM header for different mapping modes */
export namespace header_offset {
	// @ts-ignore: decorator
	@inline export const LoROM: p = 0x7000;
	// @ts-ignore: decorator
	@inline export const HiROM: p = 0xf000;
	// @ts-ignore: decorator
	@inline export const ExLoROM: p = 0x407000;
	// @ts-ignore: decorator
	@inline export const ExHiROM: p = 0x40f000;
}

/** The locations of various values in ROM header */
export namespace header_field {
	// @ts-ignore: decorator
	@inline export const MakerCode: p           = 0xfb0;
	// @ts-ignore: decorator
	@inline export const GameCode: p            = 0xfb2;
	// @ts-ignore: decorator
	@inline export const FixedValueA: p         = 0xfb6;
	// @ts-ignore: decorator
	@inline export const ExpRamSize: p          = 0xfbd;
	// @ts-ignore: decorator
	@inline export const SpecialVersion: p      = 0xfbe;
	// @ts-ignore: decorator
	@inline export const CartridgeTypeSub: p    = 0xfbf;
	// @ts-ignore: decorator
	@inline export const GameTitle: p           = 0xfc0;
	// @ts-ignore: decorator
	@inline export const MapMode: p             = 0xfd5;
	// @ts-ignore: decorator
	@inline export const CartridgeType: p       = 0xfd6;
	// @ts-ignore: decorator
	@inline export const RomSize: p             = 0xfd7;
	// @ts-ignore: decorator
	@inline export const SramSize: p            = 0xfd8;
	// @ts-ignore: decorator
	@inline export const DestinationCode: p     = 0xfd9;
	// @ts-ignore: decorator
	@inline export const FixedValueB: p         = 0xfda;
	// @ts-ignore: decorator
	@inline export const MaskRomVersion: p      = 0xfdb;
	// @ts-ignore: decorator
	@inline export const ChecksumCompliment: p  = 0xfdc;
	// @ts-ignore: decorator
	@inline export const Checksum: p            = 0xfde;
}

/** The locations of the Native mode exception vectors, relative to the ROM header */
export namespace native_exception_vector {
	// @ts-ignore: decorator
	@inline export const cop: p   = 0xfe4;
	// @ts-ignore: decorator
	@inline export const brk: p   = 0xfe6;
	// @ts-ignore: decorator
	@inline export const abort: p = 0xfe8;
	// @ts-ignore: decorator
	@inline export const nmi: p   = 0xfea;
	// @ts-ignore: decorator
	@inline export const irq: p   = 0xfee;
}

/** The locations of the Emulation mode exception vectors, relative to the ROM header */
export namespace emu_exception_vector {
	// @ts-ignore: decorator
	@inline export const cop: p    = 0xff4;
	// @ts-ignore: decorator
	@inline export const brk: p    = 0xfee;
	// @ts-ignore: decorator
	@inline export const abort: p  = 0xfe8;
	// @ts-ignore: decorator
	@inline export const nmi: p    = 0xfea;
	// @ts-ignore: decorator
	@inline export const reset: p  = 0xfec;
	// @ts-ignore: decorator
	@inline export const irq: p    = 0xfee;
}

/** The ROM type, for memory mapping purposes */
export namespace map_mode {
	// @ts-ignore: decorator
	@inline export const FastROM: u8 = 0x10;
	// @ts-ignore: decorator
	@inline export const LoROM: u8   = 0x20;
	// @ts-ignore: decorator
	@inline export const HiROM: u8   = 0x21;
	// @ts-ignore: decorator
	@inline export const SA1ROM: u8  = 0x23;
	// @ts-ignore: decorator
	@inline export const ExLoROM: u8 = 0x32;
	// @ts-ignore: decorator
	@inline export const ExHiROM: u8 = 0x35;
}

/** The feature set of a particular cartridge */
export namespace rom_features {
	// @ts-ignore: decorator
	@inline export const rom: u8               = 0x00;
	// @ts-ignore: decorator
	@inline export const rom_ram: u8           = 0x01;
	// @ts-ignore: decorator
	@inline export const rom_ram_sram: u8      = 0x02;
	// @ts-ignore: decorator
	@inline export const rom_chip: u8          = 0x03;
	// @ts-ignore: decorator
	@inline export const rom_chip_ram: u8      = 0x04;
	// @ts-ignore: decorator
	@inline export const rom_chip_ram_sram: u8 = 0x05;
	// @ts-ignore: decorator
	@inline export const rom_chip_sram: u8     = 0x06;
}

/** The type of onboard enhancement chip in a cartridge */
export namespace enhancement_chip {
	// @ts-ignore: decorator
	@inline export const DSP: u8     = 0x00;
	// @ts-ignore: decorator
	@inline export const SuperFX: u8 = 0x10;
	// @ts-ignore: decorator
	@inline export const OBC1: u8    = 0x20;
	// @ts-ignore: decorator
	@inline export const SA1: u8     = 0x30;
	// @ts-ignore: decorator
	@inline export const Other: u8   = 0xe0;
	// @ts-ignore: decorator
	@inline export const Custom: u8  = 0xf0;
}

/** Represents where the cartridge was intended to be sold */
export namespace destination {
	// @ts-ignore: decorator
	@inline export const Japan: u8             = 0x00;
	// @ts-ignore: decorator
	@inline export const NorthAmerica: u8      = 0x01;
	// @ts-ignore: decorator
	@inline export const Europe: u8            = 0x02;
	// @ts-ignore: decorator
	@inline export const SwedenScandinavia: u8 = 0x03;
	// @ts-ignore: decorator
	@inline export const Finland: u8           = 0x04;
	// @ts-ignore: decorator
	@inline export const Denmark: u8           = 0x05;
	// @ts-ignore: decorator
	@inline export const France: u8            = 0x06;
	// @ts-ignore: decorator
	@inline export const Netherlands: u8       = 0x07;
	// @ts-ignore: decorator
	@inline export const Spain: u8             = 0x08;
	// @ts-ignore: decorator
	@inline export const Germany: u8           = 0x09;
	// @ts-ignore: decorator
	@inline export const Italy: u8             = 0x0a;
	// @ts-ignore: decorator
	@inline export const China: u8             = 0x0b;
	// @ts-ignore: decorator
	@inline export const Indonesia: u8         = 0x0c;
	// @ts-ignore: decorator
	@inline export const Korea: u8             = 0x0d;
	// @ts-ignore: decorator
	@inline export const Global: u8            = 0x0e;
	// @ts-ignore: decorator
	@inline export const Canada: u8            = 0x0f;
	// @ts-ignore: decorator
	@inline export const Brazil: u8            = 0x10;
	// @ts-ignore: decorator
	@inline export const Australia: u8         = 0x11;
	// @ts-ignore: decorator
	@inline export const Other1: u8            = 0x12;
	// @ts-ignore: decorator
	@inline export const Other2: u8            = 0x13;
	// @ts-ignore: decorator
	@inline export const Other3: u8            = 0x14;
}
