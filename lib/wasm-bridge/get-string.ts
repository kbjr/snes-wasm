
// 
// Get string implementation, borrowed from AssemblyScript loader
// 

import { p } from './types';

const sizeOffset = -4;
const chunkSize = 1024;

export const getString = (buffer: ArrayBuffer, pointer: p) : string => {
	const u32 = new Uint32Array(buffer);
	const u16 = new Uint16Array(buffer);

	let length = u32[(pointer + sizeOffset) >>> 2] >>> 1;
	let offset = pointer >>> 1;

	if (length <= chunkSize) {
		return String.fromCharCode.apply(String, u16.subarray(offset, offset + length));
	}

	const parts = [];

	do {
		const last = u16[offset + chunkSize - 1];
		const size = last >= 0xD800 && last < 0xDC00 ? chunkSize - 1 : chunkSize;
		parts.push(String.fromCharCode.apply(String, u16.subarray(offset, offset += size)));
		length -= size;
	}
	while (length > chunkSize);

	return parts.join('') + String.fromCharCode.apply(String, u16.subarray(offset, offset + length));
};
