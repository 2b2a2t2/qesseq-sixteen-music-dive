/*******************************************************************************
 * Size: 16 px
 * Bpp: 1
 * Opts: --bpp 1 --size 16 --font /Users/bat/_BATSEQSC01/SC01Clean/SquareLIneProject/assets/nasalization-rg.otf -o /Users/bat/_BATSEQSC01/SC01Clean/SquareLIneProject/assets/ui_font_FontNasa16.c --format lvgl -r 0x20-0x7f --no-compress --no-prefilter
 ******************************************************************************/

#include "../ui.h"

#ifndef UI_FONT_FONTNASA16
#define UI_FONT_FONTNASA16 1
#endif

#if UI_FONT_FONTNASA16

/*-----------------
 *    BITMAPS
 *----------------*/

/*Store the image of the glyphs*/
static LV_ATTRIBUTE_LARGE_CONST const uint8_t glyph_bitmap[] = {
    /* U+0020 " " */
    0x0,

    /* U+0021 "!" */
    0xff, 0xff, 0x3,

    /* U+0022 "\"" */
    0xde, 0xf7, 0xbd, 0x80,

    /* U+0023 "#" */
    0x22, 0x11, 0x8, 0x84, 0x4f, 0xf9, 0x10, 0x88,
    0x44, 0xff, 0x91, 0x8, 0x84, 0x40,

    /* U+0024 "$" */
    0x8, 0x8, 0x8, 0x7f, 0xc0, 0xc0, 0x7e, 0x3,
    0x3, 0x3, 0xfe, 0x8, 0x8, 0x8,

    /* U+0025 "%" */
    0x70, 0x24, 0x42, 0x22, 0x31, 0x13, 0x8, 0x90,
    0x45, 0x1, 0xdb, 0xc0, 0xa1, 0x9, 0x8, 0x88,
    0x4c, 0x42, 0x41, 0xe0,

    /* U+0026 "&" */
    0x1f, 0x6, 0x30, 0xc6, 0x18, 0xc3, 0xb8, 0x3e,
    0x7, 0x3, 0xe3, 0xe6, 0xd8, 0x7b, 0xe, 0x61,
    0xe7, 0xee,

    /* U+0027 "'" */
    0xff, 0xc0,

    /* U+0028 "(" */
    0x3a, 0x21, 0x8, 0x42, 0x10, 0x84, 0x21, 0x8,
    0x42, 0x10, 0x84, 0x10, 0x70,

    /* U+0029 ")" */
    0xe0, 0x86, 0x10, 0x84, 0x21, 0x8, 0x42, 0x10,
    0x84, 0x21, 0x8, 0x45, 0xc0,

    /* U+002A "*" */
    0x10, 0x23, 0x59, 0xc3, 0x9a, 0xc4, 0x8,

    /* U+002B "+" */
    0x8, 0x4, 0x2, 0x1, 0xf, 0xf8, 0x40, 0x20,
    0x10, 0x8, 0x0,

    /* U+002C "," */
    0x6d, 0xbc,

    /* U+002D "-" */
    0xfc,

    /* U+002E "." */
    0xc0,

    /* U+002F "/" */
    0x6, 0xc, 0x10, 0x60, 0xc1, 0x6, 0xc, 0x10,
    0x20, 0xc1, 0x82, 0xc, 0x18, 0x20, 0xc0,

    /* U+0030 "0" */
    0x1e, 0x18, 0x66, 0x1b, 0x3, 0xc0, 0xf0, 0x3c,
    0xf, 0x3, 0xc0, 0xd8, 0x66, 0x18, 0x78,

    /* U+0031 "1" */
    0xe3, 0x33, 0x33, 0x33, 0x33, 0x33,

    /* U+0032 "2" */
    0xff, 0x80, 0x30, 0xc, 0x7, 0xf, 0xdf, 0xff,
    0xfb, 0xf8, 0xe0, 0x30, 0xc, 0x3, 0xff,

    /* U+0033 "3" */
    0xff, 0x1, 0xc0, 0x60, 0x30, 0x18, 0x1c, 0xf8,
    0x3, 0x1, 0x80, 0xc0, 0x7f, 0xe0,

    /* U+0034 "4" */
    0x7, 0x83, 0x31, 0x8c, 0x63, 0x30, 0xd8, 0x36,
    0xd, 0x83, 0x7f, 0xc0, 0x30, 0xc, 0x3,

    /* U+0035 "5" */
    0xff, 0x60, 0x30, 0x18, 0xc, 0x7, 0xf8, 0xe,
    0x3, 0x1, 0x80, 0xc0, 0xff, 0xe0,

    /* U+0036 "6" */
    0x1f, 0x9c, 0x6, 0x3, 0x0, 0xc0, 0x30, 0xf,
    0xfb, 0x3, 0xc0, 0xd0, 0x36, 0x1c, 0xfe,

    /* U+0037 "7" */
    0xff, 0x80, 0x60, 0x18, 0x6, 0x3, 0x81, 0xc0,
    0x70, 0x38, 0xc, 0x7, 0x3, 0x80, 0xc0,

    /* U+0038 "8" */
    0x3f, 0x38, 0x7c, 0xf, 0x3, 0xc0, 0xf8, 0x73,
    0xf3, 0x3, 0xc0, 0xf0, 0x3c, 0xd, 0xfe,

    /* U+0039 "9" */
    0x3f, 0x18, 0x6c, 0x1b, 0x3, 0xc0, 0xf0, 0x37,
    0xfc, 0x3, 0x0, 0xc0, 0x60, 0x19, 0xf8,

    /* U+003A ":" */
    0xc0, 0x0, 0xc0,

    /* U+003B ";" */
    0x60, 0x0, 0xdb, 0x78,

    /* U+003C "<" */
    0x1, 0x87, 0xe, 0x1c, 0x8, 0x3, 0x80, 0x70,
    0xe, 0x0, 0x80,

    /* U+003D "=" */
    0xff, 0x80, 0x0, 0x0, 0x0, 0x7, 0xfc,

    /* U+003E ">" */
    0xc0, 0x38, 0x3, 0x80, 0x60, 0x10, 0x38, 0xf1,
    0xc0, 0x80, 0x0,

    /* U+003F "?" */
    0xff, 0x0, 0xc0, 0x60, 0x30, 0x18, 0xf8, 0x60,
    0x30, 0x18, 0x0, 0x0, 0x3, 0x0,

    /* U+0040 "@" */
    0x7f, 0xb0, 0x3c, 0xf, 0x3, 0xcf, 0xf6, 0x3d,
    0x8f, 0x63, 0xd8, 0xf3, 0xec, 0x3, 0x0, 0xc0,
    0x1f, 0xf0,

    /* U+0041 "A" */
    0x7, 0x0, 0xd8, 0x9, 0x81, 0x98, 0x18, 0xc1,
    0x8c, 0x30, 0xc3, 0x6, 0x30, 0x66, 0x6, 0x60,
    0x3e, 0x3,

    /* U+0042 "B" */
    0xff, 0x61, 0xf0, 0x78, 0x3c, 0x1e, 0xf, 0xf9,
    0x83, 0xc1, 0xe0, 0xf0, 0x7f, 0xe0,

    /* U+0043 "C" */
    0x1f, 0xb0, 0x18, 0x18, 0xc, 0x6, 0x3, 0x1,
    0x80, 0xc0, 0x30, 0x18, 0x3, 0xf0,

    /* U+0044 "D" */
    0xfe, 0x30, 0x6c, 0x1b, 0x3, 0xc0, 0xf0, 0x3c,
    0xf, 0x3, 0xc0, 0xf0, 0x6c, 0x1b, 0xf8,

    /* U+0045 "E" */
    0x7f, 0xf0, 0x30, 0x18, 0xc, 0x7, 0x0, 0xff,
    0x80, 0xc0, 0x60, 0x30, 0xf, 0xf0,

    /* U+0046 "F" */
    0x3f, 0xb0, 0x30, 0x18, 0xc, 0x6, 0x3, 0xff,
    0x80, 0xc0, 0x60, 0x30, 0x18, 0x0,

    /* U+0047 "G" */
    0x1f, 0x98, 0x6, 0x3, 0x0, 0xc0, 0x30, 0xc,
    0xfb, 0x3, 0xc0, 0xd8, 0x36, 0xc, 0xfe,

    /* U+0048 "H" */
    0xc1, 0xe0, 0xf0, 0x78, 0x3c, 0x1e, 0xf, 0xff,
    0x83, 0xc1, 0xe0, 0xf0, 0x78, 0x30,

    /* U+0049 "I" */
    0xff, 0xff, 0xff,

    /* U+004A "J" */
    0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3,
    0x3, 0x3, 0x6, 0xfc,

    /* U+004B "K" */
    0xc1, 0xb0, 0x6c, 0x33, 0xc, 0xc3, 0x31, 0x8f,
    0xc3, 0x18, 0xc3, 0x30, 0x6c, 0x1b, 0x7,

    /* U+004C "L" */
    0xc0, 0x60, 0x30, 0x18, 0xc, 0x6, 0x3, 0x1,
    0x80, 0xc0, 0x60, 0x18, 0x7, 0xf0,

    /* U+004D "M" */
    0x70, 0x1d, 0xb0, 0x6f, 0x20, 0x9e, 0x61, 0x3c,
    0xc6, 0x79, 0x8c, 0xf3, 0x19, 0xe2, 0x23, 0xc4,
    0x47, 0x8d, 0x8f, 0x1b, 0x1e, 0x1c, 0x30,

    /* U+004E "N" */
    0x70, 0x3d, 0x83, 0xc8, 0x3c, 0xc3, 0xc4, 0x3c,
    0x63, 0xc6, 0x3c, 0x23, 0xc3, 0x3c, 0x13, 0xc1,
    0xbc, 0xe,

    /* U+004F "O" */
    0x3f, 0xc, 0x19, 0x83, 0x60, 0x3c, 0x7, 0x80,
    0xf0, 0x1e, 0x3, 0xc0, 0x6c, 0x19, 0x83, 0x1f,
    0xc0,

    /* U+0050 "P" */
    0xff, 0x1, 0xc0, 0x60, 0x30, 0x18, 0x1b, 0xf9,
    0x80, 0xc0, 0x60, 0x30, 0x18, 0x0,

    /* U+0051 "Q" */
    0x3f, 0x8c, 0x19, 0x83, 0x60, 0x3c, 0x7, 0x80,
    0xf0, 0x1e, 0x3, 0xc6, 0x68, 0x59, 0x8f, 0x1f,
    0xc0, 0x18, 0x3, 0x0,

    /* U+0052 "R" */
    0xff, 0x1, 0xc0, 0x60, 0x30, 0x18, 0x1b, 0xfd,
    0x8c, 0xc6, 0x61, 0xb0, 0xd8, 0x30,

    /* U+0053 "S" */
    0x7f, 0xb0, 0xc, 0x3, 0x0, 0xc0, 0x30, 0x7,
    0xf8, 0x7, 0x0, 0xc0, 0x30, 0xf, 0xfe,

    /* U+0054 "T" */
    0xff, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18,
    0x18, 0x18, 0x18, 0x18,

    /* U+0055 "U" */
    0xc1, 0xe0, 0xf0, 0x78, 0x3c, 0x1e, 0xf, 0x7,
    0x83, 0xc1, 0xe0, 0xf0, 0x4f, 0xe0,

    /* U+0056 "V" */
    0xe0, 0x36, 0x3, 0x60, 0x66, 0x6, 0x30, 0x63,
    0xc, 0x10, 0xc1, 0x8c, 0x19, 0x80, 0x98, 0xd,
    0x0, 0x70,

    /* U+0057 "W" */
    0xc3, 0x87, 0x8d, 0x8f, 0x1b, 0x1e, 0x26, 0x3c,
    0x4c, 0x79, 0x88, 0xf3, 0x11, 0xe6, 0x32, 0xcc,
    0x6d, 0x90, 0xd9, 0x21, 0xb3, 0x81, 0xc0,

    /* U+0058 "X" */
    0x60, 0x73, 0x6, 0x18, 0xc1, 0xd8, 0xf, 0x80,
    0x70, 0x7, 0x0, 0xd8, 0x19, 0xc3, 0x8c, 0x70,
    0x66, 0x3,

    /* U+0059 "Y" */
    0xc0, 0xd8, 0x66, 0x18, 0xcc, 0x3e, 0x7, 0x80,
    0xc0, 0x30, 0xc, 0x3, 0x0, 0xc0, 0x30,

    /* U+005A "Z" */
    0xff, 0x80, 0x30, 0xc, 0xf, 0xf, 0xc7, 0xe7,
    0xe3, 0xf0, 0xf0, 0x30, 0xc, 0x1, 0xff,

    /* U+005B "[" */
    0xf8, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88,
    0x88, 0x8f,

    /* U+005C "\\" */
    0xc0, 0x81, 0x83, 0x2, 0x6, 0xc, 0x18, 0x10,
    0x30, 0x60, 0x40, 0xc1, 0x81, 0x3, 0x6,

    /* U+005D "]" */
    0xf1, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11,
    0x11, 0x1f,

    /* U+005E "^" */
    0x30, 0x51, 0xa2, 0x64, 0x50, 0xa1, 0x80,

    /* U+005F "_" */
    0xff,

    /* U+0060 "`" */
    0xc6, 0x63,

    /* U+0061 "a" */
    0x7f, 0x0, 0xc0, 0x60, 0x37, 0xfe, 0xf, 0x7,
    0x83, 0x7f, 0x80,

    /* U+0062 "b" */
    0xc0, 0x60, 0x30, 0x18, 0xf, 0xe6, 0x1b, 0x7,
    0x83, 0xc1, 0xe0, 0xf0, 0x7c, 0x67, 0xe0,

    /* U+0063 "c" */
    0x3f, 0x60, 0xc0, 0xc0, 0xc0, 0xc0, 0xc0, 0x60,
    0x3f,

    /* U+0064 "d" */
    0x1, 0x80, 0xc0, 0x60, 0x33, 0xfb, 0xf, 0x7,
    0x83, 0xc1, 0xe0, 0xf0, 0x6c, 0x73, 0xf0,

    /* U+0065 "e" */
    0x7f, 0x60, 0xf0, 0x78, 0x3f, 0xf6, 0x3, 0x1,
    0x80, 0x7f, 0x80,

    /* U+0066 "f" */
    0x3b, 0x18, 0xcf, 0xb1, 0x8c, 0x63, 0x18, 0xc6,
    0x0,

    /* U+0067 "g" */
    0x3f, 0x31, 0xf0, 0x78, 0x3c, 0x1e, 0xf, 0x6,
    0xc3, 0x3f, 0x80, 0xc0, 0x60, 0x37, 0xf0,

    /* U+0068 "h" */
    0xc0, 0x60, 0x30, 0x18, 0xf, 0xe6, 0x1b, 0x7,
    0x83, 0xc1, 0xe0, 0xf0, 0x78, 0x3c, 0x18,

    /* U+0069 "i" */
    0xc3, 0xff, 0xff,

    /* U+006A "j" */
    0x30, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0xe0,

    /* U+006B "k" */
    0xc0, 0xc0, 0xc0, 0xc0, 0xc3, 0xc2, 0xc6, 0xc4,
    0xf8, 0xc4, 0xc6, 0xc3, 0xc3,

    /* U+006C "l" */
    0xff, 0xff, 0xff, 0xc0,

    /* U+006D "m" */
    0xff, 0xf3, 0xc, 0x6c, 0x30, 0xf0, 0xc3, 0xc3,
    0xf, 0xc, 0x3c, 0x30, 0xf0, 0xc3, 0xc3, 0xc,

    /* U+006E "n" */
    0xfe, 0x61, 0xb0, 0x78, 0x3c, 0x1e, 0xf, 0x7,
    0x83, 0xc1, 0x80,

    /* U+006F "o" */
    0x3e, 0x31, 0xb0, 0x78, 0x3c, 0x1e, 0xf, 0x6,
    0xc6, 0x3e, 0x0,

    /* U+0070 "p" */
    0x7e, 0x71, 0xb0, 0x78, 0x3c, 0x1e, 0xf, 0x7,
    0x86, 0xfe, 0x60, 0x30, 0x18, 0xc, 0x0,

    /* U+0071 "q" */
    0x3f, 0x31, 0xf0, 0x78, 0x3c, 0x1e, 0xf, 0x6,
    0xc3, 0x3f, 0x80, 0xc0, 0x60, 0x30, 0x18,

    /* U+0072 "r" */
    0x7f, 0xc, 0x30, 0xc3, 0xc, 0x30, 0xc0,

    /* U+0073 "s" */
    0x7f, 0xc0, 0xc0, 0xc0, 0x7e, 0x3, 0x3, 0x3,
    0xfe,

    /* U+0074 "t" */
    0x63, 0x19, 0xf6, 0x31, 0x8c, 0x63, 0x18, 0x70,

    /* U+0075 "u" */
    0xc1, 0xe0, 0xf0, 0x78, 0x3c, 0x1e, 0xf, 0x6,
    0xc6, 0x3e, 0x0,

    /* U+0076 "v" */
    0xc0, 0x4c, 0x19, 0x82, 0x10, 0xc3, 0x18, 0x62,
    0x4, 0xc0, 0xd0, 0xe, 0x0,

    /* U+0077 "w" */
    0x43, 0x86, 0x85, 0x8d, 0x99, 0x1b, 0x32, 0x36,
    0x66, 0x6c, 0x8c, 0x99, 0x19, 0x36, 0x16, 0x38,
    0x38,

    /* U+0078 "x" */
    0x60, 0xc6, 0x30, 0x6c, 0x7, 0x0, 0xe0, 0x3e,
    0xe, 0xc1, 0x8c, 0x60, 0xc0,

    /* U+0079 "y" */
    0xc0, 0xd8, 0x26, 0x18, 0x86, 0x31, 0xc, 0xc1,
    0x30, 0x68, 0x1e, 0x1, 0x0, 0xc0, 0x30, 0x18,
    0x0,

    /* U+007A "z" */
    0xfe, 0x1, 0x3, 0xf, 0x7e, 0xf8, 0xc0, 0x80,
    0x7f,

    /* U+007B "{" */
    0x19, 0x8, 0x42, 0x10, 0x84, 0x21, 0x30, 0x42,
    0x10, 0x84, 0x21, 0x8, 0x30,

    /* U+007C "|" */
    0xff, 0xff,

    /* U+007D "}" */
    0xc1, 0x8, 0x42, 0x10, 0x84, 0x21, 0x6, 0x42,
    0x10, 0x84, 0x21, 0x9, 0x80,

    /* U+007E "~" */
    0xf0, 0x44, 0x41, 0xe0
};


