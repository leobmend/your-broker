const { getAtivos } = require('../../../build/external/b3.API.model');

module.exports = {
  up: async (queryInterface) => {
    const seed = await getAtivos();
    await queryInterface.bulkInsert(
      'ativos',
      seed,
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      'ativos',
      null,
      {},
    );
  },
};
