const db = require('../models');
const fs = require('fs');

exports.createPost = async (req, res, next) => {

  // Try
  const post = await db.Post.create(
    {
      // id auto-incrémenté (ne pas l'ajouter)
      UserId: req.body.UserId,
      userName: req.body.userName,
      text: req.body.text,
      imageUrl: (req.file)?`${req.protocol}://${req.get('host')}/images/${req.file.filename}`:'',
      date: req.body.date,
      hour: req.body.hour,
    },
    {
      include: [db.User]
    }
  )
  res.status(201).json({
      message: 'Post saved successfully!',
      post: post,
  });
  // Catch
    // .catch((error) => { res.status(400).json({ error: error });});
};

exports.deletePost = async (req, res, next) => {
  // Supprimer l'image
  const post = await db.Post.findOne({
    where: {
      id: req.params.id
    }
  });
  if (post.imageUrl !== undefined) {
    const filename = post.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {});
  }

  await db.Post.destroy({
    where: {
      id: req.params.id
    }
  });
  // Supprime également tous les commentaires de ce post

  res.status(200).json({ message: 'Publication supprimée' });

};

exports.getAllPosts = async (req, res, next) => {
    const posts = await db.Post.findAll(
      {
        order: [
          ['date', 'DESC'], // les plus récents en premiers
          ['hour', 'DESC']
        ],
        include: [db.User]
      },
    );
  res.status(200).json(posts);
};