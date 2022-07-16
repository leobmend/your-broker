import {
  Model, INTEGER, STRING, DECIMAL,
} from 'sequelize';
import db from '.';

class Cliente extends Model {
  codCliente!: number;

  nome!: string;

  saldo!: number;
}

Cliente.init({
  codCliente: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: STRING(30),
    allowNull: false,
  },
  saldo: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'clientes',
  timestamps: false,
});

export default Cliente;
