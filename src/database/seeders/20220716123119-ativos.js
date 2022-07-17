const { getAtivos } = require('../../../build/external/b3.API.model');

const MAX_STOCK = 1000000;

const randomQtdeAtivo = () => (
  Math.floor(Math.random() * MAX_STOCK + 1)
);

const getAtivosSeed = async () => {
  const b3ApiData = await getAtivos();
  const acoesSeed = b3ApiData.map(
    (ativo) => (
      { ...ativo, qtdeAtivo: randomQtdeAtivo() }
    ),
  );

  return acoesSeed;
};

module.exports = {
  up: async (queryInterface) => {
    const seed = await getAtivosSeed();
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
