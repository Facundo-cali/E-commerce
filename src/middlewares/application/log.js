module.exports = function (req, res, next) {
    res.locals.usuario = false;
    
    //me fijo si esta en session el usuario
    if(req.session.usuario){
        res.locals.usuario = req.session.usuario;
    }else if (req.cookies.recordarme) { //si el usuario no esta en session, me fijo si se creo la cookie, osea si el usuario previamente tildo recordarme.
        req.session.usuario = req.cookies.recordarme;//si esta la cookie, guardo en session al usuario y es como si ya se logueo.
        res.locals.usuario = req.session.usuario;//aca envio los datos a la vista, por eso es res.
    }

    next();
}