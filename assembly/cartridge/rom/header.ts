
import { p, p_null } from '../../mem';
import { p_rom, rom_size } from './mem';
import { emu_exception_vector, header_field, map_mode, header_offset, native_exception_vector } from './constants';
import { decodeJisX0201 } from '../../utils/jis-x-0201';

/** Locates the ROM header and updates `p_header` to contain the address */
export function findHeader() : void {
	const lorom: i8 = scoreHeader(header_offset.LoROM);
	const hirom: i8 = scoreHeader(header_offset.HiROM);
	const exlorom: i8 = scoreHeader(header_offset.ExLoROM);
	const exhirom: i8 = scoreHeader(header_offset.ExHiROM);

	if (lorom > hirom && lorom > exlorom && lorom > exhirom) {
		header.p_header = p_rom + header_offset.LoROM;
	}

	else if (hirom > exlorom && hirom > exhirom) {
		header.p_header = p_rom + header_offset.HiROM;
	}

	else if (exlorom > exhirom) {
		header.p_header = p_rom + header_offset.ExLoROM;
	}

	else if (exhirom > 0) {
		header.p_header = p_rom + header_offset.ExHiROM;
	}

	else {
		throw new Error('Invalid ROM; Failed to locate a valid SNES header');
	}
}

export namespace header {
	/** The location of the SNES ROM header in memory */
	export let p_header: p = p_null;

	/** The memory mapping mode. Contains flags for LoROM/HiROM and FastROM */
	export function getMapMode() : u8 {
		return load<u8>(p_header, header_field.MapMode);
	}

	/**  */
	export function getMakerCode() : u8 {
		return load<u8>(p_header, header_field.MakerCode);
	}

	/**  */
	export function getGameCode() : u32 {
		return load<u32>(p_header, header_field.GameCode);
	}

	/** Special version number for the cartridge */
	export function getSpecialVersion() : u8 {
		return load<u8>(p_header, header_field.SpecialVersion);
	}

	/** Contains info about onboard hardware */
	export function getCartridgeType() : u8 {
		return load<u8>(p_header, header_field.CartridgeType);
	}

	/**  */
	export function getCartridgeTypeSub() : u8 {
		return load<u8>(p_header, header_field.CartridgeTypeSub);
	}

	/** The game title parsed from the SNES header */
	export function getGameTitle() : string {
		return decodeJisX0201(p_header + header_field.GameTitle, 21);
	}

	/**  */
	export function getMaskRomVersion() : u8 {
		return load<u8>(p_header, header_field.MaskRomVersion);
	}

	/** The 16-bit compliment (bit-inverse) of the checksum */
	export function getChecksumCompliment() : u16 {
		return load<u16>(p_header, header_field.ChecksumCompliment);
	}

	/**
	 * ROM checksum
	 * 
	 * Calculated as the 16-bit sum of all bytes in the ROM.
	 * For power-of-two-sized ROMs, no mirroring is used, each byte of ROM is counted exactly once.
	 * For non-power-of-two-sized ROMs, first the checksum for the largest power-of-2 area smaller
	 * than the ROM size (so 4MB for 6MB ROMs, 2MB for 2.5MB ROMs) is computed normally. Then the
	 * remaining part is repeated until it's the same size as the first part (so the last 2MB of a
	 * 6MB ROM is repeated once so both halves are 4MB, and the last 512KB of a 2.5MB ROM is repeated
	 * 4 times so both halves are 2MB). Then its checksum is computed and the checksums of the 2
	 * halves are added to get the final checksum.
	 */
	export function getChecksum() : u16 {
		return load<u16>(p_header, header_field.Checksum);
	}

	/** Represents where the cartridge was intended to be sold */
	export function getDestinationCode() : u8 {
		return load<u8>(p_header, header_field.DestinationCode);
	}

	/**  */
	export function getExpRamSize() : u8 {
		return load<u8>(p_header, header_field.ExpRamSize);
	}

	/**  */
	export function getSramSize() : u8 {
		return load<u8>(p_header, header_field.SramSize);
	}

	export namespace exception_vector {
		export namespace native {
			export function COP() : u16 {
				return load<u16>(p_header, native_exception_vector.cop);
			}

			export function BRK() : u16 {
				return load<u16>(p_header, native_exception_vector.brk);
			}

			export function ABORT() : u16 {
				return load<u16>(p_header, native_exception_vector.abort);
			}

			export function NMI() : u16 {
				return load<u16>(p_header, native_exception_vector.nmi);
			}

