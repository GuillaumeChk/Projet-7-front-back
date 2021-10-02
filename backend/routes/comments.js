const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const owner = require('../middlewares/owner');

const commentsCtrl = require('../controllers/comments');

router.post('/', auth, commentsCtrl.createComment);
router.get('/', auth, commentsCtrl.getAllComments);
router.delete('/:id', auth, owner, commentsCtrl.deleteComment);

module.exports = router;