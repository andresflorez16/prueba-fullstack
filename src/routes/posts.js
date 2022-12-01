const router = require('express').Router();
const { newPost, posts, like } = require('../controllers/posts.controller')

router.post('/posts/new', newPost)
router.get('/posts', posts)
router.put('/posts/:id', like)

module.exports = router
