var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const logDBMiddleware = require('../middlewares/logDBMiddleware');



router.get('/register',logDBMiddleware, userController.showRegister);

router.post('/store',userController.store);

router.get('/login', userController.showLogin);

module.exports = router;