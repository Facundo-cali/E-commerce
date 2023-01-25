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
				pw_hash:req.body.password,
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
		// 		//2 - leo lo que hay en json con funcion previamente creada (arriba de todo), esta funcion retorna un string
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
		// entramos aca una vez que el usuario exista y la contraseña sea correcta
		// let errors = (validationResult(req));

		if (errors.isEmpty()){ //me fijo si no hay errores
				let usuarios = leerJson();  // primero llamo a los usuarios con la funcion creada previamente arriba.
				
				let usuarioEncontrado = usuarios.find(usuario => usuario.email == req.body.email)//busco usuario ingresado en la base de datos
				
				let validacionPw = bcrypt.compareSync(req.body.password, usuarioEncontrado.password); //verifico si la contraseña es correcta
				if (validacionPw == false){
					usuarioEncontrado = undefined; // si no es correcta establezco undefined asi tira error
				}
				if(usuarioEncontrado == undefined){
					return res.render('login', {errors: [
						{msg: 'Credenciales invalidas'}
					]});
				}

				//si las credenciales son validas y todo esta bien, guardo en session el mail del usuario y se inicia sesion.
				req.session.usuario = usuarioEncontrado.email; //guardo en session el email de usuario
				
				//SESSION Y COOKIE SON 2 COSAS DISTINTAS, PUEDO INICIAR SESION SIN GUARDAR COOKIE.
				//si se tildo el recordarme hacer esto de abajo, si no la tildo, no crea lo cookie por lo cual no se guarda la cookie pero igualmente setie en el partial headers que me muestre el usuario, con la diferencia que no se crea la cookie, despues uso la cookie para hacer que aunque cierre el navegador la sesion siga iniciada.
				if (req.body.recordarme != undefined) {
					//quiero crear la cookie
					res.cookie("recordarme",usuarioEncontrado.email,{maxAge: 1000 * 60 })
				}
				res.redirect('/products');
		}else{//si hay errores (del validator, osea los que no sean de credenciales) tira esos errores
			return res.render('login', {errors: errors.errors})
		}
	}
}