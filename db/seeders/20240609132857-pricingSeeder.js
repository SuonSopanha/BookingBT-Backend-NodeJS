"use strict";
const Service = require("../models/service"); // Correct import statement for the Service model
// Import the Pricing model

const currencyType = ["USD", "KHR"];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Fetch all services
      const services = await Service.findAll();
     
      // Array to store pricing data
      const pricingsData = [];

      // Iterate over each service to generate pricing data
      for (const service of services) {
        const pricingData = {
          serviceId: service.id, // Assign service ID
          baseFare: generateRandomFloat(10, 100), // Random base fare between 10 and 100
          additionalCharge: generateRandomFloat(5, 50), // Random additional charge between 5 and 50
          soloCharge: generateRandomFloat(2, 20), // Random solo charge between 2 and 20
          description: "Sample pricing description", // Sample description
          currencyType: currencyType[Math.floor(Math.random() * 2)], // Sample currency
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        pricingsData.push(pricingData);
      }

      // Insert pricing data into the Pricings table
      await queryInterface.bulkInsert("Pricings", pricingsData, {});

      console.log("Pricing seeded successfully");
    } catch (error) {
      console.error("Error seeding pricing:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Pricings", null, {});
  },
};

// Function to generate random float within a given range (start and end)
const generateRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};
