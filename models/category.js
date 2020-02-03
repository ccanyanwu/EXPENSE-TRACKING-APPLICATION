'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING
  });
 
  // create association between category and post
  // an category can have many posts
  Category.associate = function(models) {
    models.Category.belongsToMany(models.Post,{ 
      as: 'posts', 
      through: 'PostCategories',
      foreignKey: 'category_id'
    });
  };
  
  return Category;
};

 


// Make sure you complete other models fields