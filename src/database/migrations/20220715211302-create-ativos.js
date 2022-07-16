module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ativos', {
      codAtivo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      codAtivoB3: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      empresa: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      qtdeAtivo: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ativos');
  },
};
