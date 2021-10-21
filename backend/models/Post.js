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
      this.belongsTo(User, { foreignKey: 'UserId'})
      this.hasMany(Comment, {foreignKey: 'PostId'})
    }
  };
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        // type: DataTypes.UUID,
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
      // include: [User
      //   // {
      //   // model: User
      //   // }
      // ],
    }
  );
  return Post;
};