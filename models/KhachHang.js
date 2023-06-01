'use strict';
const {
  Model
} = require('sequelize');
const {formatDate} = require('../middlewares/utils/formatDate')
module.exports = (sequelize, DataTypes) => {
  class KhachHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     


    }
  }
  KhachHang.init({
    MaKhachHang: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    TenKhachHang: DataTypes.STRING,
    DiaChi: DataTypes.STRING,
    SDT: DataTypes.STRING,

  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'KhachHang',
  });
  return KhachHang;
};