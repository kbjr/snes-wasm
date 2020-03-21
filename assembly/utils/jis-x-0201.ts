
import { p } from '../mem';

/**
 * Decodes a JIS X 0201 string
 *
 * @param offset The offset to start reading from
 * @param size The number of bytes to read
 * @see https://en.wikipedia.org/wiki/JIS_X_0201
 */
export function decodeJisX0201(offset: p, size: i32) : string {
	const chars: string[] = [ ];

	for (let i = 0; i < size; i++) {
		const byte = load<u8>(offset + i);

		// Most 7-bit characters map exactly to ASCII
		if (byte < 0x80) {
			// First, check for any of the exception cases
			switch (byte) {
				// Yen symbol
				case 0x5c:
					chars[i] = '\u00A5';
					break;

				// Overilne symbol
				case 0x7e:
					chars[i] = '\u203e';
					break;

				// Otherwise, just decode it as ASCII
				default:
					chars[i] = String.fromCharCode(byte);
			}

			continue;
		}

		// Check for some invalid characters
		if ((byte >= 0x80 && byte <= 0xa0) || byte >= 0xe0) {
			chars[i] = ' ';
		}

		// If we have a valid 8-bit character, we need to map it to the correct unicode value
		chars[i] = decode_highBitChar(byte);
	}

	return chars.join('');
};

function decode_highBitChar(char: u8) : string {
	switch (char) {
		case 0xa1: return '\u3002';
		case 0xa2: return '\u300c';
		case 0xa3: return '\u300d';
		case 0xa4: return '\u3001';
		case 0xa5: return '\u30fb';
		case 0xa6: return '\u30f2';
		case 0xa7: return '\u30a1';
		case 0xa8: return '\u30a3';
		case 0xa9: return '\u30a5';
		case 0xaa: return '\u30a7';
		case 0xab: return '\u30a9';
		case 0xac: return '\u30e3';
		case 0xad: return '\u30e5';
		case 0xae: return '\u30e7';
		case 0xaf: return '\u30c3';
		case 0xb0: return '\u30fc';
		case 0xb1: return '\u30a2';
		case 0xb2: return '\u30a4';
		case 0xb3: return '\u30a6';
		case 0xb4: return '\u30a8';
		case 0xb5: return '\u30aa';
		case 0xb6: return '\u30ab';
		case 0xb7: return '\u30ad';
		case 0xb8: return '\u30af';
		case 0xb9: return '\u30b1';
		case 0xba: return '\u30b3';
		case 0xbb: return '\u30b5';
		case 0xbc: return '\u30b7';
		case 0xbd: return '\u30b9';
		case 0xbe: return '\u30bb';
		case 0xbf: return '\u30bd';
		case 0xc0: return '\u30bf';
		case 0xc1: return '\u30c1';
		case 0xc2: return '\u30c3';
		case 0xc3: return '\u30c6';
		case 0xc4: return '\u30c8';
		case 0xc5: return '\u30ca';
		case 0xc6: return '\u30cb';
		case 0xc7: return '\u30cc';
		case 0xc8: return '\u30cd';
		case 0xc9: return '\u30ce';
		case 0xca: return '\u30cf';
		case 0xcb: return '\u30d2';
		case 0xcc: return '\u30d5';
		case 0xcd: return '\u30d8';
		case 0xce: return '\u30db';
		case 0xcf: return '\u30de';
		case 0xd0: return '\u30df';
		case 0xd1: return '\u30e0';
		case 0xd2: return '\u30e1';
		case 0xd3: return '\u30e2';
		case 0xd4: return '\u30e4';
		case 0xd5: return '\u30e6';
		case 0xd6: return '\u30e8';
		case 0xd7: return '\u30e9';
		case 0xd8: return '\u30ea';
		case 0xd9: return '\u30eb';
		case 0xda: return '\u30ec';
		case 0xdb: return '\u30ed';
		case 0xdc: return '\u30ef';
		case 0xdd: return '\u30f3';
		case 0xde: return '\u309b';
		case 0xdf: return '\u309c';
	}

	return ' ';
}
