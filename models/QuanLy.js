'use strict';
const {
  Model
} = require('sequelize');
const {formatDate} = require('../middlewares/utils/formatDate');
module.exports = (sequelize, DataTypes) => {
  class QuanLy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuanLy.belongsTo(models.Recipe, {foreignKey: 'recipeId'})
      QuanLy.belongsTo(models.User, {foreignKey: 'userId'})

    }
  }
  QuanLy.init({
    MaQuanLy: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    MaNhanVien: DataTypes.INTEGER,
    NgayNhanChuc: {
      type: DataTypes.DATE,
      get: function() {
        return formatDate(this.getDataValue('NgayNhanChuc'))
      }
    },
    NgayKetThuc: {
      type: DataTypes.DATE,
      get: function() {
        return formatDate(this.getDataValue('NgayKetThuc'))
      }
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'QuanLy'
  });
  return QuanLy;
};