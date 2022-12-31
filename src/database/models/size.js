const {sequelize, DataTypes} = require('sequelize')

module.exports = (sequelize,DataTypes) => {
    const Size = sequelize.define('Size',{
        number: DataTypes.STRING
    },{
        timestamps: false
    }) 
    Size.associate = models => {
        Size.hasMany(models.Product)
    }
    return Size;
}