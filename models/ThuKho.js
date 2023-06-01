'use strict';
const {
  Model
} = require('sequelize');
const {formatDate} = require('../middlewares/utils/formatDate');
module.exports = (sequelize, DataTypes) => {
  class ThuKho extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  ThuKho.init({
    MaThuKho: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    MaNhanVien: {
      type: DataTypes.INTEGER,
    },
    PhuCap: DataTypes.DOUBLE
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'ThuKho',
  });
  return ThuKho;
};