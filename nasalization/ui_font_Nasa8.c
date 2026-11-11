/*******************************************************************************
 * Size: 8 px
 * Bpp: 1
 * Opts: --bpp 1 --size 8 --font /Users/macadmin/Documents/Arduino/SC01_BASE_A5600/SC01_BASE_SQUARELINE/assets/nasalization-rg.otf -o /Users/macadmin/Documents/Arduino/SC01_BASE_A5600/SC01_BASE_SQUARELINE/assets/ui_font_Nasa8.c --format lvgl -r 0x20-0x7f --no-compress --no-prefilter
 ******************************************************************************/

#include "../ui.h"

#ifndef UI_FONT_NASA8
#define UI_FONT_NASA8 1
#endif

#if UI_FONT_NASA8

/*-----------------
 *    BITMAPS
 *----------------*/

/*Store the image of the glyphs*/
static LV_ATTRIBUTE_LARGE_CONST const uint8_t glyph_bitmap[] = {
    /* U+0020 " " */
    0x0,

    /* U+0021 "!" */
    0xe8,

    /* U+0022 "\"" */
    0xf0,

    /* U+0023 "#" */
    0x57, 0xd5, 0xf5, 0x0,

    /* U+0024 "$" */
    0x2f, 0x8f, 0xf2,

    /* U+0025 "%" */
    0xe9, 0x63, 0xf9, 0x95, 0xe0,

    /* U+0026 "&" */
    0x71, 0x43, 0x3e, 0x93, 0xe0,

    /* U+0027 "'" */
    0xc0,

    /* U+0028 "(" */
    0x72, 0x49, 0x24, 0x60,

    /* U+0029 ")" */
    0xc4, 0x92, 0x49, 0xc0,

    /* U+002A "*" */
    0x23, 0x9c, 0x40,

    /* U+002B "+" */
    0x27, 0xc8, 0x40,

    /* U+002C "," */
    0xe0,

    /* U+002D "-" */
    0xe0,

    /* U+002E "." */
    0x80,

    /* U+002F "/" */
    0x22, 0x24, 0x44, 0x88,

    /* U+0030 "0" */
    0x74, 0x63, 0x17, 0x0,

    /* U+0031 "1" */
    0xd5, 0x40,

    /* U+0032 "2" */
    0xf8, 0x5d, 0xf, 0x80,

    /* U+0033 "3" */
    0xf8, 0x4c, 0x1f, 0x80,

    /* U+0034 "4" */
    0x3b, 0x63, 0xf0, 0x80,

    /* U+0035 "5" */
    0xfc, 0x3e, 0x1f, 0x80,

    /* U+0036 "6" */
    0x7c, 0x3f, 0x17, 0x80,

    /* U+0037 "7" */
    0xf8, 0x44, 0x46, 0x0,

    /* U+0038 "8" */
    0xfc, 0x5d, 0x1f, 0x80,

    /* U+0039 "9" */
    0xf4, 0x7e, 0x17, 0x0,

    /* U+003A ":" */
    0x90,

    /* U+003B ";" */
    0x98,

    /* U+003C "<" */
    0x7, 0x87,

    /* U+003D "=" */
    0xf8, 0x3e,

    /* U+003E ">" */
    0xe, 0x1e,

    /* U+003F "?" */
    0xf1, 0x74, 0x40,

    /* U+0040 "@" */
    0xff, 0xf3, 0xf8, 0x7c,

    /* U+0041 "A" */
    0x30, 0xa4, 0x93, 0x84,

    /* U+0042 "B" */
    0xfc, 0x7d, 0x1f, 0x80,

    /* U+0043 "C" */
    0x7c, 0x21, 0x7, 0x80,

    /* U+0044 "D" */
    0xf4, 0x63, 0x1f, 0x0,

    /* U+0045 "E" */
    0xfc, 0x1f, 0xf, 0x80,

    /* U+0046 "F" */
    0xf8, 0xf8, 0x80,

    /* U+0047 "G" */
    0x7c, 0x2f, 0x17, 0x80,

    /* U+0048 "H" */
    0x8c, 0x7f, 0x18, 0x80,

    /* U+0049 "I" */
    0xf8,

    /* U+004A "J" */
    0x11, 0x11, 0xf0,

    /* U+004B "K" */
    0x94, 0xb9, 0x28, 0x80,

    /* U+004C "L" */
    0x88, 0x88, 0xf0,

    /* U+004D "M" */
    0xe7, 0xa5, 0xa5, 0xbd, 0x99,

    /* U+004E "N" */
    0xc6, 0x9b, 0x65, 0x8c,

    /* U+004F "O" */
    0x7a, 0x18, 0x61, 0x78,

    /* U+0050 "P" */
    0xf8, 0x7f, 0x8, 0x0,

    /* U+0051 "Q" */
    0x7a, 0x18, 0x65, 0x78, 0x20,

    /* U+0052 "R" */
    0xf8, 0x7f, 0x28, 0x80,

    /* U+0053 "S" */
    0xfc, 0x3e, 0x1f, 0x80,

    /* U+0054 "T" */
    0xf9, 0x8, 0x42, 0x0,

    /* U+0055 "U" */
    0x8c, 0x63, 0x1f, 0x80,

    /* U+0056 "V" */
    0x85, 0x24, 0x8a, 0x30,

    /* U+0057 "W" */
    0x99, 0x95, 0x55, 0x65, 0x66,

    /* U+0058 "X" */
    0x4c, 0xa3, 0xa, 0x4c,

    /* U+0059 "Y" */
    0x8a, 0x88, 0x42, 0x0,

    /* U+005A "Z" */
    0xf8, 0x4d, 0x8f, 0x80,

    /* U+005B "[" */
    0xf2, 0x49, 0x24, 0xe0,

    /* U+005C "\\" */
    0x88, 0x44, 0x42, 0x22,

    /* U+005D "]" */
    0xe4, 0x92, 0x49, 0xe0,

    /* U+005E "^" */
    0x66, 0x99,

    /* U+005F "_" */
    0xf0,

    /* U+0060 "`" */
    0xa0,

    /* U+0061 "a" */
    0xf7, 0xe3, 0xe0,

    /* U+0062 "b" */
    0x84, 0x3d, 0x18, 0xf8,

    /* U+0063 "c" */
    0xf8, 0x8f,

    /* U+0064 "d" */
    0x8, 0x5f, 0x18, 0xbc,

    /* U+0065 "e" */
    0xf4, 0xfd, 0xe0,

    /* U+0066 "f" */
    0x6b, 0xa4, 0x80,

    /* U+0067 "g" */
    0x7c, 0x62, 0xf0, 0xbc,

    /* U+0068 "h" */
    0x84, 0x3d, 0x18, 0xc4,

    /* U+0069 "i" */
    0xbc,

    /* U+006A "j" */
    0x55, 0x5c,

    /* U+006B "k" */
    0x88, 0x9e, 0xb9,

    /* U+006C "l" */
    0xfc,

    /* U+006D "m" */
    0xff, 0x26, 0x4c, 0x90,

    /* U+006E "n" */
    0xf4, 0x63, 0x10,

    /* U+006F "o" */
    0x74, 0x62, 0xe0,

    /* U+0070 "p" */
    0xf4, 0x63, 0xe8, 0x40,

    /* U+0071 "q" */
    0x7c, 0x62, 0xf0, 0x84,

    /* U+0072 "r" */
    0xf2, 0x40,

    /* U+0073 "s" */
    0xff, 0x1f,

    /* U+0074 "t" */
    0x5d, 0x26,

    /* U+0075 "u" */
    0x8c, 0x63, 0xf0,

    /* U+0076 "v" */
    0x8a, 0x54, 0x60,

    /* U+0077 "w" */
    0x99, 0xba, 0x66, 0x66,

    /* U+0078 "x" */
    0x49, 0x8c, 0x90,

    /* U+0079 "y" */
    0x8a, 0x94, 0xa2, 0x10,

    /* U+007A "z" */
    0xf1, 0xef,

    /* U+007B "{" */
    0x69, 0x28, 0x92, 0x60,

    /* U+007C "|" */
    0xfe,

    /* U+007D "}" */
    0xc9, 0x22, 0x92, 0xc0,

    /* U+007E "~" */
    0xf0
};


