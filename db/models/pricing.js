'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pricing extends Model {
    static associate(models) {
      // Define associations here if needed
      Pricing.belongsTo(models.Service, { foreignKey: 'ServiceID', onDelete: 'CASCADE' });
    }
  };
  Pricing.init({
    ServiceID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    baseFare: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    additionalCharge: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    soloCharge: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Pricing',
    tableName: 'Pricings',
    timestamps: true,
    underscored: true
  });
  return Pricing;
};
