module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clientes', {
      codCliente: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      email: {
        allowNull:false,
        type: Sequelize.STRING(50),
        unique: true,
      },
      saldo: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('clientes');
  },
};
