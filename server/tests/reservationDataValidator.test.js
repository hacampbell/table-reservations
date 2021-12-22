const dataValidator = require('../services/reservationDataValidator');
const moment = require('moment');

// ---------------------------------------------------------------------------------------------------
// ||                                     TESTING RESERVATION TIME                                  ||
// ---------------------------------------------------------------------------------------------------
test('[BOOKING TIME] Can detect valid reservation times (17:00 opening time)', () => {
    expect(dataValidator.isValidReservationTime("17:00")).toEqual(true);
});

test('[BOOKING TIME] Can detect valid reservation times (17:30)', () => {
    expect(dataValidator.isValidReservationTime("17:30")).toEqual(true);
});

test('[BOOKING TIME] Can detect valid reservation times (20:30)', () => {
    expect(dataValidator.isValidReservationTime("20:30")).toEqual(true);
});

test('[BOOKING TIME] Can detect valid reservation times (20:30 with whitespace)', () => {
    expect(dataValidator.isValidReservationTime("  20:30  ")).toEqual(true);
});

test('[BOOKING TIME] Can detect invalid reservation times (30 minutes before closing)', () => {
    expect(dataValidator.isValidReservationTime("21:30")).toEqual(true);
});

test('[BOOKING TIME] Can detect invalid reservation times (1 minutes after last call)', () => {
    expect(dataValidator.isValidReservationTime("21:31")).toEqual(false);
});

test('[BOOKING TIME] Can detect invalid reservation times (23:00)', () => {
    expect(dataValidator.isValidReservationTime("23:00")).toEqual(false);
});

test('[BOOKING TIME] Can detect invalid reservation times (empty)', () => {
    expect(dataValidator.isValidReservationTime("")).toEqual(false);
})

test('[BOOKING TIME] Can detect invalid reservation times (all whitespace)', () => {
    expect(dataValidator.isValidReservationTime("           ")).toEqual(false);
})

test('[BOOKING TIME] Can detect invalid reservation times (invalid data)', () => {
    expect(dataValidator.isValidReservationTime("wlrjbfgkjfg")).toEqual(false);
})


// ---------------------------------------------------------------------------------------------------
// ||                                    TESTING RESERVATION NAMES                                  ||
// ---------------------------------------------------------------------------------------------------

test('[GUEST NAME] Can detect valid reservation names', () => {
    expect(dataValidator.isValidReservationName("Henry")).toEqual(true);
});

test('[GUEST NAME] Can detect valid reservation names with whitespace', () => {
    expect(dataValidator.isValidReservationName("  Henry  ")).toEqual(true);
});

test('[GUEST NAME] Can detect valid reservation names edge case (2 chars)', () => {
    expect(dataValidator.isValidReservationName("Hh")).toEqual(true);
});

test('[GUEST NAME] Can detect invalid reservation names (no chars)', () => {
    expect(dataValidator.isValidReservationName("")).toEqual(false);
});

test('[GUEST NAME] Can detect invalid reservation names (1 char)', () => {
    expect(dataValidator.isValidReservationName("H")).toEqual(false);
});

test('[GUEST NAME] Can detect invalid reservation names (all whitespace)', () => {
    expect(dataValidator.isValidReservationName("  ")).toEqual(false);
});

// ---------------------------------------------------------------------------------------------------
// ||                                 TESTING RESERVATION DATES                                     ||
// ---------------------------------------------------------------------------------------------------

// Removed hard coded date tests and replaced with dynamic ones using moment. These have been kept
// simply for backwards compability and demonstration purposes.

// test('[RESERVATION DATE] Can detect valid reservation dates (today)', () => {
//     expect(dataValidator.isValidReservationDate("2021-08-10")).toEqual(true);
// });

// test('[RESERVATION DATE] Can detect invalid reservation dates (first of this month)', () => {
//     expect(dataValidator.isValidReservationDate("2021-08-01")).toEqual(false);
// });

// test('[RESERVATION DATE] Can detect valid reservation dates (in 14 days)', () => {
//     expect(dataValidator.isValidReservationDate("2021-08-24")).toEqual(true);
// });

// test('[RESERVATION DATE] Can detect valid reservation dates (in 5 days)', () => {
//     expect(dataValidator.isValidReservationDate("2021-08-15")).toEqual(true);
// });

// test('[RESERVATION DATE] Can detect invalid reservation dates (yesterday)', () => {
//     expect(dataValidator.isValidReservationDate("2021-08-09")).toEqual(false);
// });

test('[RESERVATION DATE] Can detect valid reservation dates (today)', () => {
    expect(dataValidator.isValidReservationDate(moment().startOf("day").format("YYYY-MM-DD"))).toEqual(true);
});

test('[RESERVATION DATE] Can detect valid reservation dates (in 14 days)', () => {
    expect(dataValidator.isValidReservationDate(moment().startOf("day").add(14, "day").format("YYYY-MM-DD"))).toEqual(true);
});

test('[RESERVATION DATE] Can detect valid reservation dates (in 5 days)', () => {
    expect(dataValidator.isValidReservationDate(moment().startOf("day").add(5, "day").format("YYYY-MM-DD"))).toEqual(true);
});

test('[RESERVATION DATE] Can detect invalid reservation dates (yesterday)', () => {
    expect(dataValidator.isValidReservationDate(moment().startOf("day").subtract(1, "day").format("YYYY-MM-DD"))).toEqual(false);
});

test('[RESERVATION DATE] Can detect invalid reservation dates (back 10 days)', () => {
    expect(dataValidator.isValidReservationDate(moment().startOf("day").subtract(10, "day").format("YYYY-MM-DD"))).toEqual(false);
});

