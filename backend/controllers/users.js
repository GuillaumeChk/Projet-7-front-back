const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(async hash => {
      const user = await db.User.create({
        name: req.body.name,
        mail: req.body.mail,
        password: hash
      }
    );
    user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => res.status(400).json({ error }));
    })
    // .catch(error => res.status(500).json({ error }));
};

exports.login = async (req, res, next) => {
  await db.User.findOne({ where : { mail: req.body.mail } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            UserId: user.id,
            userName: user.name,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { 
                UserId: user.id, 
                userName: user.name,
                isAdmin: user.isAdmin,
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteAccount = async (req, res, next) => {
  // Trouver l'user
  await db.User.findOne({ where : { id: req.params.id } })
  .then(async user => {
    // Détruire ses posts
    await db.Post.destroy({ where : { userName: user.name } })
    // Détruire ses commentaires
    await db.Comment.destroy({ where : { userName: user.name } })
  })

  // Supprimer l'user
  await db.User.destroy({
    where: {
      id: req.params.id
    }
  })
  
  res.status(200).json({ message: 'Compte supprimé' });
  
};