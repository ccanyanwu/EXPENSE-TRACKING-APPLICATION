
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: {type: DataTypes.STRING}
  });

  //create association between category and expense
  // a category can have more than 1 expense
  Category.associate = (models) => {
    models.Category.belongsToMany(models.Expense,{ 
      as: 'expenses', 
      through: 'ExpenseCategory',
      foreignKey: 'category_id'
    });
  };

  return Category;
};