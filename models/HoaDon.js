'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HoaDon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  HoaDon.init({
    MaHoaDon: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ThanhTien: DataTypes.DOUBLE,
    Thue: DataTypes.DOUBLE,
    MaPhieu: DataTypes.INTEGER,
    MaDoiTac: DataTypes.INTEGER,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'HoaDon',
  });
  
  return HoaDon;
};