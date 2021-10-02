const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config');
const owner = require('../middlewares/owner');

const postsCtrl = require('../controllers/posts')

router.get('/', auth, postsCtrl.getAllPosts);
router.post('/', auth, multer, postsCtrl.createPost);
router.delete('/:id', auth, owner, postsCtrl.deletePost);

module.exports = router;