const appserver = require('./server');
const http = require('http').createServer(appserver);
const { sequelize } = require('./database/models/index');

const PORT = 3306;

http.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
    sequelize.sync({ force: false }).then(() => {
        console.log('conection to DB success');
    }).catch(error => {
        console.log('conection error: ', error);
    })
});
