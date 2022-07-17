module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transacoes', {
      codTransacao: {
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
      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('transacoes');
  },
};
