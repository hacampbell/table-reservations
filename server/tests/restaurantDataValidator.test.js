const dataValidator = require('../services/restaurantDataValidator');

/************************************************************************************************
 *                              Testing Restaurant Name Validation                              *
 ************************************************************************************************/
test('[RESTAURANT NAME] Can detect valid name (Dorsia)', () => {
    expect(dataValidator.isValidRestaurantName('Dorsia')).toEqual(true);
});

test('[RESTAURANT NAME] Can detect valid name (Dorsia with whitespace)', () => {
    expect(dataValidator.isValidRestaurantName('  Dorsia  ')).toEqual(true);
});

test('[RESTAURANT NAME] Can detect valid name (1 under upper char limit)', () => {
    expect(dataValidator.isValidRestaurantName('DorsiaDorsiaDorsiaDorsiaDorsiaDorsiaDorsiaDo')).toEqual(true);
});

test('[RESTAURANT NAME] Can detect valid name (On upper char limit)', () => {
    expect(dataValidator.isValidRestaurantName('DorsiaDorsiaDorsiaDorsiaDorsiaDorsiaDorsiaDor')).toEqual(true);
});

test('[RESTAURANT NAME] Can detect valid name (On lower char limit)', () => {
    expect(dataValidator.isValidRestaurantName('Do')).toEqual(true);
});

test('[RESTAURANT NAME] Can detect invalid name (Below lower char limit)', () => {
    expect(dataValidator.isValidRestaurantName('D')).toEqual(false);
});

test('[RESTAURANT NAME] Can detect invalid name (Above upper char limit)', () => {
    expect(dataValidator.isValidRestaurantName('DorsiaDorsiaDorsiaDorsiaDorsiaDorsiaDorsiaDors')).toEqual(false);
});

test('[RESTAURANT NAME] Can detect invalid name (Empty)', () => {
    expect(dataValidator.isValidRestaurantName('')).toEqual(false);
});

test('[RESTAURANT NAME] Can detect invalid name (All white space)', () => {
    expect(dataValidator.isValidRestaurantName('                ')).toEqual(false);
});

/************************************************************************************************
 *                          Testing Restaurant Opening Hours Validation                         *
 ************************************************************************************************/
 test('[RESTAURANT OPENING HOURS] Can detect valid opening hours (09:00-20:00)', () => {
    expect(dataValidator.isValidOpeningHours('09:00-20:00')).toEqual(true);
});

test('[RESTAURANT OPENING HOURS] Can detect valid opening hours (09:00-20:00 with whitespace)', () => {
    expect(dataValidator.isValidOpeningHours('  09:00-20:00  ')).toEqual(true);
});

test('[RESTAURANT OPENING HOURS] Can detect invalid opening hours (09:00-20:00 whitespace in sequence)', () => {
    expect(dataValidator.isValidOpeningHours('09: 00-2 0:00')).toEqual(false);
});

test('[RESTAURANT OPENING HOURS] Can detect invalid opening hours (Invalid characters)', () => {
    expect(dataValidator.isValidOpeningHours('0a:x0-g:00')).toEqual(false);
});

test('[RESTAURANT OPENING HOURS] Can detect invalid opening hours (Not matching sequence)', () => {
    expect(dataValidator.isValidOpeningHours('9am - 8pm')).toEqual(false);
});

test('[RESTAURANT OPENING HOURS] Can detect invalid opening hours (Empty)', () => {
    expect(dataValidator.isValidOpeningHours('')).toEqual(false);
});

test('[RESTAURANT OPENING HOURS] Can detect invalid opening hours (All white space)', () => {
    expect(dataValidator.isValidOpeningHours('              ')).toEqual(false);
});


/************************************************************************************************
 *                          Testing Restaurant Opening Days Validation                          *
 ************************************************************************************************/
test('[RESTAURANT OPENING DAYS] Can detect valid opening days', () => {
    expect(dataValidator.isValidOpeningDays('')).toEqual(true);
});

/************************************************************************************************
 *                         Testing Restaurant Contact Number Validation                         *
 ************************************************************************************************/
test('[RESTAURANT CONTACT NUMBER] Can detect valid contact number (1111111111)', () => {
    expect(dataValidator.isValidContactNumber('1111111111')).toEqual(true);
});

test('[RESTAURANT CONTACT NUMBER] Can detect valid contact number (1111111111 with whitespace)', () => {
    expect(dataValidator.isValidContactNumber('  1111111111  ')).toEqual(true);
});

test('[RESTAURANT CONTACT NUMBER] Can detect invalid contact number (Short)', () => {
    expect(dataValidator.isValidContactNumber('111111111')).toEqual(false);
});

test('[RESTAURANT CONTACT NUMBER] Can detect invalid contact number (Bad data)', () => {
    expect(dataValidator.isValidContactNumber('sdfefadsfds')).toEqual(false);
});

test('[RESTAURANT CONTACT NUMBER] Can detect invalid contact number (Empty)', () => {
    expect(dataValidator.isValidContactNumber('')).toEqual(false);
});

test('[RESTAURANT CONTACT NUMBER] Can detect invalid contact number (All white space)', () => {
    expect(dataValidator.isValidContactNumber('                   ')).toEqual(false);
});

/************************************************************************************************
 *                             Testing Restaurant Address Validation                            *
 ************************************************************************************************/
test('[RESTAURANT ADDRESS] Can detect valid address (42 Demo Street, Demo City)', () => {
    expect(dataValidator.isValidAddress('42 Demo Street, Demo City')).toEqual(true);
});

