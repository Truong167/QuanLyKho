'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OHang.belongsTo(models.Season, {foreignKey: 'seasonId'})
    }
  }
  OHang.init({
    MaO: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    DungTich: DataTypes.DOUBLE,
    DangChuaHang: DataTypes.BOOLEAN,
    MaKe: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'OHang',
  });
  return OHang;
};