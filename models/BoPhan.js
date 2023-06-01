'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoPhan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // BoPhan.hasOne(models.User)
      // define association here
      // BoPhan.belongsTo(models.User, {
      //   foreignKey: 'userId',
      //   as: 'userData',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // });
    }
  }
  BoPhan.init({
    MaBoPhan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    TenBoPhan: DataTypes.STRING,
    MaKho: DataTypes.STRING,
    
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'BoPhan',
  });
  
  return BoPhan;
};