'use strict';

const { hashPassword } = require('../helpers/bcrypt'); // Pastikan path ini sesuai dengan lokasi bcrypt.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pembeliData = [
      { nama: 'Fatih', email: 'fatih@gmail.com', password: 'fatih123', telepon: '085777888999' },
      { nama: 'Dina', email: 'dina@gmail.com', password: 'dina123', telepon: '085777888998' },
      { nama: 'Andi', email: 'andi@gmail.com', password: 'andi123', telepon: '085777888997' },
      { nama: 'Siti', email: 'siti@gmail.com', password: 'siti123', telepon: '085777888996' },
      { nama: 'Budi', email: 'budi@gmail.com', password: 'budi123', telepon: '085777888995' },
      { nama: 'Rina', email: 'rina@gmail.com', password: 'rina123', telepon: '085777888994' },
      { nama: 'Joko', email: 'joko@gmail.com', password: 'joko123', telepon: '085777888993' },
      { nama: 'Ani', email: 'ani@gmail.com', password: 'ani123', telepon: '085777888992' },
      { nama: 'Eka', email: 'eka@gmail.com', password: 'eka123', telepon: '085777888991' },
      { nama: 'Dewi', email: 'dewi@gmail.com', password: 'dewi123', telepon: '085777888990' },
    ];

    // Hash password untuk setiap pembeli
    const hashedPembeliData = await Promise.all(pembeliData.map(async (pembeli) => ({
      ...pembeli,
      password: await hashPassword(pembeli.password),
      createdAt: new Date(),
      updatedAt: new Date()
    })));

    return queryInterface.bulkInsert('Pembelis', hashedPembeliData, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pembelis', null, {});
  }
};
