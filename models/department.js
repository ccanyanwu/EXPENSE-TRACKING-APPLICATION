
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
  
//create association between department and employee
  // a department can have more than 1 employee
  Department.associate = (models) => {
    models.Department.hasMany(models.Employee);
  };

  return Department;
};