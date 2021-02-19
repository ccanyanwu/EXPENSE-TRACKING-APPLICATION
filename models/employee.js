const Sequelize = require('sequelize');

//access control
const AccessControl = require('accesscontrol');
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: {
    type: DataTypes.STRING/*,
    validate: {
        len: { 
            args: [7, 42],
            msg: "The password length should be between 7 and 18 characters."
        }
    },
  */},
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

   //create association between author and post
  // an author can has many posts
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