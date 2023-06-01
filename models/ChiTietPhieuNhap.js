'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiTietPhieuNhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  ChiTietPhieuNhap.init({
    MaPhieuNhap: {
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
    modelName: 'ChiTietPhieuNhap',
  });
  
  return ChiTietPhieuNhap;
};