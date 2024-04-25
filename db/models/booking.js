'use strict';
const {
  Model,
  DataTypes,
  Sequelize
} = require('sequelize');

const sequelize = require("../../config/database");

const Booking = sequelize.define('Booking', {

    id : {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    BookingID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ServiceID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DriverID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pickupLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dropoffLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pickupTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dropoffTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    bookingStatus: {
      type: Sequelize.ENUM(
        'pending',
        'confirmed',
        'completed',
        'canceled'
      ),
      allowNull: false
    },

    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    seatType: {
      type: Sequelize.ENUM(
        'front',
        'middle',
        'back',
        'window',
        'aisle'
      ),
      allowNull: true
    },
    userContactNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seatType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    seatAmount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalFare: {
      type: DataTypes.FLOAT,
      allowNull: false
    }

},{
  modelName : 'Booking',
  tableName : 'Bookings',
  timestamps : true,
  underscored : true
});


module.exports = Booking;

// module.exports = (sequelize, DataTypes) => {
//   class Booking extends Model {
//     static associate(models) {
//       // Define associations here if needed
//       Booking.belongsTo(models.User, { foreignKey: 'UserID', onDelete: 'CASCADE' });
//       Booking.belongsTo(models.Service, { foreignKey: 'ServiceID', onDelete: 'CASCADE' });
//       Booking.belongsTo(models.Driver, { foreignKey: 'DriverID', onDelete: 'CASCADE' });
//     }
//   };
//   Booking.init({
//     BookingID: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     UserID: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     ServiceID: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     DriverID: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     pickupLocation: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     dropoffLocation: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     pickupTime: {
//       type: DataTypes.DATE,
//       allowNull: false
//     },
//     dropoffTime: {
//       type: DataTypes.DATE,
//       allowNull: false
//     },
//     bookingStatus: {
//       type: Sequelize.ENUM(
//         'pending',
//         'confirmed',
//         'completed',
//         'canceled'
//       ),
//       allowNull: false
//     },

//     bookingDate: {
//       type: DataTypes.DATE,
//       allowNull: false
//     },
//     seatType: {
//       type: Sequelize.ENUM(
//         'front',
//         'middle',
//         'back',
//         'window',
//         'aisle'
//       ),
//       allowNull: true
//     },
//     userContactNumber: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     seatType: {
//       type: DataTypes.STRING,
//       allowNull: true
//     },
//     seatAmount: {
//       type: DataTypes.INTEGER,
//       allowNull: true
//     },
//     totalFare: {
//       type: DataTypes.FLOAT,
//       allowNull: false
//     }
//   }, {
//     sequelize,
//     modelName: 'Booking',
//     tableName: 'Bookings',
//     timestamps: true,
//     underscored: true
//   });
//   return Booking;
// };
