module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movimentos', {
      tipo: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(10),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('movimentos');
  },
};
