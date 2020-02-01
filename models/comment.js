'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    comment_title: DataTypes.STRING,
    comment_body: DataTypes.TEXT,
  });
  
  Comment.associate = function (models) {
  models.Comment.belongsTo(models.Post, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Comment;
};

// Make sure you complete other models fields