'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Drivers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      bookingId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Bookings',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      notificationType: {
        type: Sequelize.ENUM(
          'ride_request',
          'ride_accepted',
          'ride_canceled',
          'ride_completed',
          'driver_arrival',
          'driver_on_the_way',
          'ride_scheduled',
          'account_created',
          'account_updated',
          'password_changed',
          'account_suspended',
          'account_activated',
          'emergency',
          'safety_tips',
          'system_update',
          'system_alert',
          'request_feedback',
          'new_review',
          'other'
        ),
        allowNull: false
      },
      notificationMessage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      notificationStatus: {
        type: Sequelize.ENUM('pending', 'sent', 'read', 'archived'), // Define your notification statuses here
        allowNull: false
      },
      notificationDate: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Notifications');
  }
};
