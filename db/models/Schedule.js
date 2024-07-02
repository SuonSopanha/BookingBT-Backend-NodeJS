"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const Schedule = sequelize.define(
  "Schedule",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dayOfWeek: {
      type: Sequelize.ENUM(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ),
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    modelName: "Schedule",
    tableName: "Schedules",
    timestamps: true,
  }
);

Schedule.associate = (models) => {
  Schedule.belongsTo(models.Service, {
    foreignKey: "serviceId",
    onDelete: "CASCADE",
  });
};

module.exports = Schedule;
