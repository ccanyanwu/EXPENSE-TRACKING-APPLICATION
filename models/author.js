'use strict';
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
    }},
  });

  // create association between author and post
  // an author can have many posts
  Author.associate = function(models) {
    models.Author.hasMany(models.Post);
  };
  
  return Author;
};
 