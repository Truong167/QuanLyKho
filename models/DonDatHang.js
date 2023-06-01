'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonDatHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

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