'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      // Define associations here if needed
      Rating.belongsTo(models.User, { foreignKey: 'UserId', onDelete: 'CASCADE' });
      Rating.belongsTo(models.Driver, { foreignKey: 'DriverId', onDelete: 'CASCADE' });
      Rating.belongsTo(models.Service, { foreignKey: 'ServiceId', onDelete: 'CASCADE' });
      Rating.belongsTo(models.Booking, { foreignKey: 'BookingId', onDelete: 'CASCADE' });
    }
  };
  Rating.init({
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
    BookingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: Sequelize.ENUM(
        '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'
      ),
      allowNull: false
    },
    feedbackText: {
      type: DataTypes.STRING,
      allowNull: true
    },
    feedbackDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Rating',
    tableName: 'Ratings',
    timestamps: true,
    underscored: true
  });
  return Rating;
};
