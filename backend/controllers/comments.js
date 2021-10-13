const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.createComment = async (req, res, next) => {
  // delete req.body.id;

  try {
    const comment = await Comment.create({
        // id auto-incrémenté
        ...req.body,
        // PostId: req.body.PostId
      },
      // {
      //   include: [Post]
      // }
    )
    res.status(201).json({
      message: 'Comment saved successfully!',
      comment: comment,
    });
  } catch (error) {
    console.log("error : " + error);
  }
};

exports.deleteComment = async (req, res, next) => {
  await Comment.destroy({
    where: {
      id: req.params.id
    }
  });
};

exports.getAllComments = async (req, res, next) => {
  const comments = await Comment.findAll(
    {
      order: [
        ['date', 'ASC'],
        ['hour', 'ASC']
      ]
    },
    // {
    //   include: [Post]
    // }
  );
  
   res.status(200).json(comments);
};