const {sequelize, DataTypes} = require('sequelize') 

module.exports = (sequelize,DataTypes) => {
    const Item = sequelize.define('Item',{
        sale_price: DataTypes.INTEGER.UNSIGNED,
        quantity: DataTypes.INTEGER.UNSIGNED,
        subtotal: DataTypes.INTEGER.UNSIGNED,
        state: DataTypes.INTEGER.UNSIGNED,
        user_id: DataTypes.INTEGER.UNSIGNED,
        product_id: DataTypes.INTEGER.UNSIGNED,
        cart_id: DataTypes.INTEGER.UNSIGNED,
    },{
        timestamps: true
    }) 
    Item.associate = (models) => {
        Item.belongsTo(models.User, {
            foreignKey: 'user_id'
        })
        Item.belongsTo(models.Product, {
            foreignKey: 'product_id'
        })
    }
    return Item;
}