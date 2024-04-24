'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DriverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Drivers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      soloRideOption: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vehicleType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      maxSeat: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      vehiclePictureURL:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Services');
  }
};
