'use strict';
const {
  Model
} = require('sequelize');
const {formatDate} = require('../middlewares/utils/formatDate');
module.exports = (sequelize, DataTypes) => {
  class NhanVienKinhDoanh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  NhanVienKinhDoanh.init({
    MaNvKinhDoanh: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    MaNhanVien: {
        type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'NhanVienKinhDoanh'
  });
  return NhanVienKinhDoanh;
};