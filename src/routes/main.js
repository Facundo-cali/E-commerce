var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController')

/* GET users listing. */

router.get('/', mainController.index)
router.get('/pruebaSession',function (req,res) {

    if(req.session.numeroVistas == undefined){
        req.session.numeroVistas = 0;
    }
    req.session.numeroVistas++;
    res.send('session tiene el numero ' + req.session.numeroVistas);
});

module.exports = router;
