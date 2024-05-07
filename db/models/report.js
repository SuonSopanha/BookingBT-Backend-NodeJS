"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const Report = sequelize.define(
  "Report",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DriverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reportType: {
      type: Sequelize.ENUM(
        "price",
        "hygiene",
        "convenience",
        "driver_behavior",
        "vehicle_condition",
        "safety",
        "service_quality",
        "other"
      ),
      allowNull: false,
    },
    reportContent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reportDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    modelName: "Report",
    tableName: "Reports",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Report;

//-----------------------------------------------------

// module.exports = (sequelize, DataTypes) => {
//   class Report extends Model {
//     static associate(models) {
//       // Define associations here if needed
//       Report.belongsTo(models.User, { foreignKey: 'UserId', onDelete: 'CASCADE' });
//       Report.belongsTo(models.Driver, { foreignKey: 'DriverId', onDelete: 'CASCADE' });
//       Report.belongsTo(models.Service, { foreignKey: 'ServiceId', onDelete: 'CASCADE' });
//     }
//   };
//   Report.init({
//     UserId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     DriverId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     ServiceId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     reportType: {
//       type: Sequelize.ENUM(
//         'price',
//         'hygiene',
//         'convenience',
//         'driver_behavior',
//         'vehicle_condition',
//         'safety',
//         'service_quality',
//         'other'
//       ),
//       allowNull: false
//     },
//     reportContent: {
//       type: DataTypes.STRING,
//       allowNull: true
//     },
//     reportDate: {
//       type: DataTypes.DATE,
//       allowNull: false
//     }
//   }, {
//     sequelize,
//     modelName: 'Report',
//     tableName: 'Reports',
//     timestamps: true,
//     underscored: true
//   });
//   return Report;
// };
