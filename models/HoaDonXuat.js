'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HoaDonXuat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HoaDonXuat.belongsTo(models.PhieuXuat, {foreignKey: 'MaPhieuXuat'})
    }
  }
  HoaDonXuat.init({
    MaHoaDon: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ThanhTien: DataTypes.DOUBLE,
    Thue: DataTypes.DOUBLE,
    MaPhieuXuat: DataTypes.INTEGER,
    MaKhachHang: DataTypes.INTEGER,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'HoaDonXuat',
  });
  
  return HoaDonXuat;
};