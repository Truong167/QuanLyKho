'use strict';
const {
  Model
} = require('sequelize');
const {formatDate} = require('../middlewares/utils/formatDate')
module.exports = (sequelize, DataTypes) => {
  class DonDatHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DonDatHang.belongsTo(models.NhanVien, {foreignKey: 'MaNhanVien'})
      DonDatHang.belongsTo(models.NhaCungCap, {foreignKey: 'MaNhaCC'})
      DonDatHang.hasMany(models.ChiTietDonDatHang, {foreignKey: 'MaDonDH'})
      DonDatHang.hasOne(models.PhieuNhap, {foreignKey: 'MaDonDH'})
    }
  }
  DonDatHang.init({
    MaDonDH: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    NgayDatHang: {
      type: DataTypes.DATE,
      get: function() {
        return formatDate(this.getDataValue('NgayDatHang'))
      }
    },
    MaNhanVien: DataTypes.INTEGER,
    MaNhaCC: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'DonDatHang',
  });
  return DonDatHang;
};