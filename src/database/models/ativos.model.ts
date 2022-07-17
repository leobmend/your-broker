import {
  Model, INTEGER, STRING,
} from 'sequelize';
import db from '.';

class Ativo extends Model {
  codAtivo!: string;

  empresa!: string;

  qtdeAtivo!: number;
}

Ativo.init({
  codAtivo: {
    type: STRING(10),
    allowNull: false,
    primaryKey: true,
  },
  empresa: {
    type: STRING(50),
    allowNull: false,
  },
  qtdeAtivo: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'ativos',
  timestamps: false,
});

export default Ativo;
