module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'clientes',
      [
        {
          nome: 'Leonardo Mendonça',
          email: 'teste@email.com',
          saldo: 0.00,
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
