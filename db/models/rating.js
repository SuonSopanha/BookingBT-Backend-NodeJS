'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      // Define associations here if needed
      Rating.belongsTo(models.User, { foreignKey: 'UserId', onDelete: 'CASCADE' });
      Rating.belongsTo(models.Drive, { foreignKey: 'DriveId', onDelete: 'CASCADE' });
      Rating.belongsTo(models.Service, { foreignKey: 'ServiceId', onDelete: 'CASCADE' });
      Rating.belongsTo(models.Booking, { foreignKey: 'BookingId', onDelete: 'CASCADE' });
    }
  };
  Rating.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DriveId: {
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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    feedbackText: {
      type: DataTypes.STRING,
      allowNull: true
    },
    feedbackDate: {
      type: DataTypes.DATE,
      allowNull: true
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
