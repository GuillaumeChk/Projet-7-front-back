// const Comment = require('../models/Comment');
// const Post = require('../models/Post');

const db = require('../models');


exports.createComment = async (req, res, next) => {
  delete req.body.id;
  try {
    const comment = await db.Comment.create({
        // id auto-incrémenté
        ...req.body,
      },
      // {
      //   include: [Post]
      // }
    )

    console.log("comment : " + JSON.stringify(comment))

    res.status(201).json({
      message: 'Comment saved successfully!',
      comment: comment,
    });
  } catch (error) {
    console.log("error : " + error);
  }
};

exports.deleteComment = async (req, res, next) => {
  await db.Comment.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json({ message: 'Commentaire supprimé' });
};

exports.getAllComments = async (req, res, next) => {
  const comments = await db.Comment.findAll(
    {
      order: [
        ['date', 'ASC'],
        ['hour', 'ASC']
      ]
    },
    // {
    //   include: [db.Post]
    // }
  );
  
   res.status(200).json(comments);
};