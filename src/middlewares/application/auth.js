module.exports = (req,res,next) => {
    if (!req.session.usuario) {
        return res.redirect('/users/login');
    }

    return next();
}