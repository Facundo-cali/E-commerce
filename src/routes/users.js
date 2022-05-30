var express = require('express');
var router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');
let {check, validationResult, body} = require ('express-validator');
let fs = require('fs');

router.get('/register', userController.showRegister);

router.post('/store',[
    check ('username').isLength({min: 1})
    .withMessage('Completar nombre'),
    
    check ('email').isEmail()
    .withMessage('Completar email valido'),

    check ('adress').isLength({min: 1})
    .withMessage('Completar direccion valida'),

    check ('password').isLength({min: 1})
    .withMessage('Completar contraseña valida'),

    check ('email').custom(function(value){ //custom para saber si hay un mail igual
        let usersJSON = fs.readFileSync(path.join(__dirname, '../data/usuarios.json'),{encoding: 'utf-8'});//leo base de datos (sin parsear)
        if(usersJSON == ""){
            users = [];//si esta vacia
        }else{
            users = JSON.parse(usersJSON);//si tiene algo
        }

        for (let i = 0; i <  users.length; i++) {//recorro users
            if(users[i].email == value){
                return false;
            }
        }
        return true;
    }).withMessage('Email ya existente')
] ,userController.store);

router.get('/login', userController.showLogin);

module.exports = router;