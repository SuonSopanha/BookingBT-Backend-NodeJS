'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Drivers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Services',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      reportType: {
        type: Sequelize.ENUM(
          'price', 
          'hygiene', 
          'convenience', 
          'driver_behavior',
          'vehicle_condition',
          'safety',
          'service_quality',
          'other'
        ),
        allowNull: false
      },
      reportContent: {
        type: Sequelize.STRING,
        allowNull: true
      },
      reportDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      isClear: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reports');
  }
};
