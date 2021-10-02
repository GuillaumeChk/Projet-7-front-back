const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Comment = sequelize.define('Comment', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER(255),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  postId: {
    type: DataTypes.INTEGER(255),
    allowNull: false
  },
  user: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING(8),
    allowNull: false
  },
  hour: {
    type: DataTypes.STRING(6),
    allowNull: false
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
// console.log(Comment === sequelize.models.Comment); // true

module.exports = Comment;