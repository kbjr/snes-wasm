
// TODO: Do I actually want this ?

/**
 * Block Move Addressing
 *
 *     op srcbk,destbk
 *
 * Used for block move operations. Returns the destination and source banks. Despite
 * assembler ordering the operands src, then dest, the actual compiled operands are
 * dest, then src.
 */
// public addr_blockMove() : [ ui8, ui8 ] {
// 	// Read the two operands (our destination [0] and source [1] banks)
// 	return [
// 		this.immediate_read_ui8(),
// 		this.immediate_read_ui8()
// 	];
// }
