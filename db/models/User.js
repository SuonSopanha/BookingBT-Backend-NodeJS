// models/user.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Add associations here if needed
      // has many booking
      User.hasMany(models.Booking, { foreignKey: 'UserId', onDelete: 'CASCADE' });

      // has many rating
      User.hasMany(models.Rating, { foreignKey: 'UserId', onDelete: 'CASCADE' });

      // has many report
      User.hasMany(models.Report, { foreignKey: 'UserId', onDelete: 'CASCADE' });

      // has many notification
      User.hasMany(models.Notification, { foreignKey: 'UserId', onDelete: 'CASCADE' });
    }
  }

  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photoURL: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users", // Ensure correct table name
      timestamps: true,
      underscored: true, // Use underscored naming convention for columns
    }
  );

  return User;
};
