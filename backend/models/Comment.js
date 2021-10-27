'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, User }) {
      // define association here
      this.belongsTo(Post, { foreignKey: 'PostId', onDelete: 'CASCADE', hooks: true  })
      this.belongsTo(User, { foreignKey: 'UserId', onDelete: 'CASCADE', hooks: true  })
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
    }
  );
  return Comment;
};