test('[RESERVATION DATE] Can detect invalid reservation dates (invalid data)', () => {
    expect(dataValidator.isValidReservationDate("rwegfqerg")).toEqual(false);
});

test('[RESERVATION DATE] Can detect invalid reservation dates (invalid data)', () => {
    expect(dataValidator.isValidReservationDate("xxxx-xx-xx")).toEqual(false);
});

test('[RESERVATION DATE] Can detect invalid reservation dates (date doesn\'t exist)', () => {
    expect(dataValidator.isValidReservationDate("2021-02-32")).toEqual(false);
});

// ---------------------------------------------------------------------------------------------------
// ||                                  TESTING RESTAURANT NAMES                                     ||
// ---------------------------------------------------------------------------------------------------
test('[RESTAURANT NAME] Can detect valid restaurant names (Dorsia)', () => {
    expect(dataValidator.isValidRestaurant("Dorsia")).toEqual(true);
});

test('[RESTAURANT NAME] Can detect valid restaurant names (Kacandes Diner)', () => {
    expect(dataValidator.isValidRestaurant("Kacandes Diner")).toEqual(true);
});

test('[RESTAURANT NAME] Can detect valid restaurant names (Grand Central Oyster Bar & Restaurant)', () => {
    expect(dataValidator.isValidRestaurant("Grand Central Oyster Bar & Restaurant")).toEqual(true);
});

test('[RESTAURANT NAME] Can detect valid restaurant names (Winston\'s Bar)', () => {
    expect(dataValidator.isValidRestaurant("Winston's Bar")).toEqual(true);
});

test('[RESTAURANT NAME] Can detect valid restaurant names (Dorsia with white space)', () => {
    expect(dataValidator.isValidRestaurant("  Dorsia  ")).toEqual(true);
});

test('[RESTAURANT NAME] Can detect invalid restaurant names (all whitespace)', () => {
    expect(dataValidator.isValidRestaurant("   ")).toEqual(false);
});

test('[RESTAURANT NAME] Can detect invalid restaurant names (empty)', () => {
    expect(dataValidator.isValidRestaurant("")).toEqual(false);
});

test('[RESTAURANT NAME] Can detect invalid restaurant names (does not exist)', () => {
    expect(dataValidator.isValidRestaurant("Some Name Here")).toEqual(false);
});

// ---------------------------------------------------------------------------------------------------
// ||                             TESTING RESERVATION MOBILE NUMBERS                                ||
// ---------------------------------------------------------------------------------------------------
test('[MOBILE NUMBER] Can detect valid number', () => {
    expect(dataValidator.isValidMobileNumber("0422222222")).toEqual(true);
});

test('[MOBILE NUMBER] Can detect invalid number', () => {
    expect(dataValidator.isValidMobileNumber("bad number")).toEqual(false);
});

test('[MOBILE NUMBER] Can detect invalid mixed data', () => {
    expect(dataValidator.isValidMobileNumber("04abqjh243ds")).toEqual(false);
});

// ---------------------------------------------------------------------------------------------------
// ||                                TESTING RESERVATION GUEST NUMBERS                              ||
// ---------------------------------------------------------------------------------------------------
test('[GUEST COUNT] Can detect valid guest numbers (1)', () => {
    expect(dataValidator.isValidGuests(1)).toEqual(true);
});

test('[GUEST COUNT] Can detect valid guest numbers (4)', () => {
    expect(dataValidator.isValidGuests(4)).toEqual(true);
});

test('[GUEST COUNT] Can detect valid guest numbers (10 max capacity)', () => {
    expect(dataValidator.isValidGuests(4)).toEqual(true);
});

test('[GUEST COUNT] Can detect invalid guest numbers (0)', () => {
    expect(dataValidator.isValidGuests(0)).toEqual(false);
});

test('[GUEST COUNT] Can detect invalid guest numbers (11 above max capacity)', () => {
    expect(dataValidator.isValidGuests(11)).toEqual(false);
});

test('[GUEST COUNT] Can detect invalid guest numbers (invalid data)', () => {
    expect(dataValidator.isValidGuests("sfdgfgfdg")).toEqual(false);
});

// ---------------------------------------------------------------------------------------------------
// ||                                 TESTING RESERVATION STATUS                                    ||
// ---------------------------------------------------------------------------------------------------
test('[RESERVATION STATUS] Can detect valid reservation status (Processing)', () => {
    expect(dataValidator.isValidStatus("Processing")).toEqual(true);
});

test('[RESERVATION STATUS] Can detect valid reservation status (Cancelled)', () => {
    expect(dataValidator.isValidStatus("Cancelled")).toEqual(true);
});

test('[RESERVATION STATUS] Can detect valid reservation status (Cancelled with whitespace)', () => {
    expect(dataValidator.isValidStatus("  Cancelled  ")).toEqual(true);
});

test('[RESERVATION STATUS] Can detect invalid reservation status (Confirmed)', () => {
    expect(dataValidator.isValidStatus("Confirmed")).toEqual(false);
});

test('[RESERVATION STATUS] Can detect invalid reservation status (invalid data)', () => {
    expect(dataValidator.isValidStatus("fsefdfwesf")).toEqual(false);
});

test('[RESERVATION STATUS] Can detect invalid reservation status (empty)', () => {
    expect(dataValidator.isValidStatus("")).toEqual(false);
});

test('[RESERVATION STATUS] Can detect invalid reservation status (All Whitespace)', () => {
    expect(dataValidator.isValidStatus("             ")).toEqual(false);
});