/*---------------------
 *  GLYPH DESCRIPTION
 *--------------------*/

static const lv_font_fmt_txt_glyph_dsc_t glyph_dsc[] = {
    {.bitmap_index = 0, .adv_w = 0, .box_w = 0, .box_h = 0, .ofs_x = 0, .ofs_y = 0} /* id = 0 reserved */,
    {.bitmap_index = 0, .adv_w = 68, .box_w = 1, .box_h = 1, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 1, .adv_w = 60, .box_w = 2, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 4, .adv_w = 98, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 8},
    {.bitmap_index = 8, .adv_w = 159, .box_w = 9, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 22, .adv_w = 159, .box_w = 8, .box_h = 14, .ofs_x = 1, .ofs_y = -1},
    {.bitmap_index = 36, .adv_w = 216, .box_w = 13, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 56, .adv_w = 196, .box_w = 11, .box_h = 13, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 74, .adv_w = 50, .box_w = 2, .box_h = 5, .ofs_x = 1, .ofs_y = 8},
    {.bitmap_index = 76, .adv_w = 101, .box_w = 5, .box_h = 20, .ofs_x = 1, .ofs_y = -4},
    {.bitmap_index = 89, .adv_w = 101, .box_w = 5, .box_h = 20, .ofs_x = 0, .ofs_y = -4},
    {.bitmap_index = 102, .adv_w = 143, .box_w = 7, .box_h = 8, .ofs_x = 1, .ofs_y = 5},
    {.bitmap_index = 109, .adv_w = 158, .box_w = 9, .box_h = 9, .ofs_x = 1, .ofs_y = 1},
    {.bitmap_index = 120, .adv_w = 66, .box_w = 3, .box_h = 5, .ofs_x = 0, .ofs_y = -3},
    {.bitmap_index = 122, .adv_w = 106, .box_w = 6, .box_h = 1, .ofs_x = 1, .ofs_y = 5},
    {.bitmap_index = 123, .adv_w = 62, .box_w = 2, .box_h = 1, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 124, .adv_w = 116, .box_w = 7, .box_h = 17, .ofs_x = 0, .ofs_y = -4},
    {.bitmap_index = 139, .adv_w = 191, .box_w = 10, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 154, .adv_w = 86, .box_w = 4, .box_h = 12, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 160, .adv_w = 188, .box_w = 10, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 175, .adv_w = 174, .box_w = 9, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 189, .adv_w = 180, .box_w = 10, .box_h = 12, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 204, .adv_w = 175, .box_w = 9, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 218, .adv_w = 183, .box_w = 10, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 233, .adv_w = 167, .box_w = 10, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 248, .adv_w = 186, .box_w = 10, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 263, .adv_w = 183, .box_w = 10, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 278, .adv_w = 70, .box_w = 2, .box_h = 9, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 281, .adv_w = 70, .box_w = 3, .box_h = 10, .ofs_x = 0, .ofs_y = -1},
    {.bitmap_index = 285, .adv_w = 158, .box_w = 9, .box_h = 9, .ofs_x = 1, .ofs_y = 1},
    {.bitmap_index = 296, .adv_w = 158, .box_w = 9, .box_h = 6, .ofs_x = 1, .ofs_y = 3},
    {.bitmap_index = 303, .adv_w = 158, .box_w = 9, .box_h = 9, .ofs_x = 1, .ofs_y = 1},
    {.bitmap_index = 314, .adv_w = 146, .box_w = 9, .box_h = 12, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 328, .adv_w = 196, .box_w = 10, .box_h = 14, .ofs_x = 1, .ofs_y = -4},
    {.bitmap_index = 346, .adv_w = 201, .box_w = 12, .box_h = 12, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 364, .adv_w = 184, .box_w = 9, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 378, .adv_w = 175, .box_w = 9, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 392, .adv_w = 189, .box_w = 10, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 407, .adv_w = 177, .box_w = 9, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 421, .adv_w = 170, .box_w = 9, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 435, .adv_w = 187, .box_w = 10, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 450, .adv_w = 191, .box_w = 9, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 464, .adv_w = 72, .box_w = 2, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 467, .adv_w = 149, .box_w = 8, .box_h = 12, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 479, .adv_w = 181, .box_w = 10, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 494, .adv_w = 159, .box_w = 9, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 508, .adv_w = 282, .box_w = 15, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 531, .adv_w = 225, .box_w = 12, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 549, .adv_w = 209, .box_w = 11, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 566, .adv_w = 174, .box_w = 9, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 580, .adv_w = 209, .box_w = 11, .box_h = 14, .ofs_x = 1, .ofs_y = -2},
    {.bitmap_index = 600, .adv_w = 183, .box_w = 9, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 614, .adv_w = 180, .box_w = 10, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 629, .adv_w = 146, .box_w = 8, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 641, .adv_w = 187, .box_w = 9, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 655, .adv_w = 201, .box_w = 12, .box_h = 12, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 673, .adv_w = 268, .box_w = 15, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 696, .adv_w = 200, .box_w = 12, .box_h = 12, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 714, .adv_w = 176, .box_w = 10, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 729, .adv_w = 190, .box_w = 10, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 744, .adv_w = 101, .box_w = 4, .box_h = 20, .ofs_x = 1, .ofs_y = -4},
    {.bitmap_index = 754, .adv_w = 116, .box_w = 7, .box_h = 17, .ofs_x = 0, .ofs_y = -4},
    {.bitmap_index = 769, .adv_w = 101, .box_w = 4, .box_h = 20, .ofs_x = 1, .ofs_y = -4},
    {.bitmap_index = 779, .adv_w = 137, .box_w = 7, .box_h = 7, .ofs_x = 1, .ofs_y = 6},
    {.bitmap_index = 786, .adv_w = 132, .box_w = 8, .box_h = 1, .ofs_x = 0, .ofs_y = -3},
    {.bitmap_index = 787, .adv_w = 88, .box_w = 4, .box_h = 4, .ofs_x = 1, .ofs_y = 10},
    {.bitmap_index = 789, .adv_w = 172, .box_w = 9, .box_h = 9, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 800, .adv_w = 178, .box_w = 9, .box_h = 13, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 815, .adv_w = 154, .box_w = 8, .box_h = 9, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 824, .adv_w = 178, .box_w = 9, .box_h = 13, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 839, .adv_w = 167, .box_w = 9, .box_h = 9, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 850, .adv_w = 96, .box_w = 5, .box_h = 13, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 859, .adv_w = 177, .box_w = 9, .box_h = 13, .ofs_x = 1, .ofs_y = -4},
    {.bitmap_index = 874, .adv_w = 181, .box_w = 9, .box_h = 13, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 889, .adv_w = 66, .box_w = 2, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 892, .adv_w = 69, .box_w = 4, .box_h = 15, .ofs_x = -1, .ofs_y = -4},
    {.bitmap_index = 900, .adv_w = 154, .box_w = 8, .box_h = 13, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 913, .adv_w = 66, .box_w = 2, .box_h = 13, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 917, .adv_w = 264, .box_w = 14, .box_h = 9, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 933, .adv_w = 181, .box_w = 9, .box_h = 9, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 944, .adv_w = 172, .box_w = 9, .box_h = 9, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 955, .adv_w = 177, .box_w = 9, .box_h = 13, .ofs_x = 1, .ofs_y = -4},
    {.bitmap_index = 970, .adv_w = 177, .box_w = 9, .box_h = 13, .ofs_x = 1, .ofs_y = -4},
    {.bitmap_index = 985, .adv_w = 119, .box_w = 6, .box_h = 9, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 992, .adv_w = 150, .box_w = 8, .box_h = 9, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 1001, .adv_w = 96, .box_w = 5, .box_h = 12, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 1009, .adv_w = 180, .box_w = 9, .box_h = 9, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 1020, .adv_w = 173, .box_w = 11, .box_h = 9, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 1033, .adv_w = 250, .box_w = 15, .box_h = 9, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 1050, .adv_w = 174, .box_w = 11, .box_h = 9, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 1063, .adv_w = 166, .box_w = 10, .box_h = 13, .ofs_x = 0, .ofs_y = -4},
    {.bitmap_index = 1080, .adv_w = 160, .box_w = 8, .box_h = 9, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 1089, .adv_w = 101, .box_w = 5, .box_h = 20, .ofs_x = 1, .ofs_y = -4},
    {.bitmap_index = 1102, .adv_w = 74, .box_w = 1, .box_h = 16, .ofs_x = 2, .ofs_y = -3},
    {.bitmap_index = 1104, .adv_w = 101, .box_w = 5, .box_h = 20, .ofs_x = 0, .ofs_y = -4},
    {.bitmap_index = 1117, .adv_w = 158, .box_w = 9, .box_h = 3, .ofs_x = 1, .ofs_y = 5}
};

