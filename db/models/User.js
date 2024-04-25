const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../../config/database');
const bcrypt = require('bcrypt');
const Driver = require('./driver');

// Define User model
const User = sequelize.define(
  'User',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
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
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (value === this.password) {
          // Password matches confirm password
        } else {
          throw new Error('Password and Confirm password do not match');
        }
      },
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authToken: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
);

// Define associations
User.hasMany(Driver, { foreignKey: 'UserId' });
Driver.belongsTo(User, { foreignKey: 'UserId' });

module.exports = User;
