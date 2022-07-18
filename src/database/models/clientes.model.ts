import {
  Model, INTEGER, STRING, DECIMAL,
} from 'sequelize';
import db from '.';

class Cliente extends Model {
  codCliente!: number;

  nome!: string;

  email!: string;

  saldo!: number;

  senha!: string;
}

Cliente.init({
  codCliente: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: STRING(50),
    allowNull: false,
  },
  email: {
    type: STRING(50),
    allowNull: false,
    unique: true,
  },
  saldo: {
    type: DECIMAL(10, 2),
    allowNull: false,
    // Workaround found at https://github.com/sequelize/sequelize/issues/8019
    get() {
      const value = this.getDataValue('saldo');
      return Number.isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    },
  },
  senha: {
    type: STRING(200),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'clientes',
  timestamps: false,
});

export default Cliente;
