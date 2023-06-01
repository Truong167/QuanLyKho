'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonDatHangXuat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DonDatHangXuat.belongsTo(models.NhanVien, {foreignKey: 'MaNhanVien'})
      DonDatHangXuat.belongsTo(models.KhachHang, {foreignKey: 'MaKhachHang'})
    }
  }
  DonDatHangXuat.init({
    MaDonDHX: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    NgayDatHang: {
      type: DataTypes.DATE,
      get: function() {
        return formatDate(this.getDataValue('NgayDatHang'))
      }
    },
    MaNhanVien: DataTypes.INTEGER,
    MaKhachHang: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'DonDatHangXuat',
  });
  return DonDatHangXuat;
};