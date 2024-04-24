"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      // Define associations here if needed
      Service.belongsTo(models.Driver, {
        foreignKey: "DriverId",
        onDelete: "CASCADE",
      });
    }
  }
  Service.init(
    {
      DriverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      soloRideOption: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maxSeat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vehiclePictureURL: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Service",
      tableName: "Services",
      timestamps: true,
      underscored: true,
    }
  );
  return Service;
};
