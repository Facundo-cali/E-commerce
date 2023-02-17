'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Condition extends Model {
    static associate(models) {
      Condition.hasMany(models.Product);
    }
  }
  Condition.init({
    condition: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Condition'
  });
  return Condition;
};