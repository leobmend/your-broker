import axios, { AxiosInstance } from 'axios';
import {
  IGetCotacao, IGetAtivo, IGetAtivoReturn, IGetCotacaoReturn,
} from '../interfaces/b3.API.interface';

const b3API: AxiosInstance = axios.create({
  baseURL: 'https://api-cotacao-b3.labdo.it/api',
});

export const getAtivos = async (): Promise<IGetAtivoReturn[] | void> => (
  b3API.get('/carteira')
    .then((response) => (
      response.data.map(
        (ativo: IGetAtivo) => ({ codAtivoB3: ativo.cd_acao, empresa: ativo.nm_empresa }),
      )))
    .catch((err) => console.log(err.message))
);

export const getCotacao = async (codAtivoB3: string): Promise<IGetCotacaoReturn | void> => (
  b3API.get(`/cotacao/cd_acao/${codAtivoB3}`)
    .then((response) => {
      const lastCotacao = response.data[0] as IGetCotacao;
      return { codAtivoB3: lastCotacao.cd_acao, valor: lastCotacao.vl_fechamento };
    })
    .catch((err) => console.log(err.message))
);
