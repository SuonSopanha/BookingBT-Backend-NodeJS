"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Service = sequelize.define(
  "Service",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    DriverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: Sequelize.ENUM('taxi','bus'),
      allowNull: false
    },
    soloRideOption: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicleType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxSeat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vehiclePictureURL: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    modelName: "Service",
    tableName: "Services", // Ensure correct table name
    timestamps: true, // Use underscored naming convention for columns
  }
);

Service.associate = (models) => {
  Service.belongsTo(models.Driver, {
    foreignKey: "DriverId",
    onDelete: "CASCADE",
  });
  Service.hasMany(models.Booking, {
    foreignKey: "ServiceID",
    onDelete: "CASCADE",
  });
  Service.hasMany(models.Pricing, {
    foreignKey: "ServiceID",
    onDelete: "CASCADE",
  });
  Service.hasMany(models.Schedule, {
    foreignKey: "ServiceID",
    onDelete: "CASCADE",
  });
};

module.exports = Service;



//-------------------------------------------

// module.exports = (sequelize, DataTypes) => {
//   class Service extends Model {
//     static associate(models) {
//       // Define associations here if needed
//       Service.belongsTo(models.Driver, {
//         foreignKey: "DriverId",
//         onDelete: "CASCADE",
//       });

//       // has many booking
//       Service.hasMany(models.Booking, {
//         foreignKey: "ServiceId",
//         onDelete: "CASCADE",
//       });

//       // has many pricing
//       Service.hasMany(models.Pricing, {
//         foreignKey: "ServiceId",
//         onDelete: "CASCADE",
//       });

//       // has many schedule
//       Service.hasMany(models.Schedule, {
//         foreignKey: "ServiceId",
//         onDelete: "CASCADE",
//       });
//     }
//   }
//   Service.init(
//     {
//       DriverId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       soloRideOption: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//       },
//       destination: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       location: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       vehicleType: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       maxSeat: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       vehiclePictureURL: {
//         type: DataTypes.ARRAYS(DataTypes.STRING),
//         allowNull: true,
//       },
//     },
//     {
//       sequelize,
//       modelName: "Service",
//       tableName: "Services",
//       timestamps: true,
//       underscored: true,
//     }
//   );
//   return Service;
// };
