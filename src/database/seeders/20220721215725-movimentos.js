module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'movimentos',
      [
        { tipo: 'compra' },
        { tipo: 'venda' },
        { tipo: 'deposito' },
        { tipo: 'saque' },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      'movimentos',
      null,
      {},
    );
  },
};
