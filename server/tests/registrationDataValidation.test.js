const regDataValidator = require('../services/registrationDataValidation');

/************************************************************************************************
 *                                 Testing Username Validation                                  *
 ************************************************************************************************/
test('[USERNAME] Can detect a valid username (Henry)', () => {
    expect(regDataValidator.isValidUsername('Henry')).toEqual(true);
});

test('[USERNAME] Can detect a valid username (Patrick_Bateman1)', () => {
    expect(regDataValidator.isValidUsername('Patrick_Bateman1')).toEqual(true);
});

test('[USERNAME] Can detect a valid username (min char limit - 3)', () => {
    expect(regDataValidator.isValidUsername('aaa')).toEqual(true);
});

test('[USERNAME] Can detect a valid username (max char limit - 25)', () => {
    expect(regDataValidator.isValidUsername('aaaaaaaaaaaaaaaaaaaaaaaaa')).toEqual(true);
});

test('[USERNAME] Can detect a valid username (Henry with whitespace)', () => {
    expect(regDataValidator.isValidUsername('   Henry   ')).toEqual(true);
});

test('[USERNAME] Can detect an ivalid username (below min char limit - 2)', () => {
    expect(regDataValidator.isValidUsername('aa')).toEqual(false);
});

test('[USERNAME] Can detect an ivalid username (over max char limit - 26)', () => {
    expect(regDataValidator.isValidUsername('aaaaaaaaaaaaaaaaaaaaaaaaaa')).toEqual(false);
});

test('[USERNAME] Can detect an ivalid username (empty)', () => {
    expect(regDataValidator.isValidUsername('')).toEqual(false);
});

test('[USERNAME] Can detect an ivalid username (all white space)', () => {
    expect(regDataValidator.isValidUsername('    ')).toEqual(false);
});

/************************************************************************************************
 *                                 Testing Username Uniqueness                                  *
 ************************************************************************************************/
// Test that username has not been used before

/************************************************************************************************
 *                                   Testing Email Validation                                   *
 ************************************************************************************************/
// Test that user entered a valid email

/************************************************************************************************
 *                                  Testing Password Validation                                  *
 ************************************************************************************************/
// Test that user has entered a valid password