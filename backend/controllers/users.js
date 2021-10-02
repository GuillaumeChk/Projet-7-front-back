const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res, next) => {
  delete req.body.id;
  bcrypt.hash(req.body.password, 10)
    .then(async hash => {
      const user = await User.create({
        name: req.body.name,
        mail: req.body.mail,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = async (req, res, next) => {
  await User.findOne({ where : { mail: req.body.mail } })
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
            userId: user.id,
            // userMail: req.body.mail,
            userName: user.name,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { 
                userId: user.id, 
                userName: user.name,
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
  console.log("avant destroy")
  await User.destroy({
    where: {
      id: req.params.id
    }
  })
  // user.save()
  //   .then(() => res.status(201).json({ message: 'Utilisateur supprimé !' }))
  //   .catch(error => res.status(400).json({ error }));
  console.log("apres destroy")

  // destroy ses posts et comments
};