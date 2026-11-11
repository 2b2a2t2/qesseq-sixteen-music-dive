/*******************************************************************************
 * Size: 10 px
 * Bpp: 1
 * Opts: --bpp 1 --size 10 --font /Users/bat/_BATSEQSC01/SC01Clean/SquareLIneProject/assets/nasalization-rg.otf -o /Users/bat/_BATSEQSC01/SC01Clean/SquareLIneProject/assets/ui_font_FontNasa10.c --format lvgl -r 0x20-0x7f --no-compress --no-prefilter
 ******************************************************************************/

#include "../ui.h"

#ifndef UI_FONT_FONTNASA10
#define UI_FONT_FONTNASA10 1
#endif

#if UI_FONT_FONTNASA10

/*-----------------
 *    BITMAPS
 *----------------*/

/*Store the image of the glyphs*/
static LV_ATTRIBUTE_LARGE_CONST const uint8_t glyph_bitmap[] = {
    /* U+0020 " " */
    0x0,

    /* U+0021 "!" */
    0xf4,

    /* U+0022 "\"" */
    0xb6, 0x80,

    /* U+0023 "#" */
    0x57, 0xd4, 0xaf, 0xa8,

    /* U+0024 "$" */
    0x27, 0xa1, 0xe1, 0x78, 0x80,

    /* U+0025 "%" */
    0xf4, 0x94, 0xfe, 0x19, 0x29, 0x4e,

    /* U+0026 "&" */
    0x79, 0x24, 0x8c, 0xd6, 0x2f, 0x40,

    /* U+0027 "'" */
    0xe0,

    /* U+0028 "(" */
    0x72, 0x49, 0x24, 0x91, 0x80,

    /* U+0029 ")" */
    0xc4, 0x92, 0x49, 0x27, 0x0,

    /* U+002A "*" */
    0x27, 0xdd, 0x50,

    /* U+002B "+" */
    0x21, 0x3e, 0x42, 0x0,

    /* U+002C "," */
    0x5c,

    /* U+002D "-" */
    0xf0,

    /* U+002E "." */
    0x80,

    /* U+002F "/" */
    0x11, 0x32, 0x24, 0x44, 0x80,

    /* U+0030 "0" */
    0x7a, 0x18, 0x61, 0x85, 0xe0,

    /* U+0031 "1" */
    0xd5, 0x50,

    /* U+0032 "2" */
    0xfc, 0x11, 0xfc, 0x83, 0xf0,

    /* U+0033 "3" */
    0xf8, 0x5c, 0x10, 0xf8,

    /* U+0034 "4" */
    0x1c, 0x94, 0x51, 0x7c, 0x10,

    /* U+0035 "5" */
    0xfc, 0x3e, 0x10, 0xf8,

    /* U+0036 "6" */
    0x7e, 0xf, 0xe1, 0x85, 0xe0,

    /* U+0037 "7" */
    0xfc, 0x10, 0x86, 0x31, 0x80,

    /* U+0038 "8" */
    0xfe, 0x17, 0xa1, 0x85, 0xe0,

    /* U+0039 "9" */
    0xfa, 0x1f, 0xc1, 0xd, 0xe0,

    /* U+003A ":" */
    0x88,

    /* U+003B ";" */
    0x41, 0x70,

    /* U+003C "<" */
    0x9, 0xb1, 0x83, 0x80,

    /* U+003D "=" */
    0xfc, 0xf, 0xc0,

    /* U+003E ">" */
    0x83, 0x6, 0x3e, 0x0,

    /* U+003F "?" */
    0xf8, 0x5e, 0x80, 0x20,

    /* U+0040 "@" */
    0xfe, 0x1b, 0xe9, 0xa6, 0xf8, 0x3f,

    /* U+0041 "A" */
    0x18, 0x3c, 0x24, 0x66, 0x42, 0xc2,

    /* U+0042 "B" */
    0xfe, 0x1f, 0xa1, 0x87, 0xe0,

    /* U+0043 "C" */
    0x7c, 0x21, 0x8, 0x3c,

    /* U+0044 "D" */
    0xfa, 0x18, 0x61, 0x87, 0xe0,

    /* U+0045 "E" */
    0xfe, 0x7, 0xe0, 0x81, 0xf0,

    /* U+0046 "F" */
    0x7c, 0x3f, 0x8, 0x40,

    /* U+0047 "G" */
    0x7e, 0x9, 0xe1, 0x85, 0xe0,

    /* U+0048 "H" */
    0x86, 0x1f, 0xe1, 0x86, 0x10,

    /* U+0049 "I" */
    0xfc,

    /* U+004A "J" */
    0x8, 0x42, 0x10, 0xf8,

    /* U+004B "K" */
    0x8a, 0x6f, 0x26, 0x8a, 0x30,

    /* U+004C "L" */
    0x84, 0x21, 0x8, 0x3c,

    /* U+004D "M" */
    0xe3, 0xd1, 0x6c, 0xb2, 0x99, 0x4c, 0xe4,

    /* U+004E "N" */
    0xe3, 0x46, 0xcc, 0xd8, 0xb1, 0xc0,

    /* U+004F "O" */
    0x7d, 0x6, 0xc, 0x18, 0x2f, 0x80,

    /* U+0050 "P" */
    0xf8, 0x1f, 0xa0, 0x82, 0x0,

    /* U+0051 "Q" */
    0x7d, 0x6, 0xc, 0x18, 0xaf, 0x81, 0x0,

    /* U+0052 "R" */
    0xfc, 0x1f, 0xe2, 0x8a, 0x10,

    /* U+0053 "S" */
    0xfe, 0xf, 0x81, 0x7, 0xe0,

    /* U+0054 "T" */
    0xf9, 0x8, 0x42, 0x10,

    /* U+0055 "U" */
    0x86, 0x18, 0x61, 0x85, 0xe0,

    /* U+0056 "V" */
    0xc2, 0x42, 0x66, 0x24, 0x2c, 0x18,

    /* U+0057 "W" */
    0xcc, 0x72, 0x95, 0xa5, 0x4b, 0x52, 0xdc, 0x60,

    /* U+0058 "X" */
    0x42, 0x24, 0x18, 0x18, 0x24, 0x42,

    /* U+0059 "Y" */
    0x44, 0xd8, 0xa0, 0x81, 0x2, 0x0,

    /* U+005A "Z" */
    0xfc, 0x8, 0x73, 0x8, 0x1f, 0x80,

    /* U+005B "[" */
    0xf2, 0x49, 0x24, 0x93, 0x80,

    /* U+005C "\\" */
    0x84, 0x44, 0x22, 0x21, 0x10,

    /* U+005D "]" */
    0xe4, 0x92, 0x49, 0x27, 0x80,

    /* U+005E "^" */
    0x4a, 0xa9,

    /* U+005F "_" */
    0xf8,

    /* U+0060 "`" */
    0x90,

    /* U+0061 "a" */
    0x7c, 0x17, 0xf1, 0x7c,

    /* U+0062 "b" */
    0x82, 0xf, 0xa1, 0x86, 0x17, 0x80,

    /* U+0063 "c" */
    0x7c, 0x21, 0x7, 0x80,

    /* U+0064 "d" */
    0x4, 0x17, 0xe1, 0x86, 0x17, 0x80,

    /* U+0065 "e" */
    0xfa, 0x3f, 0xa0, 0xf8,

    /* U+0066 "f" */
    0x6b, 0xa4, 0x90,

    /* U+0067 "g" */
    0x7a, 0x18, 0x61, 0x7c, 0x17, 0xc0,

    /* U+0068 "h" */
    0x82, 0xf, 0xa1, 0x86, 0x18, 0x40,

    /* U+0069 "i" */
    0xbe,

    /* U+006A "j" */
    0x45, 0x55, 0xc0,

    /* U+006B "k" */
    0x84, 0x27, 0x2e, 0x4a, 0x20,

    /* U+006C "l" */
    0xfe,

    /* U+006D "m" */
    0xff, 0x44, 0x62, 0x31, 0x18, 0x88,

    /* U+006E "n" */
    0xfa, 0x18, 0x61, 0x84,

    /* U+006F "o" */
    0x7a, 0x18, 0x61, 0x78,

    /* U+0070 "p" */
    0x7a, 0x18, 0x61, 0xfa, 0x8, 0x0,

    /* U+0071 "q" */
    0x7a, 0x18, 0x61, 0x7c, 0x10, 0x40,

    /* U+0072 "r" */
    0xf8, 0x88, 0x80,

    /* U+0073 "s" */
    0xfc, 0x3e, 0x1f, 0x80,

    /* U+0074 "t" */
    0x5d, 0x24, 0xc0,

    /* U+0075 "u" */
    0x86, 0x18, 0x61, 0x78,

    /* U+0076 "v" */
    0xc4, 0x89, 0x21, 0x43, 0x0,

    /* U+0077 "w" */
    0xcc, 0xaa, 0x54, 0xaa, 0x57, 0x38,

    /* U+0078 "x" */
    0x44, 0x50, 0x41, 0x44, 0x40,

    /* U+0079 "y" */
    0xc5, 0x34, 0x8a, 0x30, 0x42, 0x0,

    /* U+007A "z" */
    0xf8, 0x5d, 0xf, 0x80,

    /* U+007B "{" */
    0x69, 0x25, 0x12, 0x49, 0x80,

    /* U+007C "|" */
    0xff, 0x80,

    /* U+007D "}" */
    0xc9, 0x24, 0x52, 0x4b, 0x0,

    /* U+007E "~" */
    0x62, 0x70
};


