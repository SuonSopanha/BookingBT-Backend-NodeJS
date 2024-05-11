'use strict';
const { khmerAddresses } = require('../fakeData/address');
const { khmerProvince } = require('../fakeData/province');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Generate random driver IDs
    const numberOfDrivers = 10; // Define the number of drivers you want to generate services for
    const driverIds = Array.from({ length: numberOfDrivers }, (_, index) => index + 1);

    const servicesData = driverIds.map(driverId => {
      const randomAddress = khmerAddresses[Math.floor(Math.random() * khmerAddresses.length)];

      return {
        DriverId: driverId,
        category: Math.random() < 0.5 ? 'taxi' : 'bus', // Randomly choose category
        soloRideOption: Math.random() < 0.5, // Randomly choose solo ride option
        destination: khmerProvince[Math.floor(Math.random() * khmerProvince.length)], // Random destination province
        location: "Phnom Penh",
        vehicleType: 'Sample Vehicle Type',
        maxSeat: Math.floor(Math.random() * 10) + 1, // Random number of max seats (1 to 10)
        vehiclePictureURL: ['url1', 'url2'], // Sample vehicle picture URLs
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    await queryInterface.bulkInsert('Services', servicesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Services', null, {});
  }
};
