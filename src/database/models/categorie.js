const {sequelize, DataTypes} = require('sequelize')

module.exports = (sequelize,DataTypes) => {
    const Categorie = sequelize.define('Categorie',{
        gender: DataTypes.STRING
    },{
        timestamps: false
    }) 
    Categorie.associate = models => {
        Categorie.hasMany(models.Product)
    }
    return Categorie;
}