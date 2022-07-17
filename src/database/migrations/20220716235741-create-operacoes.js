module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('operacoes', {
      codOperacao: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      data: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      codCliente: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes',
          key: 'codCliente',
        },
        onDelete: 'CASCADE',
      },
      codAtivo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ativos',
          key: 'codAtivo',
        },
        onDelete: 'CASCADE',
      },
      qtdeAtivo: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('operacoes');
  },
};
