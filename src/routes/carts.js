var express = require('express');
var router = express.Router();
const cartController = require('../controllers/cartController')

//validator si esta en sesion para comprar
const authMiddleware = require('../middlewares/application/auth');


router.post('/addCart', authMiddleware, cartController.addCart);

router.get('/cart',authMiddleware,cartController.cart)
router.post('/deleteCartElement',authMiddleware,cartController.deleteCart)

module.exports = router;