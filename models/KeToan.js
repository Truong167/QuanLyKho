'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KeToan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  KeToan.init({
    MaKeToan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    MaNhanVien: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'KeToan',
  });
  return KeToan;
};