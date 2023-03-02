require('dotenv').config();

//Config DB
const host = process.env.MYSQLHOST;
const username = process.env.MYSQLUSER || 'root';
const database = process.env.MYSQLDATABASE;
const password = process.env.MYSQLPASSWORD;
const dialect = process.env.DB_DIALECT;

//Config seeds
const seederStorage = 'sequelize';
const seederStorageTableName = 'seeds';

//Config migrations
const migrationStorage = 'sequelize';
const migrationStorageTableName = 'migrations';


module.exports ={
    host,
    username,
    database,
    password,
    dialect,
    seederStorage,
    seederStorageTableName,
    migrationStorage,
    migrationStorageTableName
}