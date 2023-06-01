'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HoaDonNhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HoaDonNhap.belongsTo(models.PhieuNhap, {foreignKey: 'MaPhieuNhap'})
    }
  }
  HoaDonNhap.init({
    MaHoaDon: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ThanhTien: DataTypes.DOUBLE,
    Thue: DataTypes.DOUBLE,
    MaPhieuNhap: DataTypes.INTEGER,
    MaNhaCC: DataTypes.INTEGER,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'HoaDonNhap',
  });
  
  return HoaDonNhap;
};