"use strict";
const { khmerNames } = require("../fakeData/userName");
const { khmerAddresses } = require("../fakeData/address");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const numberOfDrivers = 10; // Define the number of drivers you want to generate

    const driversData = [];

    for (let i = 0; i < numberOfDrivers; i++) {
      const randomName = khmerNames[Math.floor(Math.random() * khmerNames.length)];
      const randomAddress = khmerAddresses[Math.floor(Math.random() * khmerAddresses.length)];
      const randomYear = Math.floor(Math.random() * (2000 - 1980 + 1)) + 1980;
      const randomMonth = Math.floor(Math.random() * 12) + 1;
      const randomDay = Math.floor(Math.random() * 28) + 1;
      const dateOfBirth = new Date(randomYear, randomMonth - 1, randomDay);

      const driverData = {
        UserId: i + 1,
        firstName: randomName.split(" ")[0],
        lastName: randomName.split(" ")[1],
        gender: ["male", "female", "other"][Math.floor(Math.random() * 3)],
        dateOfBirth: dateOfBirth,
        photoURL: "https://via.placeholder.com/150",
        contactNumber: "0" + Math.floor(100000000 + Math.random() * 899999999),
        email: `${randomName.replace(/\s+/g, "").toLowerCase()}@example.com`,
        address: randomAddress,
        isApproved: Math.random() < 0.5,
        averageRating: Math.floor(Math.random() * 5) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      driversData.push(driverData);
    }

    await queryInterface.bulkInsert("Drivers", driversData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Drivers", null, {});
  },
};
