'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NhanVien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  NhanVien.init({
    MaNhanVien: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Ho: DataTypes.STRING,
    Ten: DataTypes.STRING,
    NgaySinh: {
      type: DataTypes.DATE,
    },
    DiaChi: DataTypes.STRING,
    SDT: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    MaBoPhan: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'NhanVien',
  });
  
  return NhanVien;
};