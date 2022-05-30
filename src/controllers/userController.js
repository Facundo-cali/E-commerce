const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
let { check, validationResult, body } = require('express-validator');


const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');

module.exports = {
    showRegister: (req, res) => {
		res.render('register')
	},
	store: (req, res) => {
		let errors = (validationResult(req));
			if (errors.isEmpty()){     //si no hay errores hacer todo lo de abajo
					let usuario = {
					name:req.body.username,
					email:req.body.email,
					adress:req.body.adress,
					pw:bcryptjs.hashSync(req.body.password, 10)
				}
				//guardar usuario en usuarios.json--------primero leo lo que hay en json
				let archivoUsuario = fs.readFileSync(usuariosFilePath,{encoding: 'utf-8'});
				let usuarios;
				if(archivoUsuario == ""){
					usuarios = [];
				}else{
					usuarios = JSON.parse(archivoUsuario);
				}
				usuarios.push(usuario);
				usuariosJSON = JSON.stringify(usuarios);
				fs.writeFileSync(usuariosFilePath,usuariosJSON);
				res.redirect("/user/login")
				}else {
					return res.render('register',{errors: errors.errors})
				}
	},
    showLogin: (req, res) => {
		res.render('login');
	}
}