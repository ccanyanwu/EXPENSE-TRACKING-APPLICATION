
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Type = sequelize.define('Type', {
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    }
  });

  //create association between type and expense
  // a type can have more than 1 expense
  Type.associate = (models) => {
    models.Type.hasMany(models.Expense);
  };

  return Type;
};