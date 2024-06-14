'use strict';
const {
  Model,
  DataTypes,
  Sequelize
} = require('sequelize');

const sequelize = require("../../config/database");

const Booking = sequelize.define('Booking', {

    id : {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pickupLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dropoffLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pickupTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    dropoffTime: {
      type: DataTypes.TIME,
      allowNull: true
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

    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    seatType: {
      type: Sequelize.ENUM(
        'front',
        'middle',
        'back',
        'window',
        'aisle'
      ),
      allowNull: true
    },
    userContactNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    seatType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    seatAmount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalFare: {
      type: DataTypes.STRING,
      allowNull: false
    }

},{
  modelName : 'Booking',
  tableName : 'Bookings',
  timestamps : true,
});

Booking.associate = (models) => {
  Booking.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  Booking.belongsTo(models.Service, { foreignKey: 'serviceId', onDelete: 'CASCADE' });
  Booking.belongsTo(models.Driver, { foreignKey: 'driverId', onDelete: 'CASCADE' });
  Booking.hasMany(models.Notifiaction, { foreignKey: 'bookingId', onDelete: 'CASCADE' });
}

module.exports = Booking;

