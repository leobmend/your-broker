import { Model, STRING } from 'sequelize';
import db from '.';

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

export default Movimento;
