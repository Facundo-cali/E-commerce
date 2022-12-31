module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "roper_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    define:{
      underscored:true, //esto sirve para que decirle a sequelize que nuestras columnas tienen guiones bajos.
      paranoid: true //aca especificamos que nuestros modelos tienen el soft delete
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
