require('dotenv').config();
const express = require('express');
// const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');

const sequelize = require('./db');
// const { DataTypes } = require('sequelize/types');
// const { DataTypes } = require('sequelize');

const Post = require('./models/Post');
const Comment = require('./models/Comment');
const User = require('./models/User');

async function startDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection to database: success.');
    await sequelize.sync();
    // await sequelize.sync({ force: true }); // supprime tout
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startDB(); // async

User.hasMany(Post, {
  foreignKey: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    allowNull: false
  }
});
Post.belongsTo(User);
Post.hasMany(Comment, {
  foreignKey: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    allowNull: false
  }
});
Comment.belongsTo(Post);

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
// app.use(fileUpload());

const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
const usersRoutes = require('./routes/users');

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, '/images')));

app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;