const { body, check } = require("express-validator");
var path = require("path");



module.exports = {
    product: [
        body ("name")
            .notEmpty()
            .withMessage('Completar nombre de la prenda')
            .isLength({ min: 3, max: 100})
            .withMessage("Minimo 3, maximo 100 caracteres"),
        body ("price")
            .notEmpty()
            .withMessage('Completar precio de la prenda')
            .isNumeric()
            .withMessage("El precio debe ser un numero"),
        body ("amount")
            .notEmpty()
            .withMessage('Completar cantidad de prendas')
            .isNumeric()
            .withMessage("La cantidad de prendas debe ser un numero"),
        body ("categorie_id")
            .notEmpty()
            .withMessage('Completar categoria'),
        body ("condition_id")
            .notEmpty()
            .withMessage('Completar condicion de la prenda'),
        body ("color_id")
            .notEmpty()
            .withMessage('Completar color de la prenda'),
        body ("size_id")
            .notEmpty()
            .withMessage('Completar tamaño de la prenda'),
        // body ("image")
        //     .custom(function(value, { req }){
        //         if (req.file != undefined){
        //             return true; 
        //         }
        //         return false;
        //     })
        //     .withMessage("Imagen obligatoria")
        //     .bail() //bail corta el resto de las validaciones si la anterior da falsa  
            
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