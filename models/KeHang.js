'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KeHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      KeHang.belongsTo(models.Khu, {foreignKey: 'MaKhu'})
      KeHang.hasMany(models.OHang, {foreignKey: 'MaKe'})
    }
  }
  KeHang.init({
    MaKe: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    TenKe: {
      type: DataTypes.STRING,
    },
    MaKhu: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'KeHang',
  });
  return KeHang;
};