'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    static associate(models) {
      Categorie.hasMany(models.Product)
    }
  }
  Categorie.init({
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categorie'
  });
  return Categorie;
};