
/** The pointer to the next available memory segment in system memory */
let offset: i32 = 0;

/** The maximum valid offset within the system memory segment */
const maxSystemMemory: i32 = 0x7fffff

/** The pointer to the next available memory segment in cartridge memory */
let cartOffset: i32 = 0;

/** The maximum valid offset withing the cartridge memory segment */
const maxCartridgeMemory: i32 = 0xffffff;

/** Alias of i32; This is a pointer into reserved memory */
export type p = i32;

/**
 * Allocates a chunk of memory from the reserved system memory segment.
 * 
 * @param size The number of bytes to allocate
 */
export function alloc(size: i32) : p {
	if (offset + size > maxSystemMemory) {
		throw new Error(`Failed to allocate ${size} bytes of memory in the reserved system segment; Out of bounds`);
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

/**
 * Allocates a chunk of memory from the reserved cartridge memory segment.
 * 
 * @param size The number of bytes to allocate
 */
export function alloc_cart(size: i32) : p {
	if (cartOffset + size > maxCartridgeMemory) {
		throw new Error(`Failed to allocate ${size} bytes of memory in the reserved cartridge segment; Out of bounds`);
	}

	const pointer = cartOffset;

	// Move the offset pointer forward the amount requested
	cartOffset += size;

	if (cartOffset & 0x7) {
		cartOffset |= 0x7;
		cartOffset++;
	}

	return pointer;
}

/**
 * Release and zero fill all of cartridge memory. This is done when a cartridge is
 * ejected and we need to reset in preparation for the next cartridge.
 */
export function freeall_cart() : void {
	cartOffset = maxSystemMemory + 1;

	for (let i = cartOffset; i < maxCartridgeMemory; i += 4) {
		store<u32>(i, 0);
	}
}
