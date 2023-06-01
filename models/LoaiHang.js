'use strict';
const {
  Model
} = require('sequelize');
const {formatDate} = require('../middlewares/utils/formatDate');
module.exports = (sequelize, DataTypes) => {
  class LoaiHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LoaiHang.belongsTo(models.User, {foreignKey: 'userId'});
      LoaiHang.hasMany(models.Step, {foreignKey: 'LoaiHangId'});
      LoaiHang.hasMany(models.DetailIngredient, {foreignKey: 'LoaiHangId'});
      LoaiHang.hasMany(models.DetailList, {foreignKey: 'LoaiHangId'});
      LoaiHang.hasMany(models.Favorite, {foreignKey: 'LoaiHangId'});
      // LoaiHang.hasMany(models.Comment, {foreignKey: 'LoaiHangId'});
      // LoaiHang.belongsToMany(models.IngredientTag, {through: models.LoaiHangTag})
    }
  }
  LoaiHang.init({
    MaLoaiHang: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    TenLoaiHang: DataTypes.STRING,
    SoNgayBaoHetHSD: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'LoaiHang',
  });
  return LoaiHang;
};