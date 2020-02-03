'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    post_title: DataTypes.STRING,
    post_body: DataTypes.STRING,
    AuthorId: DataTypes.INTEGER
  });
  
  // create post association
  // a post will have an author
  // a field called AuthorId will be created in our post table inside the db
  Post.associate = function (models) {
    
    models.Post.belongsTo(models.Author, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    
    
    models.Post.belongsToMany(models.Category,{ 
      as: 'categories', 
      through: 'PostCategories',
      foreignKey: 'post_id'
    });
        
    models.Post.hasMany(models.Comment);
  };
  
  
  
  return Post;
};

// Make sure you complete other models fields