/*---------------------
 *  GLYPH DESCRIPTION
 *--------------------*/

static const lv_font_fmt_txt_glyph_dsc_t glyph_dsc[] = {
    {.bitmap_index = 0, .adv_w = 0, .box_w = 0, .box_h = 0, .ofs_x = 0, .ofs_y = 0} /* id = 0 reserved */,
    {.bitmap_index = 0, .adv_w = 34, .box_w = 1, .box_h = 1, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 1, .adv_w = 30, .box_w = 1, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 2, .adv_w = 49, .box_w = 2, .box_h = 2, .ofs_x = 1, .ofs_y = 4},
    {.bitmap_index = 3, .adv_w = 80, .box_w = 5, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 7, .adv_w = 79, .box_w = 4, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 10, .adv_w = 108, .box_w = 7, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 15, .adv_w = 98, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 20, .adv_w = 25, .box_w = 1, .box_h = 2, .ofs_x = 1, .ofs_y = 4},
    {.bitmap_index = 21, .adv_w = 50, .box_w = 3, .box_h = 9, .ofs_x = 1, .ofs_y = -2},
    {.bitmap_index = 25, .adv_w = 50, .box_w = 3, .box_h = 9, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 29, .adv_w = 71, .box_w = 5, .box_h = 4, .ofs_x = 0, .ofs_y = 2},
    {.bitmap_index = 32, .adv_w = 79, .box_w = 5, .box_h = 4, .ofs_x = 0, .ofs_y = 1},
    {.bitmap_index = 35, .adv_w = 33, .box_w = 1, .box_h = 3, .ofs_x = 1, .ofs_y = -1},
    {.bitmap_index = 36, .adv_w = 53, .box_w = 3, .box_h = 1, .ofs_x = 0, .ofs_y = 2},
    {.bitmap_index = 37, .adv_w = 31, .box_w = 1, .box_h = 1, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 38, .adv_w = 58, .box_w = 4, .box_h = 8, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 42, .adv_w = 96, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 46, .adv_w = 43, .box_w = 2, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 48, .adv_w = 94, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 52, .adv_w = 87, .box_w = 5, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 56, .adv_w = 90, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 60, .adv_w = 88, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 64, .adv_w = 91, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 68, .adv_w = 83, .box_w = 5, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 72, .adv_w = 93, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 76, .adv_w = 91, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 80, .adv_w = 35, .box_w = 1, .box_h = 4, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 81, .adv_w = 35, .box_w = 1, .box_h = 5, .ofs_x = 1, .ofs_y = -1},
    {.bitmap_index = 82, .adv_w = 79, .box_w = 4, .box_h = 4, .ofs_x = 1, .ofs_y = 1},
    {.bitmap_index = 84, .adv_w = 79, .box_w = 5, .box_h = 3, .ofs_x = 0, .ofs_y = 1},
    {.bitmap_index = 86, .adv_w = 79, .box_w = 4, .box_h = 4, .ofs_x = 0, .ofs_y = 1},
    {.bitmap_index = 88, .adv_w = 73, .box_w = 4, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 91, .adv_w = 98, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = -2},
    {.bitmap_index = 95, .adv_w = 100, .box_w = 6, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 99, .adv_w = 92, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 103, .adv_w = 87, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 107, .adv_w = 94, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 111, .adv_w = 89, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 115, .adv_w = 85, .box_w = 4, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 118, .adv_w = 93, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 122, .adv_w = 95, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 126, .adv_w = 36, .box_w = 1, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 127, .adv_w = 75, .box_w = 4, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 130, .adv_w = 91, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 134, .adv_w = 80, .box_w = 4, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 137, .adv_w = 141, .box_w = 8, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 142, .adv_w = 113, .box_w = 6, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 146, .adv_w = 104, .box_w = 6, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 150, .adv_w = 87, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 154, .adv_w = 104, .box_w = 6, .box_h = 6, .ofs_x = 1, .ofs_y = -1},
    {.bitmap_index = 159, .adv_w = 91, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 163, .adv_w = 90, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 167, .adv_w = 73, .box_w = 5, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 171, .adv_w = 94, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 175, .adv_w = 100, .box_w = 6, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 179, .adv_w = 134, .box_w = 8, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 184, .adv_w = 100, .box_w = 6, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 188, .adv_w = 88, .box_w = 5, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 192, .adv_w = 95, .box_w = 5, .box_h = 5, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 196, .adv_w = 50, .box_w = 3, .box_h = 9, .ofs_x = 1, .ofs_y = -2},
    {.bitmap_index = 200, .adv_w = 58, .box_w = 4, .box_h = 8, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 204, .adv_w = 50, .box_w = 3, .box_h = 9, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 208, .adv_w = 68, .box_w = 4, .box_h = 4, .ofs_x = 0, .ofs_y = 2},
    {.bitmap_index = 210, .adv_w = 66, .box_w = 4, .box_h = 1, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 211, .adv_w = 44, .box_w = 2, .box_h = 2, .ofs_x = 1, .ofs_y = 4},
    {.bitmap_index = 212, .adv_w = 86, .box_w = 5, .box_h = 4, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 215, .adv_w = 89, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 219, .adv_w = 77, .box_w = 4, .box_h = 4, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 221, .adv_w = 89, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 225, .adv_w = 83, .box_w = 5, .box_h = 4, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 228, .adv_w = 48, .box_w = 3, .box_h = 6, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 231, .adv_w = 89, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = -2},
    {.bitmap_index = 235, .adv_w = 90, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 239, .adv_w = 33, .box_w = 1, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 240, .adv_w = 35, .box_w = 2, .box_h = 7, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 242, .adv_w = 77, .box_w = 4, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 245, .adv_w = 33, .box_w = 1, .box_h = 6, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 246, .adv_w = 132, .box_w = 7, .box_h = 4, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 250, .adv_w = 90, .box_w = 5, .box_h = 4, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 253, .adv_w = 86, .box_w = 5, .box_h = 4, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 256, .adv_w = 89, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = -2},
    {.bitmap_index = 260, .adv_w = 89, .box_w = 5, .box_h = 6, .ofs_x = 1, .ofs_y = -2},
    {.bitmap_index = 264, .adv_w = 59, .box_w = 3, .box_h = 4, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 266, .adv_w = 75, .box_w = 4, .box_h = 4, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 268, .adv_w = 48, .box_w = 3, .box_h = 5, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 270, .adv_w = 90, .box_w = 5, .box_h = 4, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 273, .adv_w = 87, .box_w = 5, .box_h = 4, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 276, .adv_w = 125, .box_w = 8, .box_h = 4, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 280, .adv_w = 87, .box_w = 5, .box_h = 4, .ofs_x = 0, .ofs_y = 0},
    {.bitmap_index = 283, .adv_w = 83, .box_w = 5, .box_h = 6, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 287, .adv_w = 80, .box_w = 4, .box_h = 4, .ofs_x = 1, .ofs_y = 0},
    {.bitmap_index = 289, .adv_w = 50, .box_w = 3, .box_h = 9, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 293, .adv_w = 37, .box_w = 1, .box_h = 7, .ofs_x = 1, .ofs_y = -1},
    {.bitmap_index = 294, .adv_w = 50, .box_w = 3, .box_h = 9, .ofs_x = 0, .ofs_y = -2},
    {.bitmap_index = 298, .adv_w = 79, .box_w = 5, .box_h = 1, .ofs_x = 0, .ofs_y = 2}
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
    0, -5, 0, -5, 3, 0, -5, 0,
    0, 5, 0, 0, 0, -13, -4, -4,
    -15, 0, -3, -1, 1, 1, 0, 0,
    3, 0, 0, -4, 0, -4, 0, 0,
    0, -2, 0, 0, 4, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 8, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -5, 0, 0, -5, -4, 0, -1, 0,
    -5, 0, -1, -6, 0, 0, -5, 0,
    0, -4, 0, 0, -9, -11, -4, 0,
    -13, -1, -2, -3, 0, -3, 0, 0,
    0, 0, -6, -3, -10, 0, -10, 0,
    0, 0, 0, 0, 0, 0, 4, 0,
    0, -14, 0, 0, 0, -4, 0, 0,
    0, 0, 0, 0, -4, -6, 0, -8,
    -11, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -3, -5, -3, 0,
    -5, -8, 0, 0, 0, -4, -2, -4,
    0, -6, 0, -4, 0, 0, 0, 0,
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
    0, 0, 0, 0, 0, -3, 0, 0,
    0, 0, 0, 0, 0, 0, 0, -4,
    0, -1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -1, 0, 0, 0, 0, 0, 0, 0,
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
    0, 0, 0, -5, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -20, 0, -1, 0, -3, -4, 0,
    -3, 3, 0, -1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -5, 0, 0, 0, -2, 0, 0,
    0, -3, 0, -1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -3, 3, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -13, 0, -4, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 3, -5, 0,
    0, -5, 0, 0, -9, -10, -4, 3,
    -13, -2, -3, -4, 0, -4, 0, 0,
    0, 0, -4, -4, -7, 3, -5, 0,
    0, 0, -5, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, -1, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, -3, 0, 0, -4, 0, 0,
    0, 0, 0, -3, 0, 0, 0, -2,
    -4, -5, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, -5, 0, 0,
    -3, 0, 0, 0, -3, -5, -3, -6,
    -9, -3, -2, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -5, 0, -3,
    0, -6, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -6, 0, 0,
    -6, 0, 0, 0, 0, 0, 0, -2,
    0, -2, 0, 0, 0, 0, 0, 0,
    -3, 0, 0, 0, 0, 0, 0, 0,
    0, -1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -3, 0, 0,
    0, 0, 0, 0, 0, 0, 0, -5,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -4, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -5, 0, 0,
    0, 0, 0, 0, 0, 0, 0, -3,
    0, 0, -2, 0, 0, 0, -3, 0,
    0, 0, 0, 0, 0, -2, 0, -1,
    0, 0, -8, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 3, -6, 0,
    0, -3, 0, 0, 0, 0, 0, 0,
    0, -2, -3, -5, 0, -6, 0, 0,
    0, 0, -2, -4, -4, 0, -4, -4,
    -13, 0, -3, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -5, 0, -3, 0,
    0, -2, 0, 0, -8, -8, -2, 0,
    -13, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -5, 0, -6, 0,
    -3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -1, -5, -3, 0,
    -6, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -4, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -5, 0, 0,
    0, -2, 0, 0, 0, 0, 0, -2,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -1, 0, 0,
    0, -15, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -9, 0, -2,
    -15, 0, 0, 0, 0, -3, -1, 0,
    -6, -4, -5, -2, 0, -3, 0, -3,
    -3, 0, 0, 0, 0, -2, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, -2, 0,
    0, -2, 0, 0, -2, -4, -2, 0,
    -6, -3, -3, -4, 0, -3, 0, 0,
    0, 0, 0, -2, 0, 0, 0, -3,
    0, -2, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, -1, -3,
    0, 0, 0, 0, -4, 0, -1, -4,
    -3, -1, -2, 0, 0, -1, 0, 0,
    0, 0, 0, 0, -2, -3, -3, 0,
    1, -9, -4, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -9, -3, -2,
    -11, 0, -1, -1, 3, 3, 1, 0,
    3, 0, -3, -4, 3, -4, 0, -3,
    -4, -4, 3, 0, 3, 0, 3, 0,
    1, -11, -6, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -10, -5, -7,
    -13, 0, -5, -2, 3, 3, 1, 0,
    3, -3, -8, -8, 0, -8, 0, -5,
    -8, -6, 0, 0, 0, 0, 0, -3,
    0, -4, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -4, -3, -3,
    -3, 0, -3, 0, 1, 1, 1, 0,
    3, 0, -4, -3, 0, -3, 0, -3,
    -5, -2, 0, 0, 0, 0, 0, -2,
    3, -13, -11, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -13, -9, -10,
    -16, 0, -6, -5, 3, 3, 3, 0,
    3, 0, -8, -13, 0, -13, 0, -9,
    -13, -10, 0, -8, -3, -5, -3, -6,
    0, 0, -3, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, -3, 0,
    0, 0, 0, 0, 0, -4, 0, 0,
    0, 0, -3, -3, 0, -4, 0, 0,
    0, 0, 0, -1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 9, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    -3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -3, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -4, -4, -4, 0,
    -4, -3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -5, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -4, -4, -3, -1,
    0, -3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -2, 0, 0, -2,
    6, -5, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 6, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, -4, 0, 3, -2, 0, 0,
    0, 0, 3, 0, 0, 0, 0, 0,
    -3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -5, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 5, 0,
    0, 0, 0, 0, -4, 0, -5, 0,
    -4, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -5, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -1, 0, 0, 0,
    0, 0, 0, -1, -3, 0, -3, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -3, 6, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, -5, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, -3, -4, 0, -4, 0, 0,
    0, 0, 0, -3, 3, 0, 0, 0,
    0, -13, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 3, 0, 0, 0,
    -1, 0, 3, 0, 3, 0, 3, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 4, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 3, 0, 0, 0,
    0, 0, 3, 0, 3, 3, 0, 0,
    3, -10, -3, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 4, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, -4, 0, -3, 0, -1,
    -3, -2, 3, 0, 3, 3, 1, 0,
    1, 0, 0, 0, 0, 0, 0, 0,
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

#if LVGL_VERSION_MAJOR == 8
/*Store all the custom data of the font*/
static  lv_font_fmt_txt_glyph_cache_t cache;
#endif

#if LVGL_VERSION_MAJOR >= 8
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
#if LVGL_VERSION_MAJOR == 8
    .cache = &cache
#endif
};



