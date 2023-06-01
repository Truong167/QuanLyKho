'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kho extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kho.belongsTo(models.User, {foreignKey: 'userIdKho'})
      Kho.belongsTo(models.User, {foreignKey: 'userIdKhoed'})
    }
  }
  Kho.init({
    MaKho: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    TenKho: {
        type: DataTypes.STRING
    },
    DiaChi: DataTypes.STRING,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Kho'
  });
  return Kho;
};