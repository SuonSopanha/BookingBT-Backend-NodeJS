'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    static associate(models) {
      // Add associations here if needed
      // has many service
      Driver.hasMany(models.Service, { foreignKey: 'DriverId', onDelete: 'CASCADE' });

      // has many rating
      Driver.hasMany(models.Rating, { foreignKey: 'DriverId', onDelete: 'CASCADE' });

      // has many report
      Driver.hasMany(models.Report, { foreignKey: 'DriverId', onDelete: 'CASCADE' });

      // has many booking
      Driver.hasMany(models.Booking, { foreignKey: 'DriverId', onDelete: 'CASCADE' });

      // has many notification
      Driver.hasMany(models.Notification, { foreignKey: 'DriverId', onDelete: 'CASCADE' });
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
      type: Sequelize.ENUM('male', 'female', 'other'),
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
    photoURL:{
      type: Sequelize.STRING,
      allowNull: true,
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
