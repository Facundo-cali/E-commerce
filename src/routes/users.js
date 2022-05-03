var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')


router.get('/register', userController.showRegister);
router.get('/login', userController.showLogin);

module.exports = router;