/*---------------------
 *  CHARACTER MAPPING
 *--------------------*/



/*Collect the unicode lists and glyph_id offsets*/
static const lv_font_fmt_txt_cmap_t cmaps[] =
{
    {
        .range_start = 32, .range_length = 95, .glyph_id_start = 1,
        .unicode_list = NULL, .glyph_id_ofs_list = NULL, .list_length = 0, .type = LV_FONT_FMT_TXT_CMAP_FORMAT0_TINY
    }
};

/*-----------------
 *    KERNING
 *----------------*/


/*Map glyph_ids to kern left classes*/
static const uint8_t kern_left_class_mapping[] =
{
    0, 0, 0, 1, 0, 0, 0, 0,
    1, 2, 0, 0, 0, 3, 4, 3,
    0, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 0, 0, 0, 0, 0,
    0, 15, 16, 8, 17, 18, 0, 19,
    20, 0, 0, 21, 22, 23, 24, 25,
    18, 26, 18, 27, 28, 29, 21, 30,
    31, 22, 32, 33, 34, 0, 0, 0,
    0, 0, 35, 36, 0, 0, 37, 38,
    39, 40, 0, 41, 42, 0, 40, 40,
    36, 36, 0, 43, 0, 44, 10, 45,
    46, 42, 45, 47, 34, 0, 0, 0
};

