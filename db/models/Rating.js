"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const Rating = sequelize.define(
  "Rating",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rating: {
      type: Sequelize.ENUM(
        0,
        0.5,
        1,
        1.5,
        2,
        2.5,
        3,
        3.5,
        4,
        4.5,
        5
      ),
      allowNull: false,
    },
    feedbackText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    feedbackDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    modelName: "Rating",
    tableName: "Ratings",
    timestamps: true,
  }
);

Rating.associate = (models) => {

  Rating.belongsTo(models.User,{foreignKey: "userId",onDelete: "CASCADE"})
  Rating.belongsTo(models.Driver,{foreignKey: "driverId",onDelete: "CASCADE"})
  Rating.belongsTo(models.Service,{foreignKey: "serviceId",onDelete: "CASCADE"})
  Rating.belongsTo(models.Booking,{foreignKey: "bookingId",onDelete: "CASCADE"})

}


module.exports = Rating;
