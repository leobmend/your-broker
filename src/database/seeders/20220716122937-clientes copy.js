module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'clientes',
      [
        {
          codCliente: '1',
          nome: 'Leonardo Mendonça',
          saldo: 0,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      'clientes',
      null,
      {},
    );
  },
};
