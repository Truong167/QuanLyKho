'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiTietDonDatHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  ChiTietDonDatHang.init({
    MaDonDH: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    MaMatHang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    SoLuong: DataTypes.INTEGER,
    DonGia: DataTypes.DOUBLE
    
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'ChiTietDonDatHang',
  });
  
  return ChiTietDonDatHang;
};