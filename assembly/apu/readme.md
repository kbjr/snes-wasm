

# cpu

## ntsc

### input

21,477,270 (21.47727MHz)

### bus

- 3,580,000 (3.580MHz)
- 2,680,000 (2.680MHz)
- 1,790,000 (1.790MHz)

## pal

### input

21,281,370 (21.28137MHz)

### bus

- 3,550,000 (3.550MHz)
- 2,660,000 (2.660MHz)
- 1,770,000 (1.770MHz)





# ppu

## frequency

- same clock as cpu
- generates a pixel every 2 to 4 cycles

## background modes

- Mode 0: 4 layers, all using 4-color palettes. Each BG uses its own section of the SNES palette. Up to
	96 colors can be displayed on the backgrounds, 24 colors per layer.
- Mode 1: 3 layers, two using 16-color palettes and one using 4-color palettes. Up to 120 colors can be
	displayed by first two layers and 24 colors by third layer.
- Mode 2: 2 layers, both using 16-color palettes. Each tile can be individually scrolled. Up to 120 colors
	can be displayed on screen.
- Mode 3: 2 layers, one using the full 256-color palette and one using 16-color palettes. The 256-color
	layer can also directly specify colors from an 11-bit (RGB443) colorspace. Up to 256 colors displayed by
	first layer and 120 colors by second layer.
- Mode 4: 2 layers, one using the full 256-color palette and one using 4-color palettes. The 256-color
	layer can directly specify colors, and each tile can be individually scrolled. Up to 256 colors displayed by
	first layer and 24 colors by second layer.
- Mode 5: 2 layers, one using 16-color palettes and one using 4-color palettes. Tile decoding is altered to
	facilitate use of the 512-width and interlaced resolutions. Up to 120 colors displayed by first layer and 
	24 colors by second layer.
- Mode 6: 1 layer, using 16-color palettes. Tile decoding is as in Mode 5, and each tile can be individually
	scrolled. Up to 120 colors can be displayed on screen.
- Mode 7: 1 layer of 128×128 tiles of size 8×8 from a set of 256, which may be interpreted as a 256-color
	one-plane layer or a 128-color two-plane layer. The layer may be rotated and scaled using matrix
	transformations. A programming technique called HDMA can be used to change the matrix parameters for
	each scanline in order to generate perspective effects.

## resolutions

### progressive  

- 256 x 224 (8:7)
- 512 x 224 (16:7)
- 512 x 239 (512:239)

### interlaced

- 512 x 448 (8:7)
- 512 x 478 (256:239)

## pixel depth

- 2, 4, 7, or 8 bpp indexed
- 8 or 11 bpp direct

## sprites

- 128 total
- 32 max per line
- up to 64 x 64 pixels

## backgrounds

- up to 4 planes
- each up to 1024 x 1024 px






# apu (S-SMP)

## from bsnes

Thread Frequency: 32040.0 * 768.0 (24,606,720)

## frequencies

- input: 24,576,000 (24.576MHz)
- spc700: 1,024,000 (1.024MHz)

## output

- 8 channels
- stereo
