module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('acoes_disponiveis', {
      codAtivo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('acoes_disponiveis');
  },
};