import { Model, STRING } from 'sequelize';
import db from '.';
import Operacao from './operacoes.model';

import Transacao from './transacoes.model';

class Movimento extends Model {
  codAtivo!: string;

  empresa!: string;

  qtdeAtivo!: number;
}

Movimento.init({
  tipo: {
    type: STRING(10),
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize: db,
  modelName: 'movimentos',
  timestamps: false,
});

Transacao.belongsTo(
  Movimento,
  {
    as: 'movimentoTransacao',
    foreignKey: 'tipo',
  },
);

Movimento.hasMany(
  Transacao,
  {
    as: 'transacoes',
    foreignKey: 'tipo',
  },
);

Operacao.belongsTo(
  Movimento,
  {
    as: 'movimentoOperacao',
    foreignKey: 'tipo',
  },
);

Movimento.hasMany(
  Operacao,
  {
    as: 'operacoes',
    foreignKey: 'tipo',
  },
);

export default Movimento;
