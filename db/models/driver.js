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
      type: Sequelize.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  {
    modelName: "Driver",
    tableName: "Drivers", // Ensure correct table name
    timestamps: true,
    underscored: true, // Use underscored naming convention for columns
  }
);

module.exports = Driver;

// module.exports = (sequelize, DataTypes) => {
//   class Driver extends Model {
//     static associate(models) {

//       // Add associations here if needed
//       // belong to user
//       Driver.belongsTo(models.User, { foreignKey: 'UserId', onDelete: 'CASCADE' });
//       // has many service
//       Driver.hasMany(models.Service, { foreignKey: 'DriverId', onDelete: 'CASCADE' });

//       // has many rating
//       Driver.hasMany(models.Rating, { foreignKey: 'DriverId', onDelete: 'CASCADE' });

//       // has many report
//       Driver.hasMany(models.Report, { foreignKey: 'DriverId', onDelete: 'CASCADE' });

//       // has many booking
//       Driver.hasMany(models.Booking, { foreignKey: 'DriverId', onDelete: 'CASCADE' });

//       // has many notification
//       Driver.hasMany(models.Notification, { foreignKey: 'DriverId', onDelete: 'CASCADE' });
//     }
//   }

//   Driver.init({
//     UserId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },

//     gender: {
//       type: Sequelize.ENUM('male', 'female', 'other'),
//       allowNull: false
//     },
//     dateOfBirth: {
//       type: DataTypes.DATE,
//       allowNull: false
//     },
//     contactNumber: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     photoURL:{
//       type: Sequelize.STRING,
//       allowNull: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   }, {
//     sequelize,
//     modelName: 'Driver',
//     tableName: 'Drivers', // Ensure correct table name
//     timestamps: true,
//     underscored: true, // Use underscored naming convention for columns
//   });

//   return Driver;
// };
