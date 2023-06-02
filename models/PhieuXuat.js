'use strict';
const {
  Model
} = require('sequelize');
const {formatDate} = require('../middlewares/utils/formatDate')
module.exports = (sequelize, DataTypes) => {
  class PhieuXuat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PhieuXuat.belongsTo(models.NhanVien, {foreignKey: 'MaNhanVien'})
      PhieuXuat.hasMany(models.ChiTietPhieuXuat, {foreignKey: 'MaPhieuXuat'})
      PhieuXuat.belongsTo(models.DonDatHangXuat, {foreignKey: 'MaDonDHX'})
      PhieuXuat.hasOne(models.HoaDonXuat, {foreignKey: 'MaPhieuXuat'})
    }
  }
  PhieuXuat.init({
    MaPhieuXuat: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    NgayXuat: {
      type: DataTypes.DATE,
      get: function() {
        return formatDate(this.getDataValue('NgayXuat'))
      }
    },
    DaNhanHang: DataTypes.BOOLEAN,
    LoaiPX: DataTypes.STRING,
    LyDoXuat: DataTypes.STRING,
    MaNhanVien: DataTypes.INTEGER,
    MaDonDHX: DataTypes.INTEGER,
    
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'PhieuXuat',
  });
  
  return PhieuXuat;
};