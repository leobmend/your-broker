import {
  Model, INTEGER,
} from 'sequelize';
import db from '.';
import Ativo from './ativos.model';
import Cliente from './clientes.model';

class Investimento extends Model {
  codCliente!: number;

  codAtivo!: number;

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
    as: 'clientes',
    through: Investimento,
    foreignKey: 'codCliente',
    otherKey: 'codAcao',
  },
);

Ativo.belongsToMany(
  Cliente,
  {
    as: 'ativos',
    through: Investimento,
    foreignKey: 'codAtivo',
    otherKey: 'codCliente',
  },
);

export default Investimento;
