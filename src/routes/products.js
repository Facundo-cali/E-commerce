// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
//router.get('/', productsController.index); 

// /*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
//router.post('/store', productsController.store); 



/*** DETALLES DE ONE PRODUCT ***/ 
router.get('/detail', productsController.detail); 

// /*** EDIT ONE PRODUCT ***/ 
//router.get('/edit/:id', productsController.edit); 
// router.get('/:id', productsController.update); 
router.get('/edit', productsController.edit)

// /*** DELETE ONE PRODUCT***/ 
// router.get('/:id', productsController.destroy); 


module.exports = router;