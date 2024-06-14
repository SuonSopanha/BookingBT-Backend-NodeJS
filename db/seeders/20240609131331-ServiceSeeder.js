'use strict';
const { khmerAddresses } = require('../fakeData/address');
const { khmerProvince } = require('../fakeData/province');
const  Driver  = require('../models/driver'); // Assuming the Driver model is correctly defined in your models directory


const vehicleTypes = ['SUV Tour', 'Sedan', 'Van','Bus','Mini Van' ];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Fetch driver data from the Driver table
      const drivers = await Driver.findAll();

      // Generate services data based on driver data
      const servicesData = drivers.map(driver => {

        return {
          driverId: driver.id, // Use driver's ID from the fetched data
          category: Math.random() < 0.5 ? 'taxi' : 'bus', // Randomly choose category
          soloRideOption: Math.random() < 0.5, // Randomly choose solo ride option
          destination: khmerProvince[Math.floor(Math.random() * khmerProvince.length)], // Random destination province
          location: "Phnom Penh",
          vehicleType: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
          maxSeat: Math.floor(Math.random() * 10) + 1, // Random number of max seats (1 to 10)
          vehiclePictureURL: ['url1', 'url2'], // Sample vehicle picture URLs
          createdAt: new Date(),
          updatedAt: new Date()
        };
      });

      await queryInterface.bulkInsert('Services', servicesData, {});
    } catch (error) {
      console.error('Error seeding services:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Services', null, {});
  }
};
