'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    
    static associate(models) {
      Item.belongsTo(models.Product);
      Item.belongsTo(models.User);
      Item.belongsTo(models.Cart);
    }
  }
  Item.init({
    salePrice: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
    paranoid: true
  });
  return Item;
};