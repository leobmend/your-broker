module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('custodias', {
      codCliente: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes',
          key: 'codCliente',
        },
      },
      codAtivo: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'acoes_disponiveis',
          key: 'codAtivo',
        },
      },
      qtdeAtivo: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('custodias');
  },
};
