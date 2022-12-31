const {sequelize, DataTypes} = require('sequelize')

module.exports = (sequelize,DataTypes) => {
    const Color = sequelize.define('Color',{
        name: DataTypes.STRING
    },{
        timestamps: false
    }) 
    Color.associate = models => {
        Color.hasMany(models.Product)
    }
    return Color;
}