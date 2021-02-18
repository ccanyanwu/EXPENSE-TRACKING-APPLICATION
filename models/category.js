
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    }
  });

  //create association between category and expense
  // a category can have more than 1 expense
  Category.associate = (models) => {
    models.Category.hasMany(models.Expense);
  };

  return Category;
};