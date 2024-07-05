'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Drivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: false
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      photoURL:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      contactNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },

      driverLicense:{
        type:Sequelize.STRING,
        allowNull:false,
      },

      licenseNumber:{
        type: Sequelize.STRING,
        allowNull: false
      },

      licenseExpireDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      
      drivingExperience: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isSuspended:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      averageRating: {
        type: Sequelize.FLOAT,
        defaultValue: 0
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
    await queryInterface.dropTable('Drivers');
  }
};
