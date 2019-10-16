/* eslint-disable no-unused-vars */
var bycrypt=require("bcryptjs");
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {
    title:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    authors:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    description: {
      type: DataTypes.TEXT    
    },
    averageRating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.STRING(1234), 
      allowNull: false,
    },
    publishedDate: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING, 
    },
    previewlink: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    category:{
      type:DataTypes.STRING,
      allowNull:false
    },
    usercomment:{
      type:DataTypes.TEXT,
      allowNull:true
    }
    
  });

  
  return Book;
};
