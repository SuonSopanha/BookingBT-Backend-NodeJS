'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
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
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Services',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Drivers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      pickupLocation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dropoffLocation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pickupTime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      dropoffTime: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      bookingDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      bookingStatus: {
        type: Sequelize.ENUM(
          'pending',
          'confirmed',
          'completed',
          'canceled'
        ),
        allowNull: false
      },
      
      userContactNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      seatType: {
        type: Sequelize.ENUM(
          'front',
          'middle',
          'back',
          'window',
          'aisle',
          "anywhere"
        ),
        allowNull: true
      },
      seatAmount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      totalFare: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('Bookings');
  }
};
