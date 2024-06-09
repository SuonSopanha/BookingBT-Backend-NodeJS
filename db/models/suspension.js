const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');
const Driver = require('./driver');

// Define Suspension model
const Suspension = sequelize.define(
  'Suspension',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users', // Assumes Users table exists
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    driverId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Drivers', // Assumes Drivers table exists
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    suspensionLevel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  },
  {
    modelName: 'Suspension',
    tableName: 'Suspensions',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
);

// Define associations
Suspension.associate = (models) => {
  Suspension.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  Suspension.belongsTo(models.Driver, { foreignKey: 'driverId', as: 'driver' });
};

module.exports = Suspension;
