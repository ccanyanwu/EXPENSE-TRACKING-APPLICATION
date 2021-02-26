
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Department = sequelize.define('Department', {
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    }
  });
  
//create association between department, expense and employee
  // a department can have more than 1 employee and expense
  Department.associate = (models) => {
    models.Department.hasMany(models.Employee);
    models.Department.hasMany(models.Expense);
  };

  return Department;
};