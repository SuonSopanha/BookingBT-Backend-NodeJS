'use strict';
const { khmerAddresses } = require('../fakeData/address');
const {khmerProvince } = require('../fakeData/province');
const { Driver } = require('../models'); // Assuming you have Driver model defined

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all Driver IDs from the Drivers table
    const drivers = await Driver.findAll();
    const driverIds = drivers.map(driver => driver.id);

    const servicesData = driverIds.map(driverId => {
      const randomAddress = khmerAddresses[Math.floor(Math.random() * khmerAddresses.length)];

      return {
        DriverId: driverId,
        soloRideOption: Math.random() < 0.5, // Randomly choose solo ride option
        destination: khmerProvince,
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
