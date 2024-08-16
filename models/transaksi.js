'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    static associate(models) {
      // define association here
    }
  }
  Transaksi.init({
    pembeliId: DataTypes.INTEGER,
    menuId: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    totalHarga: DataTypes.FLOAT,
    statusPembayaran: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Transaksi',
  });
  return Transaksi;
};
