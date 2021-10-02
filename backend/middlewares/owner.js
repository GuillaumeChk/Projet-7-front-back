const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports = (req, res, next) => {
  // try {
        // Récupérer le token
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userName = decodedToken.userName;
      const isAdmin = decodedToken.isAdmin;
    //   console.log('token: ' + decodedToken);
      (req.originalUrl.split('/')[2] === 'posts' ? Post : Comment) // Est-ce un Post ou un Comment ?
      .findOne({
            where: { id: req.params.id }
        }).then(
            (postOrComment) => {
                // Comparer l'id du proprio à l'id en entrée (ou le name)
                console.log("post id : " + req.params.id)
                console.log(postOrComment.user + ' =? ' + userName)
                if (postOrComment.user !== userName && !isAdmin) {
                    throw 'user ID non proprietaire'; // non valide
                } else {
                    next(); // valide
                }
            }
        ).catch(
            (error) => {
            res.status(403).json({
                error: error
            });
            }
        );
    // } catch {
    //   res.status(401).json({
    //     error: new Error('Invalid request!')
    //   });
    // }
  };