'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ThongTinDangNhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ThongTinDangNhap.init({
    TaiKhoan: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    MatKhau: {
        type: DataTypes.STRING
    },
    MaNhanVien: DataTypes.INTEGER,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'ThongTinDangNhap'
  });
  return ThongTinDangNhap;
};