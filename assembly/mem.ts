
/** The pointer to the next available memory segment */
let offset: i32 = 0;

/** The maximum valid offset within the reserved memory segment */
const MAX_OFFSET: i32 = 0xffffff;

/** Alias of i32; Used to semantically describe a pointer within reserved memory */
export type p = i32;

/** Simple enum alias for various word sizes used */
export const enum size {
	byte = 1,
	word = 2,
	long = 3
}

/**
 * Allocates a chunk of memory from the reserved memory segment.
 * 
 * @param size The number of bytes to allocate
 */
export function alloc(size: i32) : p {
	if (offset + size > MAX_OFFSET) {
		throw new Error(`Failed to allocate ${size} bytes of memory in the reserved segment; Out of bounds`);
	}

	const pointer = offset;

	// Move the offset pointer forward the amount requested
	offset += size;

	// Ensure that the next slice will be QWORD aligned
	if (offset & 0x7) {
		offset |= 0x7;
		offset++;
	}

	return pointer;
}