/*---------------------
 *  GLYPH DESCRIPTION
 *--------------------*/

static const lv_font_fmt_txt_glyph_dsc_t glyph_dsc[] = {
    {.bitmap_index = 0, .adv_w = 0, .box_w = 0, .box_h = 0, .ofs_x = 0, .ofs_y = 0} /* id = 0 reserved */,
    {.bitmap_index = 0, .adv_w = 43, .box_w = 1, .box_h = 1, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 1, .adv_w = 37, .box_w = 1, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 2, .adv_w = 61, .box_w = 3, .box_h = 3, .ofs_x = 1, .ofs_y = 4},
    {.bitmap_index = 4, .adv_w = 100, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 8, .adv_w = 99, .box_w = 5, .box_h = 7, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 13, .adv_w = 135, .box_w = 8, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 19, .adv_w = 122, .box_w = 6, .box_h = 7, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 25, .adv_w = 31, .box_w = 1, .box_h = 3, .ofs_x = 1, .ofs_y = 4},
    {.bitmap_index = 26, .adv_w = 63, .box_w = 3, .box_h = 11, .ofs_x = 1, .ofs_y = -3},
    {.bitmap_index = 31, .adv_w = 63, .box_w = 3, .box_h = 11, .ofs_x = 0, .ofs_y = -3},
    {.bitmap_index = 36, .adv_w = 89, .box_w = 5, .box_h = 4, .ofs_x = 0, .ofs_y = 3},
    {.bitmap_index = 39, .adv_w = 99, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 1},
    {.bitmap_index = 43, .adv_w = 41, .box_w = 2, .box_h = 3, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 44, .adv_w = 66, .box_w = 4, .box_h = 1, .ofs_x = 0, .ofs_y = 3},
    {.bitmap_index = 45, .adv_w = 39, .box_w = 1, .box_h = 1, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 46, .adv_w = 73, .box_w = 4, .box_h = 9, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 51, .adv_w = 120, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 56, .adv_w = 54, .box_w = 2, .box_h = 6, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 58, .adv_w = 117, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 63, .adv_w = 109, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 67, .adv_w = 113, .box_w = 6, .box_h = 6, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 72, .adv_w = 110, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 76, .adv_w = 114, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 81, .adv_w = 104, .box_w = 6, .box_h = 6, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 86, .adv_w = 116, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 91, .adv_w = 114, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 96, .adv_w = 44, .box_w = 1, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 97, .adv_w = 44, .box_w = 2, .box_h = 6, .ofs_x = 0, .ofs_y = -1},
    {.bitmap_index = 99, .adv_w = 99, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 1},
    {.bitmap_index = 103, .adv_w = 99, .box_w = 6, .box_h = 3, .ofs_x = 0, .ofs_y = 1},
    {.bitmap_index = 106, .adv_w = 99, .box_w = 5, .box_h = 5, .ofs_x = 0, .ofs_y = 1},
    {.bitmap_index = 110, .adv_w = 91, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 114, .adv_w = 123, .box_w = 6, .box_h = 8, .ofs_x = 1, .ofs_y = -2},
    {.bitmap_index = 120, .adv_w = 125, .box_w = 8, .box_h = 6, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 126, .adv_w = 115, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 131, .adv_w = 109, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 135, .adv_w = 118, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 140, .adv_w = 111, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 145, .adv_w = 106, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 149, .adv_w = 117, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 154, .adv_w = 119, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 159, .adv_w = 45, .box_w = 1, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 160, .adv_w = 93, .box_w = 5, .box_h = 6, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 164, .adv_w = 113, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 169, .adv_w = 100, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 173, .adv_w = 176, .box_w = 9, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 180, .adv_w = 141, .box_w = 7, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 186, .adv_w = 131, .box_w = 7, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 192, .adv_w = 109, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 197, .adv_w = 131, .box_w = 7, .box_h = 7, .ofs_x = 1, .ofs_y = -1},
    {.bitmap_index = 204, .adv_w = 114, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 209, .adv_w = 112, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 214, .adv_w = 91, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 218, .adv_w = 117, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 223, .adv_w = 125, .box_w = 8, .box_h = 6, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 229, .adv_w = 167, .box_w = 10, .box_h = 6, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 237, .adv_w = 125, .box_w = 8, .box_h = 6, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 243, .adv_w = 110, .box_w = 7, .box_h = 6, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 249, .adv_w = 119, .box_w = 7, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 255, .adv_w = 63, .box_w = 3, .box_h = 11, .ofs_x = 1, .ofs_y = -3},
    {.bitmap_index = 260, .adv_w = 73, .box_w = 4, .box_h = 9, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 265, .adv_w = 63, .box_w = 3, .box_h = 11, .ofs_x = 0, .ofs_y = -3},
    {.bitmap_index = 270, .adv_w = 86, .box_w = 4, .box_h = 4, .ofs_x = 1, .ofs_y = 3},
    {.bitmap_index = 272, .adv_w = 82, .box_w = 5, .box_h = 1, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 273, .adv_w = 55, .box_w = 2, .box_h = 2, .ofs_x = 1, .ofs_y = 5},
    {.bitmap_index = 274, .adv_w = 108, .box_w = 6, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 278, .adv_w = 111, .box_w = 6, .box_h = 7, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 284, .adv_w = 96, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 288, .adv_w = 111, .box_w = 6, .box_h = 7, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 294, .adv_w = 104, .box_w = 6, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 298, .adv_w = 60, .box_w = 3, .box_h = 7, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 301, .adv_w = 111, .box_w = 6, .box_h = 7, .ofs_x = 1, .ofs_y = -2},
    {.bitmap_index = 307, .adv_w = 113, .box_w = 6, .box_h = 7, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 313, .adv_w = 41, .box_w = 1, .box_h = 7, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 314, .adv_w = 43, .box_w = 2, .box_h = 9, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 317, .adv_w = 96, .box_w = 5, .box_h = 7, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 322, .adv_w = 41, .box_w = 1, .box_h = 7, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 323, .adv_w = 165, .box_w = 9, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 329, .adv_w = 113, .box_w = 6, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 333, .adv_w = 107, .box_w = 6, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 337, .adv_w = 111, .box_w = 6, .box_h = 7, .ofs_x = 1, .ofs_y = -2},
    {.bitmap_index = 343, .adv_w = 111, .box_w = 6, .box_h = 7, .ofs_x = 1, .ofs_y = -2},
    {.bitmap_index = 349, .adv_w = 74, .box_w = 4, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 352, .adv_w = 94, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 356, .adv_w = 60, .box_w = 3, .box_h = 6, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 359, .adv_w = 112, .box_w = 6, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 363, .adv_w = 108, .box_w = 7, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 368, .adv_w = 156, .box_w = 9, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 374, .adv_w = 109, .box_w = 7, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 379, .adv_w = 104, .box_w = 6, .box_h = 7, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 385, .adv_w = 100, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 389, .adv_w = 63, .box_w = 3, .box_h = 11, .ofs_x = 1, .ofs_y = -3},
    {.bitmap_index = 394, .adv_w = 46, .box_w = 1, .box_h = 9, .ofs_x = 1, .ofs_y = -2},
    {.bitmap_index = 396, .adv_w = 63, .box_w = 3, .box_h = 11, .ofs_x = 1, .ofs_y = -3},
    {.bitmap_index = 401, .adv_w = 99, .box_w = 6, .box_h = 2, .ofs_x = 0, .ofs_y = 2}
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
    0, -6, 0, -6, 3, 0, -6, 0,
    0, 6, 0, 0, 0, -16, -5, -5,
    -19, 0, -3, -1, 2, 2, 0, 0,
    3, 0, 0, -5, 0, -5, 0, 0,
    0, -3, 0, 0, 5, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 9, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -6, 0, 0, -6, -5, 0, -2, 0,
    -6, 0, -2, -8, 0, 0, -6, 0,
    0, -5, 0, 0, -11, -14, -5, 0,
    -16, -1, -2, -3, 0, -3, 0, 0,
    0, 0, -8, -3, -12, 0, -12, 0,
    0, 0, 0, 0, 0, 0, 5, 0,
    0, -17, 0, 0, 0, -5, 0, 0,
    0, 0, 0, 0, -5, -8, 0, -9,
    -14, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -3, -6, -3, 0,
    -6, -9, 0, 0, 0, -5, -3, -5,
    0, -8, 0, -5, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, -3, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -1, -3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -4, 0, 0,
    0, 0, 0, 0, 0, 0, 0, -5,
    0, -2, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -2, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, -6, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -25, 0, -2, 0, -3, -5, 0,
    -4, 3, 0, -2, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -2, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -6, 0, 0, 0, -3, 0, 0,
    0, -3, 0, -1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -3, 3, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -16, 0, -5, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 3, -6, 0,
    0, -6, 0, 0, -11, -12, -5, 3,
    -16, -2, -3, -5, 0, -5, 0, 0,
    0, 0, -5, -5, -8, 3, -7, 0,
    0, 0, -6, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, -2, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, -4, 0, 0, -5, 0, 0,
    0, 0, 0, -4, 0, 0, 0, -3,
    -5, -6, 0, 0, 0, 0, 0, 0,
    0, 2, 0, 0, 0, -6, 0, 0,
    -3, 0, 0, 0, -3, -6, -3, -8,
    -11, -3, -3, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -6, 0, -3,
    0, -8, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -8, 0, 0,
    -8, 0, 0, 0, 0, 0, 0, -3,
    0, -3, 0, 0, 0, 0, 0, 0,
    -3, 0, 0, 0, 0, 0, 0, 0,
    0, -2, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -4, 0, 0,
    0, 0, 0, 0, 0, 0, 0, -6,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -5, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -6, 0, 0,
    0, 0, 0, 0, 0, 0, 0, -3,
    0, 0, -3, 0, 0, 0, -3, 0,
    0, 0, 0, 0, 0, -3, 0, -2,
    0, 0, -9, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 3, -8, 0,
    0, -3, 0, 0, 0, 0, 0, 0,
    0, -3, -4, -6, 0, -8, 0, 0,
    0, 0, -2, -4, -5, 0, -5, -5,
    -16, 0, -3, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -6, 0, -3, 0,
    0, -3, 0, 0, -10, -10, -3, 0,
    -16, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -6, 0, -8, 0,
    -3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -2, -6, -3, 0,
    -8, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -6, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -7, 0, 0,
    0, -2, 0, 0, 0, 0, 0, -3,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -2, 0, 0,
    0, -19, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -12, 0, -2,
    -19, 0, 0, 0, 0, -4, -2, 0,
    -8, -5, -6, -2, 0, -3, 0, -3,
    -3, 0, 0, 0, 0, -3, 0, -2,
    -1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, -2, 0,
    0, -2, 0, 0, -2, -5, -2, 0,
    -8, -4, -4, -6, 0, -4, 0, 0,
    0, 0, 0, -2, 0, 0, 0, -3,
    0, -3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, -1, -3,
    0, 0, 0, 0, -5, 0, -1, -5,
    -3, -2, -2, 0, 0, -2, 0, 0,
    0, 0, 0, 0, -3, -4, -3, 0,
    2, -11, -5, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -11, -3, -3,
    -14, 0, -2, -1, 3, 3, 2, 0,
    3, 0, -3, -5, 3, -5, 0, -3,
    -5, -5, 3, 0, 3, 0, 3, 0,
    2, -14, -8, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -12, -6, -9,
    -16, 0, -6, -3, 3, 3, 2, 0,
    3, -3, -9, -9, 0, -9, 0, -6,
    -9, -8, 0, 0, 0, 0, 0, -3,
    0, -5, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -5, -3, -4,
    -4, 0, -3, 0, 2, 2, 2, 0,
    3, 0, -5, -4, 0, -3, 0, -3,
    -6, -2, 0, 0, 0, 0, 0, -3,
    3, -16, -14, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -16, -11, -13,
    -20, 0, -8, -6, 3, 3, 3, 0,
    3, 0, -9, -16, 0, -17, 0, -11,
    -16, -12, 0, -9, -3, -6, -3, -8,
    0, 0, -3, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, -3, 0,
    0, 0, 0, 0, 0, -4, 0, 0,
    0, 0, -3, -4, 0, -5, 0, 0,
    0, 0, 0, -1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 11, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -3, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -5, -5, -5, 0,
    -5, -3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -6, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -5, -5, -3, -1,
    0, -3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -3, 0, 0, -3,
    8, -6, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 8, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, -4, 0, 3, -3, 0, 0,
    0, 0, 3, 0, 0, 0, 0, 0,
    -3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -6, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 6, 0,
    0, 0, 0, 0, -4, 0, -6, 0,
    -5, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -6, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -1, 0, 0, 0,
    0, 0, 0, -1, -3, 0, -3, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -3, 8, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, -6, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, -3, -5, 0, -5, 0, 0,
    0, 0, 0, -3, 3, 0, 0, 0,
    0, -16, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 3, 0, 0, 0,
    -1, 0, 3, 0, 3, 0, 3, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 5, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 3, 0, 0, 0,
    0, 0, 3, 0, 3, 3, 0, 0,
    3, -12, -3, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 5, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, -5, 0, -4, 0, -1,
    -4, -3, 3, 0, 3, 3, 2, 0,
    2, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -3, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, -2, 0, 0, 0, 0,
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
const lv_font_t ui_font_FontNasa10 = {
#else
lv_font_t ui_font_FontNasa10 = {
#endif
    .get_glyph_dsc = lv_font_get_glyph_dsc_fmt_txt,    /*Function pointer to get glyph's data*/
    .get_glyph_bitmap = lv_font_get_bitmap_fmt_txt,    /*Function pointer to get glyph's bitmap*/
    .line_height = 11,          /*The maximum line height required by the font*/
    .base_line = 3,             /*Baseline measured from the bottom of the line*/
#if !(LVGL_VERSION_MAJOR == 6 && LVGL_VERSION_MINOR == 0)
    .subpx = LV_FONT_SUBPX_NONE,
#endif
#if LV_VERSION_CHECK(7, 4, 0) || LVGL_VERSION_MAJOR >= 8
    .underline_position = -1,
    .underline_thickness = 0,
#endif
    .dsc = &font_dsc           /*The custom font data. Will be accessed by `get_glyph_bitmap/dsc` */
};



#endif /*#if UI_FONT_FONTNASA10*/