/*Map glyph_ids to kern right classes*/
static const uint8_t kern_right_class_mapping[] =
{
    0, 0, 0, 1, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 2, 3, 2,
    0, 4, 5, 6, 0, 7, 8, 9,
    10, 11, 12, 0, 0, 0, 0, 0,
    13, 0, 14, 0, 15, 0, 0, 16,
    15, 0, 0, 17, 0, 18, 19, 19,
    15, 0, 15, 0, 20, 21, 18, 22,
    23, 24, 25, 26, 0, 0, 0, 0,
    0, 0, 27, 0, 28, 28, 28, 29,
    30, 0, 0, 31, 0, 0, 32, 32,
    28, 33, 28, 32, 34, 35, 36, 37,
    37, 38, 39, 40, 0, 0, 0, 0
};

/*Kern values between classes*/
static const int8_t kern_class_values[] =
{
    0, -10, 0, -10, 5, 0, -10, 0,
    0, 10, 0, 0, 0, -25, -7, -7,
    -30, 0, -5, -2, 3, 3, 0, 0,
    5, 0, 0, -7, 0, -7, 0, 0,
    0, -5, 0, 0, 7, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 15, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -10, 0, 0, -10, -7, 0, -3, 0,
    -10, 0, -3, -13, 0, 0, -10, 0,
    0, -7, 0, 0, -18, -23, -7, 0,
    -25, -2, -3, -5, 0, -5, 0, 0,
    0, 0, -13, -5, -20, 0, -20, 0,
    0, 0, 0, 0, 0, 0, 7, 0,
    0, -28, 0, 0, 0, -7, 0, 0,
    0, 0, 0, 0, -7, -13, 0, -15,
    -23, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -5, -10, -5, 0,
    -10, -15, 0, 0, 0, -7, -5, -7,
    0, -13, 0, -8, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -5, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, -5, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -2, -5, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -6, 0, 0,
    0, 0, 0, 0, 0, 0, 0, -8,
    0, -3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -5, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -5, 0, 0, 0, 0, 0, 0,
    0, 0, 0, -10, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -40, 0, -3, 0, -5, -8, 0,
    -6, 5, 0, -3, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -10, 0, 0, 0, -4, 0, 0,
    0, -5, 0, -2, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -5, 5, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -25, 0, -7, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 5, -10, 0,
    0, -10, 0, 0, -18, -20, -7, 5,
    -25, -4, -5, -7, 0, -7, 0, 0,
    0, 0, -7, -7, -13, 5, -10, 0,
    0, 0, -10, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, -3, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, -6, 0, 0, -7, 0, 0,
    0, 0, 0, -6, 0, 0, 0, -5,
    -7, -10, 0, 0, 0, 0, 0, 0,
    0, 3, 0, 0, 0, -10, 0, 0,
    -5, 0, 0, 0, -5, -10, -5, -13,
    -18, -5, -5, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -10, 0, -5,
    0, -13, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -13, 0, 0,
    -13, 0, 0, 0, 0, 0, 0, -5,
    0, -4, 0, 0, 0, 0, 0, 0,
    -5, 0, 0, 0, 0, 0, 0, 0,
    0, -3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -7, 0, 0,
    0, 0, 0, 0, 0, 0, 0, -10,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -7, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -10, 0, 0,
    0, 0, 0, 0, 0, 0, 0, -5,
    0, 0, -5, 0, 0, 0, -5, 0,
    0, 0, 0, 0, 0, -5, 0, -3,
    0, 0, -15, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 5, -13, 0,
    0, -5, 0, 0, 0, 0, 0, 0,
    0, -5, -6, -9, 0, -13, 0, 0,
    0, 0, -3, -7, -7, 0, -7, -7,
    -25, 0, -5, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -10, 0, -5, 0,
    0, -5, 0, 0, -15, -16, -5, 0,
    -26, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -10, 0, -13, 0,
    -5, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -3, -10, -5, 0,
    -13, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -9, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -11, 0, 0,
    0, -3, 0, 0, 0, 0, 0, -4,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -3, 0, 0,
    0, -30, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -19, 0, -3,
    -31, 0, 0, 0, 0, -6, -3, 0,
    -12, -7, -10, -3, 0, -5, 0, -5,
    -5, 0, 0, 0, 0, -5, 0, -3,
    -1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, -4, 0,
    0, -4, 0, 0, -3, -8, -3, 0,
    -13, -6, -7, -9, 0, -7, 0, 0,
    0, 0, 0, -3, 0, 0, 0, -5,
    0, -5, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, -1, -5,
    0, 0, 0, 0, -7, 0, -2, -7,
    -5, -3, -4, 0, 0, -3, 0, 0,
    0, 0, 0, 0, -5, -6, -5, 0,
    3, -18, -7, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -18, -5, -5,
    -23, 0, -3, -2, 5, 5, 3, 0,
    5, 0, -5, -7, 5, -7, 0, -5,
    -7, -7, 5, 0, 5, 0, 5, 0,
    3, -23, -13, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -20, -10, -14,
    -25, 0, -10, -4, 5, 5, 3, 0,
    5, -5, -15, -15, 0, -15, 0, -10,
    -15, -13, 0, 0, 0, 0, 0, -5,
    0, -7, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -7, -5, -7,
    -7, 0, -5, 0, 3, 3, 3, 0,
    5, 0, -8, -6, 0, -5, 0, -5,
    -10, -3, 0, 0, 0, 0, 0, -5,
    5, -25, -23, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -25, -18, -21,
    -33, 0, -13, -9, 5, 5, 5, 0,
    5, 0, -15, -25, 0, -27, 0, -18,
    -25, -20, 0, -15, -5, -10, -5, -13,
    0, 0, -5, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, -5, 0,
    0, 0, 0, 0, 0, -7, 0, 0,
    0, 0, -5, -6, 0, -7, 0, 0,
    0, 0, 0, -2, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 18, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -5, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -5, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -7, -7, -7, 0,
    -7, -5, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -10, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -7, -7, -5, -2,
    0, -5, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -5, 0, 0, -5,
    13, -10, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 13, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, -7, 0, 5, -4, 0, 0,
    0, 0, 5, 0, 0, 0, 0, 0,
    -5, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -10, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 10, 0,
    0, 0, 0, 0, -7, 0, -10, 0,
    -7, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -10, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -2, 0, 0, 0,
    0, 0, 0, -1, -5, 0, -5, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -5, 13, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, -10, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, -5, -7, 0, -7, 0, 0,
    0, 0, 0, -5, 5, 0, 0, 0,
    0, -25, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 5, 0, 0, 0,
    -2, 0, 5, 0, 5, 0, 5, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 7, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 5, 0, 0, 0,
    0, 0, 5, 0, 5, 5, 0, 0,
    5, -20, -5, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 7, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, -7, 0, -6, 0, -1,
    -6, -4, 5, 0, 5, 5, 3, 0,
    3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -5, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, -3, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
};


