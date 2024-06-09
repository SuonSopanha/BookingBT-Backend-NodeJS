"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const Report = sequelize.define(
  "Report",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reportType: {
      type: Sequelize.ENUM(
        "price",
        "hygiene",
        "convenience",
        "driver_behavior",
        "vehicle_condition",
        "safety",
        "service_quality",
        "other"
      ),
      allowNull: false,
    },
    reportContent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reportDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    modelName: "Report",
    tableName: "Reports",
    timestamps: true,
    underscored: true,
  }
);

Report.associate = (models) => {
  Report.belongsTo(models.User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  Report.belongsTo(models.Driver, {
    foreignKey: "driverId",
    onDelete: "CASCADE",
  });
};



module.exports = Report;
