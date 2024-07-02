"use strict";
const { Model, DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../../config/database");

const Driver = sequelize.define(
  "Driver",
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
      foreignKey: 'UserId',

      references: {
        model: "User",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gender: {
      type: Sequelize.ENUM("male", "female", "other"),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoURL: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    averageRating: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    },
    isApproved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    modelName: "Driver",
    tableName: "Drivers", // Ensure correct table name
    timestamps: true,
  }
);

Driver.associate = function (models) {
  Driver.hasMany(models.Service, { foreignKey: "driverId", onDelete: "CASCADE" });
  Driver.hasMany(models.Booking, { foreignKey: "driverId", onDelete: "CASCADE" });
  Driver.hasMany(models.Notification, { foreignKey: "driverId", onDelete: "CASCADE" });
  Driver.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
};

module.exports = Driver;
