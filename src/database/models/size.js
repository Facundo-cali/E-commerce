'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate(models) {
      Size.hasMany(models.Product);
    }
  }
  Size.init({
    number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Size'
  });
  return Size;
};