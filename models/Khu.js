'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Khu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Khu.hasMany(models.DetailKhu, {foreignKey: 'KhuId'});
      Khu.hasMany(models.KhuSeason, {foreignKey: 'KhuId'});
      // Khu.belongsToMany(models.Recipe, {through: models.RecipeTag})

    }
  }
  Khu.init({
    MaKhu: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    TenKhu: DataTypes.STRING,
    MaKho: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Khu',
  });
  return Khu;
};