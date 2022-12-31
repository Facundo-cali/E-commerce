const {sequelize, DataTypes} = require('sequelize')

module.exports = (sequelize,DataTypes) => {
    const Condition = sequelize.define('Condition',{
        condition: DataTypes.STRING
    },{
        timestamps: false
    }) 
    Condition.associate = models => {
        Condition.hasMany(models.Product)
    }
    return Condition;
}