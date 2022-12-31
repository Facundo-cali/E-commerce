const express = require('express');
var path = require('path');
const router = express.Router();
const multer = require('multer');
// ************ Controller Require ************
const validator = require('../middlewares/rutas/validator');
const productsController = require('../controllers/productsController');


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.all); 
router.get('/create', productsController.create); 
router.get('/detail/:id', productsController.detail); 
router.post('/store',productsController.upload,validator.product,productsController.store); //este tiene el validator de product

router.get('/edit/:id', productsController.edit); 
router.put('/:id', productsController.change); 
router.delete('/delete/:id', productsController.destroy); 

module.exports = router;