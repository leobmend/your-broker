import {
  Model, INTEGER, STRING, DECIMAL, DATE, NOW,
} from 'sequelize';
import db from '.';
import Ativo from './ativos.model';
import Cliente from './clientes.model';

class Operacao extends Model {
  codOperacao!: number;

  data!: Date;

  codCliente!: number;

  codAtivo!: string;

  qtdeAtivo!: number;

  tipo!: 'compra'|'venda';

  valor!: number;
}

Operacao.init({
  codOperacao: {
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
  qtdeAtivo: {
    type: INTEGER,
    allowNull: false,
  },
  tipo: {
    type: STRING(10),
    allowNull: false,
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
  modelName: 'operacoes',
  timestamps: false,
});

Cliente.belongsToMany(
  Ativo,
  {
    as: 'clientesOperadores',
    through: Operacao,
    foreignKey: 'codCliente',
    otherKey: 'codAtivo',
  },
);

Ativo.belongsToMany(
  Cliente,
  {
    as: 'ativosOperados',
    through: Operacao,
    foreignKey: 'codAtivo',
    otherKey: 'codCliente',
  },
);

export default Operacao;
