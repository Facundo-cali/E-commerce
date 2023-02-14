const {sequelize, DataTypes} = require('sequelize')

module.exports = (sequelize,DataTypes) => {
    const Cart = sequelize.define('Cart',{
        order_number: DataTypes.INTEGER.UNSIGNED,
        user_id:DataTypes.INTEGER.UNSIGNED,
        total:DataTypes.INTEGER.UNSIGNED
    },{
        timestamps: false
    }) 
    return Cart;
}