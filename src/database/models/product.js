const {sequelize, DataTypes} = require('sequelize')

module.exports = (sequelize,DataTypes) => {
    const Product = sequelize.define('Product',{
        name: DataTypes.STRING,
        price: DataTypes.STRING,
        amount: DataTypes.STRING,
        categorie_id: DataTypes.INTEGER.UNSIGNED,
        condition_id: DataTypes.INTEGER.UNSIGNED,
        color_id: DataTypes.INTEGER.UNSIGNED,
        size_id: DataTypes.INTEGER.UNSIGNED,
        image: DataTypes.STRING
    },{
        timestamps: true
    }) 
    Product.associate = (models => {
        Product.belongsTo(models.Categorie);
        Product.belongsTo(models.Condition);
        Product.belongsTo(models.Color);
        Product.belongsTo(models.Size);

    })
    return Product;
}