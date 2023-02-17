'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.hasMany(models.Item);
      Cart.belongsTo(models.User);
    }
  }
  Cart.init({
    orderNumber: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
    paranoid: true
  });
  return Cart;
};