/*-----------------
 *  PUBLIC FONT
 *----------------*/

/*Initialize a public general font descriptor*/
#if LVGL_VERSION_MAJOR >= 8
const lv_font_t ui_font_Nasa8 = {
#else
lv_font_t ui_font_Nasa8 = {
#endif
    .get_glyph_dsc = lv_font_get_glyph_dsc_fmt_txt,    /*Function pointer to get glyph's data*/
    .get_glyph_bitmap = lv_font_get_bitmap_fmt_txt,    /*Function pointer to get glyph's bitmap*/
    .line_height = 9,          /*The maximum line height required by the font*/
    .base_line = 2,             /*Baseline measured from the bottom of the line*/
#if !(LVGL_VERSION_MAJOR == 6 && LVGL_VERSION_MINOR == 0)
    .subpx = LV_FONT_SUBPX_NONE,
#endif
#if LV_VERSION_CHECK(7, 4, 0) || LVGL_VERSION_MAJOR >= 8
    .underline_position = -1,
    .underline_thickness = 0,
#endif
    .dsc = &font_dsc,          /*The custom font data. Will be accessed by `get_glyph_bitmap/dsc` */
#if LV_VERSION_CHECK(8, 2, 0) || LVGL_VERSION_MAJOR >= 9
    .fallback = NULL,
#endif
    .user_data = NULL,
};



#endif /*#if UI_FONT_NASA8*/

