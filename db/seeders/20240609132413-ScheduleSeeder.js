'use strict';
const  Service  = require('../models/service'); // Assuming the Schedule and Service models are correctly defined in your models directory

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Fetch all services
      const services = await Service.findAll();

      // Array of days of the week
      const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

      // Function to generate random time within a given range (start and end time)
      const generateRandomTime = (start, end) => {
        const startTime = new Date(`2024-01-01T${start}`);
        const endTime = new Date(`2024-01-01T${end}`);
        const randomTime = new Date(startTime.getTime() + Math.random() * (endTime.getTime() - startTime.getTime()));
        return randomTime.toTimeString().slice(0, 5);
      };

      // Array to store schedules data
      const schedulesData = [];

      // Iterate over each service to generate schedules
      for (const service of services) {
        // Generate random schedule for each day of the week
        for (const day of daysOfWeek) {
          const scheduleData = {
            serviceId: service.id, // Assign service ID
            dayOfWeek: day,
            departureTime: generateRandomTime("08:00:00", "18:00:00"), // Random departure time between 8 AM and 6 PM
            arrivalTime: generateRandomTime("10:00:00", "20:00:00"), // Random arrival time between 10 AM and 8 PM
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          schedulesData.push(scheduleData);
        }
      }

      // Insert schedules data into the Schedules table
      await queryInterface.bulkInsert('Schedules', schedulesData, {});

      console.log('Schedules seeded successfully');
    } catch (error) {
      console.error('Error seeding schedules:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Schedules', null, {});
  }
};
