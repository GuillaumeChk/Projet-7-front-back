const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const usersCtrl = require('../controllers/users');

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.delete('/:id', auth, usersCtrl.deleteAccount);

module.exports = router;