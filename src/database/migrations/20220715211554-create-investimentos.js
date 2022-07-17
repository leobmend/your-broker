module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('investimentos', {
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
        type: Sequelize.STRING(10),
        references: {
          model: 'ativos',
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
    await queryInterface.dropTable('investimentos');
  },
};
