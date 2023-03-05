// Middleware para verificar si el usuario es administrador
module.exports = (req, res, next) => {
    // Verifica si el usuario está autenticado
    if (!req.session || !req.session.usuario) {
      return res.status(401).json({ error: 'Debes iniciar sesión para acceder a esta página' });
    }
  
    // Verifica si el usuario es un administrador
    if (!req.session.usuario.isAdmin) {
      return res.status(403).json({ error: 'No tienes permisos para acceder a esta página' });
    }
  
    // Si el usuario es un administrador, continúa con la solicitud
    next();
  }