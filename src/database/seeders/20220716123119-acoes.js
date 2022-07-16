const { getAcoes } = require('../../../build/utils/b3API');

const MAX = 150;

const randomQtdeAtivo = () => (
  Math.floor(Math.random() * MAX + 1)
);

const getAcoesSeed = async () => {
  const b3ApiData = await getAcoes();
  const acoesSeed = b3ApiData.map(
    (acao) => (
      { ...acao, qtdeAtivo: randomQtdeAtivo() }
    ),
  );

  return acoesSeed;
};

module.exports = {
  up: async (queryInterface) => {
    const seed = await getAcoesSeed();
    await queryInterface.bulkInsert(
      'acoes_disponiveis',
      seed,
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      'acoes_disponiveis',
      null,
      {},
    );
  },
};
