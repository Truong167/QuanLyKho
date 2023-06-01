'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhieuXuat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PhieuXuat.belongsTo(models.NhanVien, {foreignKey: 'MaNhanVienn'})
    }
  }
  PhieuXuat.init({
    MaPhieuXuat: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    NgayXuat: {
      type: DataTypes.DATE,
      get: function() {
        return formatDate(this.getDataValue('NgayXuat'))
      }
    },
    DaNhanHang: DataTypes.BOOLEAN,
    LoaiPX: DataTypes.STRING,
    LyDoXuat: DataTypes.STRING,
    MaNhanVien: DataTypes.INTEGER,
    MaDonDH: DataTypes.INTEGER,
    
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'PhieuXuat',
  });
  
  return PhieuXuat;
};