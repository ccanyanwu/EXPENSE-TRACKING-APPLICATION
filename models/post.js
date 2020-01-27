'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING
  });

  return Post;
};

// Make sure you complete other models fields