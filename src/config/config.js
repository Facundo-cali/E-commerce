require('dotenv').config();

module.exports = {
    "development": {
      "username": process.env.MYSQLUSER,
      "password": process.env.MYSQLPASSWORD,
      "database": process.env.MYSQLDATABASE,
      "host": process.env.MYSQLHOST,
      "dialect": "mysql",
      "port": process.env.MYSQLPORT
    },
    "test": {
      "username": process.env.MYSQLUSER,
      "password": process.env.MYSQLPASSWORD,
      "database": process.env.MYSQLDATABASE,
      "host": process.env.MYSQLHOST,
      "dialect": "mysql",
      "port": process.env.MYSQLPORT

    },
    "production": {
      "username": process.env.MYSQLUSER,
      "password": process.env.MYSQLPASSWORD,
      "database": process.env.MYSQLDATABASE,
      "host": process.env.MYSQLHOST,
      "dialect": "mysql",
      "port": process.env.MYSQLPORT
    }
  }
