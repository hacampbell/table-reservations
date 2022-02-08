const bcrypt = require('bcrypt');
const User = require('../models/User'); 
const Restaurant = require('../models/Restaurant');

/**
 * Calls functions for setting up some demo data in the web app
 */
exports.CreateDemoData = async () => {
    // Make sure we don't setup the demo data if there's already some existing users
    const users =  await User.find();
    if (users.length > 0) return;


    console.log('Setting up demo data...')

    await SetupDemoRestaurants();
    await SetupDemoUsers();
}

/**
 * Creates a number of demo restaurants in the database
 */
SetupDemoRestaurants = async () => {
    const dorsia = new Restaurant({
        owner: 'Demo Restaurateur',
        name: 'Dorsia',
        openingHours: '17:00-21:00',
        openingDays: 'Monday-Friday',
        contactNumber: '0404004040',
        address: '182 Williams Avenue, Demo City',
        description: 'A highly exclusive and much loved location in New York often frequented by the young professionals of Wall Street.',
        image: 'src/assets/img/dorsia.jpeg',
        maxGuests: 32
    });

    await dorsia.save();

    const gcOyster = new Restaurant({
        owner: 'Demo Restaurateur',
        name: 'Grand Central Oyster Bar & Restaurant',
        openingHours: '17:30-22:00',
        openingDays: 'Monday-Friday',
        contactNumber: '1234567890',
        address: '89 E, 42nd Street, New York',
        description: 'A grandeous location in New York. Perfect for client lunches and solo retreats alike. Always popular with the men of Maddison Avenue.',
        image: 'src/assets/img/gcoyster.jpeg',
        maxGuests: 48
    });

    await gcOyster.save();

    const winstons = new Restaurant({
        owner: 'Demo Restaurateur',
        name: 'Winston\'s Bar',
        openingHours: '17:30-22:00',
        openingDays: 'Monday-Sunday',
        contactNumber: '0987654321',
        address: '123 Fake Street, Fake City',
        description: 'Good food, good vibes, even better company.',
        image: 'src/assets/img/fancy.jpeg',
        maxGuests: 16
    });

    await winstons.save();

    const kincades = new Restaurant({
        owner: 'Demo Restaurateur',
        name: 'Top of the Sixes Restaurant',
        openingHours: '17:30-23:00',
        openingDays: 'Monday-Sunday',
        contactNumber: '0987654321',
        address: '5th Avenue, New York',
        description: 'A casual place to enjoy a meal between high speed trading sessions. Also a great place to give a pepe talk to the new trader hires.',
        image: 'src/assets/img/kincades.jpeg',
        maxGuests: 36
    });

    await kincades.save();
}

/**
 * Creates a number of demo users in the database
 */
SetupDemoUsers = async () => {
    // Setup admin account
    const adminPass = await bcrypt.hash('password', 10);

    const admin = new User({
        username: 'admin',
        email: 'admin@dbt.com',
        password: adminPass
    });

    await admin.save();

    // Setup demo restaurateur account
    const restPass = await bcrypt.hash('password', 10);

    const restaurateur = new User({
        username: 'Demo Restaurateur',
        email: 'restaurateur@dbt.com',
        password: restPass
    });

    await restaurateur.save();

    // Setup demo user account
    const userPass = await bcrypt.hash('password', 10);

    const user = new User({
        username: 'demo',
        email: 'demo@dbt.com',
        password: userPass
    });

    await user.save();

}