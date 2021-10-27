'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'UserId', onDelete: 'CASCADE', hooks: true  })
      this.hasMany(Comment, { foreignKey: 'PostId', onDelete: 'CASCADE', hooks: true })
    }
  };
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      imageUrl: {
        type: DataTypes.STRING(100),
        allowNull: true
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
      modelName: 'Post',
    }
  );
  return Post;
};