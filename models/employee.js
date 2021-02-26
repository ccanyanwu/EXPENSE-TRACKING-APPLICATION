'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: { type: DataTypes.STRING},
    mobile:{type: DataTypes.BIGINT},
    role: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notEmpty: true,
      } 
  },
    DepartmentId: {type: DataTypes.INTEGER}
  });

   //create association between employee, department and expense
  Employee.associate = (models) => {
    models.Employee.belongsTo(models.Department, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
   
    models.Employee.hasMany(models.Expense);
  };

  return Employee;
};