"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const Schedule = sequelize.define(
  "Schedule",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ServiceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dayOfWeek: {
      type: Sequelize.ENUM(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ),
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    modelName: "Schedule",
    tableName: "Schedules",
    timestamps: true,
  }
);

Schedule.associate = (models) => {
  Schedule.belongsTo(models.Service, {
    foreignKey: "ServiceID",
    onDelete: "CASCADE",
  });
};

module.exports = Schedule;


//----------------------------------

// module.exports = (sequelize, DataTypes) => {
//   class Schedule extends Model {
//     static associate(models) {
//       // Define associations here if needed
//       Schedule.belongsTo(models.Service, {
//         foreignKey: "ServiceID",
//         onDelete: "CASCADE",
//       });
//     }
//   }
//   Schedule.init(
//     {
//       ServiceID: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       dayOfWeek: {
//         type: Sequelize.ENUM(
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//           "Sunday"
//         ),
//         allowNull: false,
//       },
//       departureTime: {
//         type: DataTypes.TIME,
//         allowNull: false,
//       },
//       arrivalTime: {
//         type: DataTypes.TIME,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: "Schedule",
//       tableName: "Schedules",
//       timestamps: true,
//       underscored: true,
//     }
//   );
//   return Schedule;
// };
