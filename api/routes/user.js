const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

router.post('/signup', UserController.user_signup )

router.post('/validate',UserController.user_validate)


module.exports = router