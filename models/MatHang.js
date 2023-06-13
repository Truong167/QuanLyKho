'use strict';
const {
  Model
} = require('sequelize');
const {formatDate} = require('../middlewares/utils/formatDate');

module.exports = (sequelize, DataTypes) => {
  class MatHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MatHang.belongsTo(models.LoaiHang, {foreignKey: "MaLoaiHang"})
      MatHang.belongsTo(models.NhaCungCap, {foreignKey: "MaNhaCC"})
      MatHang.hasMany(models.ChiTietDonDatHang, {foreignKey: 'MaMatHang'})
      MatHang.hasMany(models.ChiTietDonDatHangXuat, {foreignKey: 'MaMatHang'})
      MatHang.hasMany(models.ChiTietPhieuNhap, {foreignKey: 'MaMatHang'})
      MatHang.hasMany(models.ChiTietPhieuXuat, {foreignKey: 'MaMatHang'})
      MatHang.hasMany(models.ViTriMatHang, {foreignKey: 'MaMatHang'})

    }
  }
  MatHang.init({
    MaMatHang: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    TenMatHang: DataTypes.STRING,
    SoLuongTon: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    MaLoaiHang: DataTypes.INTEGER,
    MaNhaCC: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'MatHang',
  });
  
  return MatHang;
};