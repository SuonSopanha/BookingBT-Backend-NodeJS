"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      allowNull: false,
    },
    notificationMessage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notificationStatus: {
      type: Sequelize.ENUM("pending", "sent", "read", "archived"), // Define your notification statuses here
      allowNull: false,
    },
    notificationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    modelName: "Notification",
    tableName: "Notifications",
    timestamps: true,
  }
);

Notification.associate = (models) => {
  Notification.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
  Notification.belongsTo(models.Driver, { foreignKey: "driverId", onDelete: "CASCADE" });
  Notification.belongsTo(models.Booking, { foreignKey: "bookingId", onDelete: "CASCADE" });
};

module.exports = Notification;
