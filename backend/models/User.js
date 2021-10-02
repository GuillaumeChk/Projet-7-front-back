const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: false,
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = User;