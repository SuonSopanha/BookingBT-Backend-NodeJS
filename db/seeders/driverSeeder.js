'use strict';
const { khmerNames } = require('../fakeData/userName');
const { khmerAddresses } = require('../fakeData/address');
const { Driver, User } = require('../models'); // Assuming you have Driver and User models defined

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all User IDs from the Users table
    const users = await User.findAll();
    const userIds = users.map(user => user.id);

    const driversData = userIds.map(userId => {
      const randomName = khmerNames[Math.floor(Math.random() * khmerNames.length)];
      const randomAddress = khmerAddresses[Math.floor(Math.random() * khmerAddresses.length)];
      const randomYear = Math.floor(Math.random() * (2000 - 1980 + 1)) + 1990;
      const randomMonth = Math.floor(Math.random() * 12) + 1;
      const randomDay = Math.floor(Math.random() * 28) + 1;
      const dateOfBirth = new Date(randomYear, randomMonth - 1, randomDay);

      return {
        UserId: userId,
        firstName: randomName.split(' ')[0],
        lastName: randomName.split(' ')[1],
        gender: ['male', 'female', 'other'][Math.floor(Math.random() * 3)],
        dateOfBirth,
        photoURL: 'https://via.placeholder.com/150',
        contactNumber: '0' + Math.floor(100000000 + Math.random() * 899999999),
        email: `${randomName.replace(/\s+/g, '').toLowerCase()}@example.com`, // Ensure uniqueness
        address: randomAddress,
        isApproved: Math.random() < 0.5,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    await queryInterface.bulkInsert('Drivers', driversData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Drivers', null, {});
  }
};
