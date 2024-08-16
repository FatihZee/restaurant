'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuMakanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MenuMakanan.init({
    nama: DataTypes.STRING,
    harga: DataTypes.DECIMAL,
    deskripsi: DataTypes.TEXT,
    foto: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'MenuMakanan',
  });
  return MenuMakanan;
};