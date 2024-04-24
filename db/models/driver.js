'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    static associate(models) {
      // Add associations here if needed
    }
  }
  
  Driver.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Driver',
    tableName: 'Drivers', // Ensure correct table name
    timestamps: true,
    underscored: true, // Use underscored naming convention for columns
  });

  return Driver;
};