			export function IRQ() : u16 {
				return load<u16>(p_header, native_exception_vector.irq);
			}
		}

		export namespace emulation {
			export function COP() : u16 {
				return load<u16>(p_header, emu_exception_vector.cop);
			}

			export function BRK() : u16 {
				return load<u16>(p_header, emu_exception_vector.brk);
			}

			export function ABORT() : u16 {
				return load<u16>(p_header, emu_exception_vector.abort);
			}

			export function NMI() : u16 {
				return load<u16>(p_header, emu_exception_vector.nmi);
			}

			export function RESET() : u16 {
				return load<u16>(p_header, emu_exception_vector.reset);
			}

			export function IRQ() : u16 {
				return load<u16>(p_header, emu_exception_vector.irq);
			}
		}
	}
}

/**
 * Scores a potential header location for how likely it is to actually be the header.
 * This heuristic is largely based on the one used by bsnes, with some alterations.
 * 
 * @param offset The header offset to look at for the supposed header
 */
function scoreHeader(offset: p) : i8 {
	let score: i8 = 0;

	// If the ROM isn't large enough to even fit a header here, just give up
	if (rom_size < offset + 0xfff) {
		return score;
	}

	// Grab the supposed RESET vector
	const reset = load<u16>(p_rom + offset, emu_exception_vector.reset);
	
	// If the RESET vector doesn't point somewhere that could possibly be
	// ROM data, then this isn't a valid header
	if (reset < 0x8000) {
		return score;
	}

	// Look at the first opcode that would be located at the RESET vector and see
	// if it looks like a likely first instruction
	const opcode = load<u8>(p_rom + (offset & 0xff8000) | <i32>(reset & 0x7fff));

	switch (opcode) {
		// Very likely op codes
		case 0x78:  // sei
		case 0x18:  // clc (clc; xce)
		case 0x38:  // sec (sec; xce)
		case 0x9c:  // stz $nnnn (stz $4200)
		case 0x4c:  // jmp $nnnn
		case 0x5c:  // jml $nnnnnn
			score += 8;
			break;
		
		// Likely op codes
		case 0xc2:  // rep #$nn
		case 0xe2:  // sep #$nn
		case 0xad:  // lda $nnnn
		case 0xae:  // ldx $nnnn
		case 0xac:  // ldy $nnnn
		case 0xaf:  // lda $nnnnnn
		case 0xa9:  // lda #$nn
		case 0xa2:  // ldx #$nn
		case 0xa0:  // ldy #$nn
		case 0x20:  // jsr $nnnn
		case 0x22:  // jsl $nnnnnn
			score += 4;
			break;

		// Unlikely op codes
		case 0x40:  // rti
		case 0x60:  // rts
		case 0x6b:  // rtl
		case 0xcd:  // cmp $nnnn
		case 0xec:  // cpx $nnnn
		case 0xcc:  // cpy $nnnn
			score -= 4;
			break;
		
		// Very unlikely op codes
		case 0x00:  // brk #$nn
		case 0x02:  // cop #$nn
		case 0xdb:  // stp
		case 0x42:  // wdm
		case 0xff:  // sbc $nnnnnn,x
			score -= 8;
			break;
	}

	// Validate that the checksum compliment is actually the compliment of the checksum
	const checksum = load<u16>(p_rom + offset, header_field.Checksum);
	const checksumCompliment = load<u16>(p_rom + offset, header_field.ChecksumCompliment);
	
	if ((checksum ^ 0xffff) === checksumCompliment) {
		score += 4;
	}

	// If the map mode byte agrees with where we're looking, that's a good sign (clear
	// the FastROM bit here so we can just look at the location info)
	const mapMode = load<u8>(p_rom + offset, header_field.MapMode) & (map_mode.FastROM ^ 0xff);
	
	if (
		(offset === header_offset.LoROM   && mapMode === map_mode.LoROM)   ||
		(offset === header_offset.HiROM   && mapMode === map_mode.HiROM)   ||
		(offset === header_offset.ExLoROM && mapMode === map_mode.ExLoROM) ||
		(offset === header_offset.ExHiROM && mapMode === map_mode.ExHiROM)
	) {
		score += 2;
	}

	// If anything about this looks remotely like ExLoROM or ExHiROM, automatically
	// assume that that is more likely
	if (score && offset === header_offset.ExLoROM || offset === header_offset.ExHiROM) {
		score += 4;
	}

	return score < 0 ? 0 : score;
}
