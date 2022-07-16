import {
  Model, INTEGER,
} from 'sequelize';
import db from '.';
import Ativo from './ativos.model';
import Cliente from './clientes.model';

class Custodia extends Model {
  codCliente!: number;

  codAtivo!: number;

  qtdeAtivo!: number;
}

Custodia.init({
  qtdeAtivo: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'custodias',
  timestamps: false,
});

Cliente.belongsToMany(
  Ativo,
  {
    as: 'clientes',
    through: Custodia,
    foreignKey: 'codCliente',
    otherKey: 'codAcao',
  },
);

Ativo.belongsToMany(
  Cliente,
  {
    as: 'ativos',
    through: Custodia,
    foreignKey: 'codAtivo',
    otherKey: 'codCliente',
  },
);

export default Custodia;
