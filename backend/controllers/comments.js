const Comment = require('../models/Comment');

exports.createComment = async (req, res, next) => {
  delete req.body.id;
  const comment = await Comment.create({
    ...req.body
  });
  comment.save()
    .then(() => { res.status(201).json({
      message: 'Comment saved successfully!'
    });})
    .catch((error) => { res.status(400).json({ error: error });});
};

exports.deleteComment = async (req, res, next) => {
  await Comment.destroy({
    where: {
      id: req.params.id
    }
  });
};

exports.getAllComments = async (req, res, next) => {
  const comments = await Comment.findAll({
    order: [
      ['date', 'ASC'],
      ['hour', 'ASC']
    ]
  });
  
   res.status(200).json(comments);
};