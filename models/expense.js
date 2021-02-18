const Sequelize = require('sequelize');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var Expense = sequelize.define('Expense', {
    createdAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('NOW()')
    },
    time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('NOW()')
    },
    details: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    },
    amount: { 
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    },
    /*approver: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    },*/
    EmployeeId: {type: DataTypes.INTEGER},
    TypeId: {type: DataTypes.INTEGER},
    CategoryId: {type: DataTypes.INTEGER},
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
  });

  Expense.associate = (models) => {
    models.Expense.belongsTo(models.Employee, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    models.Expense.belongsTo(models.Type, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    models.Expense.belongsTo(models.Category, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Expense;
};