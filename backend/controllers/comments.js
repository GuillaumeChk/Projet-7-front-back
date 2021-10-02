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
  const comments = await Comment.findAll();
  /*
    const comments = [
        {
          id: 1,
          postId: 1,
          user: 'Cyril Bob',
          text: "ça va ?",
          date: '21.09.21',
          hour: '14:46'
        },
        {
          id: 2,
          postId: 1,
          user: 'Jean Dupont',
          text: "bonjour",
          date: '21.09.21',
          hour: '15:46'
        },
        {
          id: 3,
          postId: 1,
          user: 'Bertrand Jacquard',
          text: "salut c'est moi Bertrand",
          date: '21.09.21',
          hour: '16:46'
        },
        {
          id: 5,
          postId: 3,
          user: 'Cyril Bob',
          text: "ok",
          date: '22.09.21',
          hour: '14:46'
        },
        {
          id: 4,
          postId: 3,
          user: 'Bertrand Jacquard',
          text: "oui",
          date: '22.09.21',
          hour: '18:46'
        },
        
    ];
    */
   res.status(200).json(comments);
};