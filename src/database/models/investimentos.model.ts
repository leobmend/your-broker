import {
  Model, INTEGER,
} from 'sequelize';
import db from '.';
import Ativo from './ativos.model';
import Cliente from './clientes.model';

class Investimento extends Model {
  codCliente!: number;

  codAtivo!: string;

  qtdeAtivo!: number;
}

Investimento.init({
  qtdeAtivo: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'investimentos',
  timestamps: false,
});

Cliente.belongsToMany(
  Ativo,
  {
    as: 'clientesInvestidores',
    through: Investimento,
    foreignKey: 'codCliente',
    otherKey: 'codAtivo',
  },
);

Ativo.belongsToMany(
  Cliente,
  {
    as: 'ativosInvestidos',
    through: Investimento,
    foreignKey: 'codAtivo',
    otherKey: 'codCliente',
  },
);

export default Investimento;
