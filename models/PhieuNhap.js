'use strict';
const {
  Model
} = require('sequelize');
const {formatDate} = require('../middlewares/utils/formatDate')
module.exports = (sequelize, DataTypes) => {
  class PhieuNhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PhieuNhap.belongsTo(models.NhanVien, {foreignKey: 'MaNhanVien'})
      PhieuNhap.hasMany(models.ChiTietPhieuNhap, {foreignKey: 'MaPhieuNhap'})
    }
  }
  PhieuNhap.init({
    MaPhieuNhap: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    NgayNhap: {
      type: DataTypes.DATE,
      get: function() {
        return formatDate(this.getDataValue('NgayNhap'))
      }
    },
    TrangThai: DataTypes.BOOLEAN,
    MaNhanVien: DataTypes.INTEGER,
    MaDonDH: DataTypes.INTEGER,
    
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'PhieuNhap',
  });
  
  return PhieuNhap;
};