'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Categorie);
      Product.belongsTo(models.Color);
      Product.belongsTo(models.Size);
      Product.belongsTo(models.Condition);
      Product.hasMany(models.Item);
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    amount: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
    paranoid: true
  });
  return Product;
};