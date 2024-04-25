"use strict";
const { Model, DataTypes,Sequelize } = require("sequelize");
const sequelize = require("../../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value) {
      if (value === this.password) {
      } else {
        throw new Error("Password and Confirm password do not match");
      }
    },  
  },
  photoURL:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authToken: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  emailVerificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},
  {
    modelName: "User",
    tableName: "Users",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);


module.exports = User;

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     static associate(models) {
//       // Add associations here if needed

//       // has one driver
//       User.hasOne(models.Driver, { foreignKey: "UserId", onDelete: "CASCADE" });
//       // has many booking
//       User.hasMany(models.Booking, {
//         foreignKey: "UserId",
//         onDelete: "CASCADE",
//       });

//       // has many rating
//       User.hasMany(models.Rating, {
//         foreignKey: "UserId",
//         onDelete: "CASCADE",
//       });

//       // has many report
//       User.hasMany(models.Report, {
//         foreignKey: "UserId",
//         onDelete: "CASCADE",
//       });

//       // has many notification
//       User.hasMany(models.Notification, {
//         foreignKey: "UserId",
//         onDelete: "CASCADE",
//       });
//     }
//   }

//   User.init(
//     {
//       fullName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       confirmPassword: {
//         type: DataTypes.VIRTUAL,
//         set(value) {
//           if (value === this.password) {
//             const hashPassword = bcrypt.hashSync(value, 10);
//             this.setDataValue("password", hashPassword);
//           } else {
//             throw new Error("Password and Confirm password do not match");
//           }
//         },
//       },
//       photoURL: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       dateOfBirth: {
//         type: DataTypes.DATE,
//         allowNull: true,
//       },
//       role: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       gender: {
//         type: DataTypes.ENUM("male", "female", "other"),
//         allowNull: true,
//       },
//     },
//     {
//       sequelize,
//       modelName: "User",
//       tableName: "Users", // Ensure correct table name
//       timestamps: true,
//       underscored: true, // Use underscored naming convention for columns
//     }
//   );

//   console.log(User === sequelize.models.User);
//   return User;
// };


