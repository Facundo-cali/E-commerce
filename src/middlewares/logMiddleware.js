const fs = require('fs');


module.exports = function logMiddleware(req, res, next) {
    fs.writeFileSync('log.txt','Se ingreso a ' + req.url);
    next();
} ;