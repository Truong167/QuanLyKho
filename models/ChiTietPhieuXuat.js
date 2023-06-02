'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiTietPhieuXuat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChiTietPhieuXuat.belongsTo(models.PhieuXuat, {foreignKey: 'MaPhieuXuat'})
      ChiTietPhieuXuat.belongsTo(models.MatHang, {foreignKey: 'MaMatHang'})
    }
  }
  ChiTietPhieuXuat.init({
    MaPhieuXuat: {
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
    modelName: 'ChiTietPhieuXuat',
  });
  
  return ChiTietPhieuXuat;
};