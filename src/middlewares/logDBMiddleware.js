const fs = require('fs');


module.exports = function logDBMiddleware(req, res, next) {
    fs.writeFileSync('logDB.txt','Se creo ' + req.url);
    next();
} ;