test('[RESTAURANT ADDRESS] Can detect valid address (42 Demo Street, Demo City with whitesapce)', () => {
    expect(dataValidator.isValidAddress('  42 Demo Street, Demo City  ')).toEqual(true);
});

test('[RESTAURANT ADDRESS] Can detect invalid address (Does not match pattern)', () => {
    expect(dataValidator.isValidAddress('123 fake street')).toEqual(false);
});

test('[RESTAURANT ADDRESS] Can detect invalid address (Bad data)', () => {
    expect(dataValidator.isValidAddress('23432adfsdafsdff%%$$###')).toEqual(false);
});

test('[RESTAURANT ADDRESS] Can detect invalid address (Empty)', () => {
    expect(dataValidator.isValidAddress('')).toEqual(false);
});

test('[RESTAURANT ADDRESS] Can detect invalid contact number (All white space)', () => {
    expect(dataValidator.isValidAddress('')).toEqual(false);
});

/************************************************************************************************
 *                           Testing Restaurant Description Validation                          *
 ************************************************************************************************/
test('[RESTAURANT DESCRIPTION] Can detect valid description (Valid data)', () => {
    expect(dataValidator.isValidDescription('A cool restaurant that is serves cool food to cool people')).toEqual(true);
});

test('[RESTAURANT DESCRIPTION] Can detect valid description (1 below upper char limit)', () => {
    expect(dataValidator.isValidDescription('a'.repeat(511))).toEqual(true);
});

test('[RESTAURANT DESCRIPTION] Can detect valid description (1 below upper char limit)', () => {
    expect(dataValidator.isValidDescription('a'.repeat(511))).toEqual(true);
});

test('[RESTAURANT DESCRIPTION] Can detect valid description (At upper char limit)', () => {
    expect(dataValidator.isValidDescription('a'.repeat(512))).toEqual(true);
});

test('[RESTAURANT DESCRIPTION] Can detect valid description (At lower char limit)', () => {
    expect(dataValidator.isValidDescription('a')).toEqual(true);
});

test('[RESTAURANT DESCRIPTION] Can detect invalid description (Over char limit)', () => {
    expect(dataValidator.isValidDescription('a'.repeat(513))).toEqual(false);
});

test('[RESTAURANT DESCRIPTION] Can detect invalid description (Over char limit)', () => {
    expect(dataValidator.isValidDescription('a'.repeat(513))).toEqual(false);
});

test('[RESTAURANT DESCRIPTION] Can detect invalid description (Empty)', () => {
    expect(dataValidator.isValidDescription('')).toEqual(false);
});

test('[RESTAURANT DESCRIPTION] Can detect invalid description (All white space)', () => {
    expect(dataValidator.isValidDescription('             ')).toEqual(false);
});

/************************************************************************************************
 *                              Testing Restaurant Image Validation                             *
 ************************************************************************************************/
test('[RESTAURANT IMAGE] Can detect valid image (name.png)', () => {
    expect(dataValidator.isValidImage('name.png')).toEqual(true);
});

test('[RESTAURANT IMAGE] Can detect valid image (name.jpg)', () => {
    expect(dataValidator.isValidImage('name.jpg')).toEqual(true);
});

test('[RESTAURANT IMAGE] Can detect valid image (name.jpeg)', () => {
    expect(dataValidator.isValidImage('name.jpeg')).toEqual(true);
});

test('[RESTAURANT IMAGE] Can detect valid image (name.png with white space)', () => {
    expect(dataValidator.isValidImage('  name.png  ')).toEqual(true);
});

test('[RESTAURANT IMAGE] Can detect invalid image (Does not match pattern)', () => {
    expect(dataValidator.isValidImage('assets/img/name.png')).toEqual(false);
});

test('[RESTAURANT IMAGE] Can detect invalid image (Does not match pattern)', () => {
    expect(dataValidator.isValidImage('src/assets/pics/na me.png')).toEqual(false);
});

test('[RESTAURANT IMAGE] Can detect invalid image (Bad data)', () => {
    expect(dataValidator.isValidImage('1341123sasadfdass^^^&&&%$')).toEqual(false);
});

test('[RESTAURANT IMAGE] Can detect invalid image (Empty)', () => {
    expect(dataValidator.isValidImage('')).toEqual(false);
});

test('[RESTAURANT IMAGE] Can detect invalid image (All whitespace)', () => {
    expect(dataValidator.isValidImage('                ')).toEqual(false);
});

/************************************************************************************************
 *                              Testing Max Guest Image Validation                              *
 ************************************************************************************************/
test('[RESTAURANT MAX GUESTS] Can detect valid maxGuets (1)', () => {
    expect(dataValidator.isValidMaxGuests(1)).toEqual(true);
});

test('[RESTAURANT MAX GUESTS] Can detect valid maxGuets (12223)', () => {
    expect(dataValidator.isValidMaxGuests(12223)).toEqual(true);
});

test('[RESTAURANT MAX GUESTS] Can detect invalid maxGuets ("1")', () => {
    expect(dataValidator.isValidMaxGuests('1')).toEqual(false);
});

test('[RESTAURANT MAX GUESTS] Can detect invalid maxGuets (0)', () => {
    expect(dataValidator.isValidMaxGuests(0)).toEqual(false);
});

test('[RESTAURANT MAX GUESTS] Can detect invalid maxGuets (asdfd)', () => {
    expect(dataValidator.isValidMaxGuests('asdfd')).toEqual(false);
});

test('[RESTAURANT MAX GUESTS] Can detect valid maxGuets (expression string)', () => {
    expect(dataValidator.isValidMaxGuests('12+3')).toEqual(false);
});