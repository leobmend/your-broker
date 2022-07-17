import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';

import { IAtivo, IGetAtivo } from '../interfaces/ativos.interface';
import { IGetCotacaoReturn } from '../interfaces/b3.API.interface';

import Ativo from '../database/models/ativos.model';
import { getCotacao } from '../external/b3.API.model';

import HttpError from '../utils/HttpError';

const PAGES_SIZE = 10;
const minIndex = (pag: number): number => (pag - 1) * PAGES_SIZE;
const maxIndex = (pag: number): number => pag * PAGES_SIZE;

const getBySearch = async (termo: string, pag: number, _ordenacao: string): Promise<IAtivo[]> => {
  const ativos = await Ativo.findAll({
    where: {
      [Op.or]: [
        { empresa: { [Op.like]: `%${termo}%` } },
        { codAtivo: { [Op.like]: `%${termo}%` } },
      ],
    },
  });

  const orderedAtivos = ativos.sort(({ codAtivo: codA }, { codAtivo: codB }) => {
    if (codB < codA) {
      return 1;
    }
    if (codB > codA) {
      return -1;
    }
    return 0;
  });

  const filteredAtivos = orderedAtivos.filter(
    (_ativo, index) => index >= minIndex(pag) && index < maxIndex(pag),
  );

  if (filteredAtivos.length > 11) throw Error('ALOU');

  const promises = filteredAtivos.map(
    async (ativo: IAtivo): Promise<IGetAtivo> => {
      const { valor } = await getCotacao(ativo.codAtivo) as IGetCotacaoReturn;

      const ativoWithValor = {
        codAtivo: ativo.codAtivo,
        empresa: ativo.empresa,
        qtdeAtivo: ativo.qtdeAtivo,
        valor,
      };

      return ativoWithValor;
    },
  );

  const ativosWithValor = await Promise.all(promises);
  return ativosWithValor;
};

const getByCod = async (codAtivo: string): Promise<IGetAtivo> => {
  const ativo = await Ativo.findByPk(codAtivo);
  if (!ativo) throw new HttpError(StatusCodes.NOT_FOUND, 'Ativo não encontrado');

  const { valor } = await getCotacao(codAtivo) as IGetCotacaoReturn;

  const ativoWithValor = {
    codAtivo: ativo.codAtivo,
    empresa: ativo.empresa,
    qtdeAtivo: ativo.qtdeAtivo,
    valor,
  };

  return ativoWithValor;
};

const updateQtde = async (codAtivo: string, qtdeAtivo: number): Promise<void> => {
  await Ativo.update({ qtdeAtivo }, { where: { codAtivo } });
};

const create = async (ativo: Omit<IAtivo, ''>): Promise<IAtivo> => {
  const ativoByCod = await Ativo.findByPk(ativo.codAtivo);
  if (ativoByCod) throw new HttpError(StatusCodes.CONFLICT, 'Já existe ativo com este código B3');

  const newAtivo = await Ativo.create(ativo);
  return newAtivo;
};

const ativosService = {
  getBySearch,
  getByCod,
  updateQtde,
  create,
};

export default ativosService;
