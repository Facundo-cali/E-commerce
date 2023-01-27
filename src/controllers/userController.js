const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
let { check, validationResult, body } = require('express-validator');
const {User} = require('../database/models');


// const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
// const leerJson = () => {
// 	jsonUsers = fs.readFileSync(usuariosFilePath, {encoding: 'utf-8'}); //necesito que lea la base de datos y me devuelva un string, por eso retorno un JSON.parse.
// 	return JSON.parse(jsonUsers);
// }
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
				pw_hash:bcrypt.hashSync(req.body.password, 10),
			}
			const newUser = User.create(info);
			res.redirect('/products');
		} catch (error) {
			console.log(error);
		}
		// let errors = (validationResult(req));
		// 	if (errors.isEmpty()){     //1 - si no hay errores creo nuevo usuario 
		// 			let usuario = {
		// 			name:req.body.username,
		// 			email:req.body.email,
		// 			adress:req.body.adress,
		// 			password:bcrypt.hashSync(req.body.password, 10)
		// 		}
		//2 - leo lo que hay en json con funcion previamente creada (arriba de todo), esta funcion retorna un string
		// 		let usuarios = leerJson(); 
				
		// 		usuarios.push(usuario);  // 4 - pusheo el nuevo usuario al string (osea a la base de datos)
			
		// 		let usuariosJSON = JSON.stringify(usuarios, null, " ");   // 5 -convierto todo el array de usuarios devuelta a json 

		// 		fs.writeFileSync(usuariosFilePath,usuariosJSON);// 6 - escribo devuelta la base de datos y ya queda escrita con el nuevo usuario para siempre.
				
		// 		res.redirect("/users/login")
		// 		}else {
		// 			return res.render('register',{errors: errors.errors})
		// 		}
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
				// let validacionPw = bcrypt.compareSync(req.body.password, usuarioEncontrado.password); //verifico si la contraseña es correcta
				let validacionPw = bcrypt.compareSync(req.body.password, usuarioEncontrado.pw_hash); //verifico si la contraseña es correcta
				if (validacionPw == false){
					usuarioEncontrado = undefined; // si no es correcta establezco undefined asi tira error
				}
	
				if (usuarioEncontrado == undefined) { 
					return res.render('login', {errors: [
						{msg: 'Credenciales invalidas'}
					]});	
				}else{
	
					//si las credenciales son validas, guardo en session el mail del usuario y se inicia sesion.
					req.session.usuario = usuarioEncontrado.email; //guardo en session el email de usuario
	
					//SESSION Y COOKIE SON 2 COSAS DISTINTAS, PUEDO INICIAR SESION SIN GUARDAR COOKIE.
					//si se tildo "recordarme" se guarda la cookie y puedo cerrar el navegador manteniendo la sesion iniciada, si no tildo "recordarme" no se guarda la cookie
					if (req.body.recordarme != undefined) {
						//quiero crear la cookie
						res.cookie("recordarme",usuarioEncontrado.email,{maxAge: 1000 * 60 })
					}
					res.redirect('/products');
				}
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