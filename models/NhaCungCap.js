'use strict';
const {
  Model
} = require('sequelize');
const {formatDate} = require('../middlewares/utils/formatDate');
module.exports = (sequelize, DataTypes) => {
  class NhaCungCap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NhaCungCap.hasMany(models.MatHang, {foreignKey: 'MaNhaCC'})
      NhaCungCap.hasMany(models.DonDatHang, {foreignKey: 'MaNhaCC'})

    }
  }
  NhaCungCap.init({
    MaNhaCC: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    TenNhaCC: DataTypes.STRING,
    DiaChi: DataTypes.STRING,
    SDT: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'NhaCungCap',
  });
  return NhaCungCap;
};