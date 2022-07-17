module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'clientes',
      [
        {
          nome: 'Leonardo Mendonça',
          email: 'teste@email.com',
          saldo: 5555.55,
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
