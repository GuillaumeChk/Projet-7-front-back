'use strict';
const {
  Model
} = require('sequelize');

// const Post = require('./Post')

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.belongsTo(Post, { foreignKey: 'PostId' })
    }
  };
  Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userName: {
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
      sequelize,
      modelName: 'Comment',
      // include: [Post],
    }
  );
  return Comment;
};