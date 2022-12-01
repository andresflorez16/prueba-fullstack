const router = require('express').Router();
const { signup, login, logout, users } = require('../controllers/users.controller')

router.post('/users/signup', signup)
router.post('/users/login', login)
router.post('/users/logout', logout)
router.get('/users', users)

module.exports = router
