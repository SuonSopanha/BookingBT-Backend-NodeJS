'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      // Define associations here if needed
      Report.belongsTo(models.User, { foreignKey: 'UserId', onDelete: 'CASCADE' });
      Report.belongsTo(models.Driver, { foreignKey: 'DriverId', onDelete: 'CASCADE' });
      Report.belongsTo(models.Service, { foreignKey: 'ServiceId', onDelete: 'CASCADE' });
    }
  };
  Report.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DriverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reportType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reportContent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reportDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Report',
    tableName: 'Reports',
    timestamps: true,
    underscored: true
  });
  return Report;
};
