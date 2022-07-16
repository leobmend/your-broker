const { getAtivos } = require('../../../build/external/b3.API.model');

const MAX = 150;

const randomQtdeAtivo = () => (
  Math.floor(Math.random() * MAX + 1)
);

const getAtivosSeed = async () => {
  const b3ApiData = await getAtivos();
  const acoesSeed = b3ApiData.map(
    (acao) => (
      { ...acao, qtdeAtivo: randomQtdeAtivo() }
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
