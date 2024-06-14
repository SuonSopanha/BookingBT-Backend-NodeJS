const bcrypt = require('bcrypt');
const { khmerNames } = require('../fakeData/userName');
const { khmerAddresses } = require('../fakeData/address');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userData = Array.from({ length: 10 }).map(() => {
      const randomName = khmerNames[Math.floor(Math.random() * khmerNames.length)];
      const randomAddress = khmerAddresses[Math.floor(Math.random() * khmerAddresses.length)];
      const randomYear = Math.floor(Math.random() * (2005 - 1990 + 1)) + 1990;
      const randomMonth = Math.floor(Math.random() * 12) + 1;
      const randomDay = Math.floor(Math.random() * 28) + 1;
      const dateOfBirth = new Date(randomYear, randomMonth - 1, randomDay);

      // Generate a unique identifier (4-digit number)
      const uniqueIdentifier = Math.floor(1000 + Math.random() * 9000);

      const plainPassword = '12345678'; // Plain password
      const hashedPassword = bcrypt.hashSync(plainPassword, 10); // Hash the password

      return {
        fullName: randomName,
        email: `${randomName.replace(/\s+/g, '').toLowerCase()}${uniqueIdentifier}@example.com`,
        photoURL: 'https://via.placeholder.com/150',
        password: hashedPassword, // Use the hashed password
        dateOfBirth,
        gender: ['male', 'female', 'other'][Math.floor(Math.random() * 3)],
        address: randomAddress,
        phoneNumber: '0' + Math.floor(100000000 + Math.random() * 899999999),
        role: 'user',
        isEmailVerified: Math.random() < 0.5,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    await queryInterface.bulkInsert('Users', userData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
