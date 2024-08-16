'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Transaksis', 'statusPembayaran', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending' // Set default value
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Transaksis', 'statusPembayaran');
  }
};
