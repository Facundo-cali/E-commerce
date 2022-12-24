const express = require('express');
var path = require('path');
const router = express.Router();
const multer = require('multer');
// ************ Controller Require ************
const validator = require('../middlewares/rutas/validator');
const productsController = require('../controllers/productsController');
//subir imagen
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../../public/images'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 
router.get('/create', productsController.create); 
router.get('/detail/:id', productsController.detail); 
router.post('/store',upload.single('image'),validator.product,productsController.store); //este tiene el validator de product

router.get('/edit/:id', productsController.edit); 
router.put('/update', productsController.update); 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;