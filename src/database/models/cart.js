const {sequelize, DataTypes} = require('sequelize')

module.exports = (sequelize,DataTypes) => {
    const Cart = sequelize.define('Cart',{
        order_number: DataTypes.INTEGER.UNSIGNED,
        user_id:DataTypes.INTEGER.UNSIGNED,
        total:DataTypes.INTEGER.UNSIGNED
    }) 
    Cart.associate = (models => {
        Cart.belongsTo(models.Item, {
            foreignKey: 'order_number'
        })
    })
    return Cart;
}