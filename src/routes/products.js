// ************ Require's ************
const express = require('express');
var path = require('path');
const router = express.Router();
const multer = require('multer');
// ************ Controller Require ************
const productsController = require('../controllers/productsController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../../public/images'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

// /*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/store',upload.single('image'),productsController.store); 



/*** DETALLES DE ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

// /*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/update', productsController.update); 



// /*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;