/*Collect the kern class' data in one place*/
static const lv_font_fmt_txt_kern_classes_t kern_classes =
{
    .class_pair_values   = kern_class_values,
    .left_class_mapping  = kern_left_class_mapping,
    .right_class_mapping = kern_right_class_mapping,
    .left_class_cnt      = 47,
    .right_class_cnt     = 40,
};

/*--------------------
 *  ALL CUSTOM DATA
 *--------------------*/

#if LV_VERSION_CHECK(8, 0, 0)
/*Store all the custom data of the font*/
static  lv_font_fmt_txt_glyph_cache_t cache;
static const lv_font_fmt_txt_dsc_t font_dsc = {
#else
static lv_font_fmt_txt_dsc_t font_dsc = {
#endif
    .glyph_bitmap = glyph_bitmap,
    .glyph_dsc = glyph_dsc,
    .cmaps = cmaps,
    .kern_dsc = &kern_classes,
    .kern_scale = 16,
    .cmap_num = 1,
    .bpp = 1,
    .kern_classes = 1,
    .bitmap_format = 0,
#if LV_VERSION_CHECK(8, 0, 0)
    .cache = &cache
#endif
};


/*-----------------
 *  PUBLIC FONT
 *----------------*/

/*Initialize a public general font descriptor*/
#if LV_VERSION_CHECK(8, 0, 0)
const lv_font_t ui_font_FontNasa16 = {
#else
lv_font_t ui_font_FontNasa16 = {
#endif
    .get_glyph_dsc = lv_font_get_glyph_dsc_fmt_txt,    /*Function pointer to get glyph's data*/
    .get_glyph_bitmap = lv_font_get_bitmap_fmt_txt,    /*Function pointer to get glyph's bitmap*/
    .line_height = 20,          /*The maximum line height required by the font*/
    .base_line = 4,             /*Baseline measured from the bottom of the line*/
#if !(LVGL_VERSION_MAJOR == 6 && LVGL_VERSION_MINOR == 0)
    .subpx = LV_FONT_SUBPX_NONE,
#endif
#if LV_VERSION_CHECK(7, 4, 0) || LVGL_VERSION_MAJOR >= 8
    .underline_position = -1,
    .underline_thickness = 0,
#endif
    .dsc = &font_dsc           /*The custom font data. Will be accessed by `get_glyph_bitmap/dsc` */
};



#endif /*#if UI_FONT_FONTNASA16*/

