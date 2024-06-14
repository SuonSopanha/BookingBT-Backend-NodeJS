"use strict";
const { khmerNames } = require("../fakeData/userName");
const { khmerAddresses } = require("../fakeData/address");
const User = require("../models/user"); // Assuming the User model is correctly defined in your models directory

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Fetch user data from the User table
      const users = await User.findAll();

      // Define the number of drivers you want to generate
      const numberOfDrivers = 10;

      const driversData = [];

      for (let i = 0; i < numberOfDrivers; i++) {
        // Select a random user from the fetched user data
        const randomUser = users[Math.floor(Math.random() * users.length)];

        const randomName = randomUser.fullName;
        const randomAddress = randomUser.address;
        const dateOfBirth = randomUser.dateOfBirth;

        const uniqueIdentifier = Math.floor(1000 + Math.random() * 9000);

        const driverData = {
          userId: randomUser.id, // Link the driver to the corresponding user
          firstName: randomName.split(" ")[0],
          lastName: randomName.split(" ")[1],
          gender: ["male", "female", "other"][Math.floor(Math.random() * 3)],
          dateOfBirth: dateOfBirth,
          photoURL: randomUser.photoURL,
          contactNumber: randomUser.phoneNumber,
          email: `${randomName.replace(/\s+/g, "").toLowerCase()}${uniqueIdentifier}@example.com`, // Generate a unique email address
          address: randomAddress,
          isApproved: Math.random() < 0.5,
          averageRating: Math.floor(Math.random() * 5) + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        driversData.push(driverData);
      }

      await queryInterface.bulkInsert("Drivers", driversData, {});
    } catch (error) {
      console.error("Error seeding drivers:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Drivers", null, {});
  },
};
