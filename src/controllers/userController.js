const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
let { check, validationResult, body } = require('express-validator');
const {User} = require('../database/models');

module.exports = {
    showRegister:async (req, res) => {
		try {
			await res.render('register')
		} catch (error) {
			console.log(error);
		}
	},
	store:async (req, res) => {
		try {
			let info = {
				name:req.body.username,
				surname:req.body.surname,
				email:req.body.email,
				pwHash:bcrypt.hashSync(req.body.password, 10),
			}
			const newUser = User.create(info);
			res.redirect('/products');
		} catch (error) {
			console.log(error);
		}
	},
    showLogin: (req, res) => {
		res.render('login');
	},
	processLogin:async (req,res)=> {
		try {
			// entramos aca una vez que el usuario exista y la contraseña sea correcta
			let errors = (validationResult(req));
			if (errors.isEmpty()) { //me fijo si no hay errores
				const users = await User.findAll({include:{all:true}})	// primero llamo a los usuarios
				
				

				let usuarioEncontrado = users.find(usuario => usuario.email == req.body.email)//busco usuario ingresado en la base de datos

				if (usuarioEncontrado == undefined) { //si no lo encuentra tira error
					return res.render('login', {errors: [
						{msg: 'Credenciales invalidas'}
					]})}else{
						let validacionPw = bcrypt.compareSync(req.body.password, usuarioEncontrado.pwHash); //verifico si la contraseña es correcta
						if (validacionPw == false){
							return res.render('login', {errors: [
								{msg: 'Credenciales invalidas'}
							]}) 
						}	
						//si las credenciales son validas, guardo en session el mail del usuario y se inicia sesion.
						req.session.usuario = usuarioEncontrado; //guardo en session el email de usuario
		
						//SESSION Y COOKIE SON 2 COSAS DISTINTAS, PUEDO INICIAR SESION SIN GUARDAR COOKIE.
						//si se tildo "recordarme" se guarda la cookie y puedo cerrar el navegador manteniendo la sesion iniciada, si no tildo "recordarme" no se guarda la cookie
						if (req.body.recordarme != undefined) {
							//quiero crear la cookie
							res.cookie("recordarme",usuarioEncontrado.email,{maxAge: 1000 * 60 })
						}
						res.redirect('/products');
					};
			}else{ //si hay errores (del validator, osea los que no sean de credenciales) tira esos errores
				return res.render('login', {errors: errors.errors})
			}
		} catch (error) {
			console.log(error);
		}
	},
	logout:async (req,res)=> {
		
		try {
			await req.session.destroy();
			await res.clearCookie("recordarme");
			res.redirect('/products');
		} catch (error) {
			console.log(error);
		}
	}

}