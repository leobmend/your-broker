import {
  Model, INTEGER, DECIMAL, DATE, NOW,
} from 'sequelize';
import db from '.';
import Cliente from './clientes.model';

class Transacao extends Model {
  codTransacao!: number;

  data!: Date;

  codCliente!: number;

  valor!: number;
}

Transacao.init({
  codTransacao: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  data: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
  },
  valor: {
    type: DECIMAL(10, 2),
    allowNull: false,
    // Workaround found at https://github.com/sequelize/sequelize/issues/8019
    get() {
      const value = this.getDataValue('valor');
      return Number.isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    },
  },
}, {
  sequelize: db,
  modelName: 'transacoes',
  timestamps: false,
});

Cliente.hasMany(
  Transacao,
  {
    as: 'transacoes',
    foreignKey: 'codCliente',
  },
);

Transacao.belongsTo(
  Cliente,
  {
    as: 'clientes',
    foreignKey: 'codCliente',
  },
);

export default Transacao;
