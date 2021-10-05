const sequelize = require('../db');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
// const FileReader = require('filereader'), fileReader = new FileReader();

exports.createPost = async (req, res, next) => {
  console.log("files: " + req.files)
  console.log("file: " + req.file)
  // console.log("parsed files: " + JSON.parse(req.files))
  console.log("req :" + req)
  // console.log("image :" + req.files.originalname)
  // console.log("post " + JSON.stringify(req.body.post))
  // console.log("image " + req.files.image)
  // console.log('body : ' + req.body)
  console.log("text : " + req.body.id)
  console.log("text : " + req.body.user)
  console.log("text : " + req.body.text)
  console.log("text : " + req.body.date)
  console.log("text : " + req.body.hour)


  // fileReader.readAsBinaryString(req.files.images);

  // delete req.body.post.id; // auto-incrémenté par la db
  const post = await Post.create({
    // ...req.body.post,
    // id auto-incrémenté
    user: req.body.user,
    text: req.body.text,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    date: req.body.date,
    hour: req.body.hour,
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

  // db CASCADE
};

exports.getAllPosts = async (req, res, next) => {
    const posts = await Post.findAll({
      order: [
        ['date', 'DESC'], // les plus récents en premiers
        ['hour', 'DESC']
      ]
    });
  res.status(200).json(posts);
};