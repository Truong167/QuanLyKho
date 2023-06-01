'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Khu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Khu.belongsTo(models.Kho, {foreignKey: 'MaKho'})
      Khu.hasMany(models.KeHang, {foreignKey: 'MaKhu'})

    }
  }
  Khu.init({
    MaKhu: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    TenKhu: DataTypes.STRING,
    MaKho: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Khu',
  });
  return Khu;
};