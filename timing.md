
## Master Clock

- NTSC = 21.477MHz
- PAL  = 21.28137MHz





## CPU

- IO Cycle       = 6 Master Cycles (does this mean 1 "cycle" from docs is actually 6 master cycles?)
- Memory Access  = 6 / 8 / 12 Master Cycles





## PPU

- 340 dots per scanline
- outputs 1 dot every 4 cycles for dots 22-277(?) on scanlines 1-224 or 1-239
- dots 323 and 327 are normally 6 cycles
- seems to access memory 2-3 tiles ahead of pixel output





## APU (spc700)

1.024MHz (1.0269MHz ?)

- 3 timers
	- 64000Hz (every 16 cycles) and 2x 8000Hz (every 128 cycles)
- dsp outputs sames at ~32000Hz (every 32 cycles?)






## Other Stuff

1 Scanline = 1364 Master Cycles

(except in non-interlace mode scanline $f0 of every other frame (those with $213f.7=1) is only 1360 cycles)

1 Frame = 262 Scanlines

(in non-interlace mode, while in interlace mode frames with $213f.7=0 are 263 scanlines)

V-Blank scanline $e1 or $f0 until end of frame

CPU pauses for 40 cycles beginning ~536 cycles after the start of each scanline.
(Current theory is that this is used for WRAM Refresh. The exact timing is that the refresh pause begins at 538
cycles into the first scanline of the first frame, and thereafter some multiple of 8 cycles after the previous pause
that comes closest to 536.)

VRAM Access takes 4 cycles




