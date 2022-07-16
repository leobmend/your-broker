import {
  Model, INTEGER, STRING,
} from 'sequelize';
import db from '.';

class Ativo extends Model {
  codAtivo!: number;

  codAtivoB3!: string;

  empresa!: string;

  qtdeAtivo!: number;
}

Ativo.init({
  codAtivo: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  codAtivoB3: {
    type: STRING(10),
    allowNull: false,
    unique: true,
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
