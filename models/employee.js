const Sequelize = require('sequelize');

//access control
const AccessControl = require('accesscontrol');
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    first_name: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    },
    last_name: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    },
    username: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
    }},
    password: {
    type: Sequelize.STRING,
    validate: {
        len: { 
            args: [7, 42],
            msg: "The password length should be between 7 and 18 characters."
        }
    },
},
    mobile:{
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            isNumeric : true
        }
    },
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