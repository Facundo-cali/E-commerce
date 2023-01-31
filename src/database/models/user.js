const {sequelize, DataTypes} = require('sequelize')

module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('User',{
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        email: DataTypes.STRING,
        pw_hash: DataTypes.STRING,
    },{
        timestamps: true
    }) 
    User.associate = (models) => {
        User.hasMany(models.Item, {
            foreignKey: 'userId'
        })
    }
    return User;
}