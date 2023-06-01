'use strict';
const {
  Model
} = require('sequelize');
const {formatDate} = require('../middlewares/utils/formatDate');

module.exports = (sequelize, DataTypes) => {
  class MatHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MatHang.belongsTo(models.LoaiHang, {foreignKey: "MaLoaiHang"})
      MatHang.belongsTo(models.NhaCungCap, {foreignKey: "MaNhaCC"})
    }
  }
  MatHang.init({
    MaMatHang: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    TenMatHang: DataTypes.STRING,
    SoLuongTon: DataTypes.INTEGER,
    NgaySx: {
      type: DataTypes.DATE,
      get: function() {
        return formatDate(this.getDataValue('NgaySx'))
      }
    },
    NoiSx: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    MaLoaiHang: DataTypes.INTEGER,
    MaNhaCC: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'MatHang',
  });
  
  return MatHang;
};