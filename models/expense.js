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
    details: {type: DataTypes.STRING},
    amount: {type: DataTypes.BIGINT},
    DepartmentId: {type: DataTypes.INTEGER},
    EmployeeId: {type: DataTypes.INTEGER},
    TypeId: {type: DataTypes.INTEGER},
    status: {type: DataTypes.STRING},
  });

  Expense.associate = (models) => {
    models.Expense.belongsTo(models.Department, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

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

    models.Expense.belongsToMany(models.Category,{ 
      as: 'categories', 
      through: 'ExpenseCategory',
      foreignKey: 'expense_id'
    });
  };
  
  return Expense;
};