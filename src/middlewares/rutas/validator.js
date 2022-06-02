const { body, check } = require("express-validator");
var path = require("path");



module.exports = {
    product: [
        body ("name")
            .notEmpty()
            .withMessage('Completar nombre')
            .isLength({ min: 5, max: 20})
            .withMessage("Minimo 5, maximo 20 caracteres"),
        body ("price")
            .notEmpty()
            .withMessage('Completar precio')
            .isFloat()
            .withMessage('El campo debe ser un numero'),
        body ("discount")
            .notEmpty()
            .withMessage('Completar descuento')
            .isFloat()
            .withMessage('El campo debe ser un numero'),
        body ("image")
            .custom(function(value, { req }){
                if (req.file != undefined){
                    return true; 
                }
                return false;
            })
            .withMessage("Imagen obligatoria")
            .bail() //bail corta el resto de las validaciones si la anterior da falsa
            .custom(function(value,{ req }){

                const ext = path.extname(req.file.originalname);

                if(ext == '.jpg' || '.jpeg' || '.png'){
                    return true;
                }
                return false;
            })    
    ],

    login: [
        body ("email")
            .notEmpty()
            .withMessage('Completar email'),
        body ("password")
            .notEmpty()
            .withMessage('Completar contraseña'),
    ],

}