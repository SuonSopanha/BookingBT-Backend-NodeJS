'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // Define associations here if needed
      Notification.belongsTo(models.User, { foreignKey: 'UserId', onDelete: 'CASCADE' });
      Notification.belongsTo(models.Driver, { foreignKey: 'DriverId', onDelete: 'CASCADE' });
      Notification.belongsTo(models.Booking, { foreignKey: 'BookingId', onDelete: 'CASCADE' });
    }
  };
  Notification.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DriverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BookingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notificationType: {
      type: Sequelize.ENUM(
        'ride_request',
        'ride_accepted',
        'ride_canceled',
        'ride_completed',
        'payment_confirmation',
        'promotional',
        'driver_arrival',
        'emergency',
        'other'
      ),
      allowNull: false
    },
    notificationMessage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notificationStatus: {
      type: Sequelize.ENUM('pending', 'sent', 'read', 'archived'), // Define your notification statuses here
      allowNull: false
    },
    notificationDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: 'Notifications',
    timestamps: true,
    underscored: true
  });
  return Notification;
};
