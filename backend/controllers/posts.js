const sequelize = require('../db');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
// const FileReader = require('filereader'), fileReader = new FileReader();

exports.createPost = async (req, res, next) => {
  console.log("file: " + req.file)
  // console.log("parsed files: " + JSON.parse(req.files))
  console.log("req :" + req)
  console.log("body :" + req.body)
  console.log("post " + req.body.post)
  // console.log("image " + req.files.image)
  // lire l'image
  if (req.file) {
    console.log('ok')
    console.log('body : ' + req.body)
  }
  // fileReader.readAsBinaryString(req.files.images);
  // fileReader.onloadend = function(){
  //     console.log(fileReader.result);
  // }

  delete req.body.post.id; // auto-incrémenté par la db
  const post = await Post.create({
    ...req.body.post,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  post.save()
    .then(() => { res.status(201).json({
      message: 'Post saved successfully!'
    });})
    .catch((error) => { res.status(400).json({ error: error });});
};

exports.deletePost = async (req, res, next) => {
  await Post.destroy({
    where: {
      id: req.params.id
    }
  });

  // Supprime également tous les commentaires de ce post
  await Comment.destroy({
    where: {
      postId: req.params.id
    }
  })
};

exports.getAllPosts = async (req, res, next) => {
    const posts = await Post.findAll();
  res.status(200).json(posts);
};