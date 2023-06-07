'use strict';
const {
  Model
} = require('sequelize');
const {formatDate} = require('../middlewares/utils/formatDate')
module.exports = (sequelize, DataTypes) => {
  class ViTriMatHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ViTriMatHang.belongsTo(models.OHang, {foreignKey: 'MaO'})
      ViTriMatHang.belongsTo(models.MatHang, {foreignKey: 'MaMatHang'})
    }
  }
  ViTriMatHang.init({
    MaO: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    MaMatHang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    SKU: DataTypes.STRING,
    NgayLenKe: {
      type: DataTypes.DATE,
      get: function() {
        return formatDate(this.getDataValue('NgayLenKe'))
      }
    },
    SoLuongBanDau: DataTypes.INTEGER,
    SoLuongHienTai: DataTypes.INTEGER,

    
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'ViTriMatHang',
  });
  
  return ViTriMatHang;
};