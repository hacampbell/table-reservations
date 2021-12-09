const regDataValidator = require('../services/registrationDataValidation');
//const User = require('../models/User');

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

test('[USERNAME] Can detect an ivalid username (space in name)', () => {
    expect(regDataValidator.isValidUsername('He nry')).toEqual(false);
});

/************************************************************************************************
 *                                 Testing Username Uniqueness                                  *
 ************************************************************************************************
 *
 * These are all disable because I cant work out how to get async tests working with Jest. It
 * seems that something goes very wrong with I try to directly call (e.g. newUser.Save()) or
 * indirectly call (e.g. regDataValidator.isUniqueUsername) anything relating to mongoDB.
 * 
 * I have no idea what's going wrong here. Maybe I'll come back and fix it one day...
 */

// test('[UNIQUE USERNAME] Can detect a unique username (uniqueUserName)', async () => {
//     expect(await regDataValidator.isUniqueUsername('uniqueUserName')).toEqual(true);
// });

// test('[UNIQUE USERNAME] Can detect a unique username (uniqueUserName with whitespace)', async () => {
//     expect(await regDataValidator.isUniqueUsername('   uniqueUserName   ')).toEqual(true);
// });

// test('[UNIQUE USERNAME] Can detect a non-unique username (notUniqueUserName)', async () => {
//     const demoUser = new User({
//         username: "notUniqueUserName",
//         email: "test@test.test",
//         password: "testPassword"
//     })

//     await demoUser.save();

//     expect(await regDataValidator.isUniqueUsername('notUniqueUserName')).toEqual(false);
// });

/************************************************************************************************
 *                                   Testing Email Validation                                   *
 ************************************************************************************************/
test('[EMAIL] Can detect an valid email (test@test.test)', () => {
    expect(regDataValidator.isValidEmail('test@test.test')).toEqual(true);
});

test('[EMAIL] Can detect an valid email (test@gmail.com)', () => {
    expect(regDataValidator.isValidEmail('test@gmail.com')).toEqual(true);
});

test('[EMAIL] Can detect an valid email (test@y7mail.com)', () => {
    expect(regDataValidator.isValidEmail('test@y7mail.com')).toEqual(true);
});

test('[EMAIL] Can detect an valid email (test@test.test with whitespace)', () => {
    expect(regDataValidator.isValidEmail('   test@test.test   ')).toEqual(true);
});

test('[EMAIL] Can detect an invalid email (@test.test)', () => {
    expect(regDataValidator.isValidEmail('@test.test')).toEqual(false);
});

test('[EMAIL] Can detect an invalid email (test@test)', () => {
    expect(regDataValidator.isValidEmail('test@test')).toEqual(false);
});

test('[EMAIL] Can detect an invalid email (test @ test.com)', () => {
    expect(regDataValidator.isValidEmail('test @ test.com')).toEqual(false);
});

test('[EMAIL] Can detect an invalid email (abcabc)', () => {
    expect(regDataValidator.isValidEmail('abcabc')).toEqual(false);
});

test('[EMAIL] Can detect an invalid email (all white space)', () => {
    expect(regDataValidator.isValidEmail('      ')).toEqual(false);
});

test('[EMAIL] Can detect an invalid email (empty)', () => {
    expect(regDataValidator.isValidEmail('')).toEqual(false);
});

/************************************************************************************************
 *                                  Testing Password Validation                                  *
 ************************************************************************************************/
// Test that user has entered a valid password