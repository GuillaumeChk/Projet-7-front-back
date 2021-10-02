require('dotenv').config();
const express = require('express');
// const fileUpload = require('express-fileupload');
const app = express();

const sequelize = require('./db');

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Connection to database: success.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

test();

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

app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;