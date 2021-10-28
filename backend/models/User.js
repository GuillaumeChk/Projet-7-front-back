'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Comment }) {
      // define association here
      this.hasMany(Post, { foreignKey: 'UserId', onDelete: 'CASCADE', hooks: true })
      this.hasMany(Comment, { foreignKey: 'UserId', onDelete: 'CASCADE', hooks: true })
    }
  };
  User.init(
    {
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
        unique: true,
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
      sequelize,
      modelName: 'User',
      timestamp: false,
    }
  );
  return User;
};