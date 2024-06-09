"use strict";
const { Model, DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../../config/database");

const Pricing = sequelize.define(
  "Pricing",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    baseFare: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    additionalCharge: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    soloCharge: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "Pricing",
    tableName: "Pricings",
    timestamps: true,
  }
);

Pricing.associate = (models) => {
  Pricing.belongsTo(models.Service, { foreignKey: "serviceId", onDelete: "CASCADE" });
};

module.exports = Pricing;
