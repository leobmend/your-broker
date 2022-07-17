import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  IGetCotacao, IGetAtivo, IGetAtivoReturn, IGetCotacaoReturn,
} from '../interfaces/b3.API.interface';

const b3API: AxiosInstance = axios.create({
  baseURL: 'https://api-cotacao-b3.labdo.it/api',
});

export const getAtivos = async (): Promise<IGetAtivoReturn[] | void> => (
  b3API.get('/carteira')
    .then((response: AxiosResponse) => (
      response.data.map(
        (ativo: IGetAtivo) => ({ codAtivo: ativo.cd_acao, empresa: ativo.nm_empresa }),
      )))
    .catch((err) => console.log(err.message))
);

export const getCotacao = async (codAtivo: string): Promise<IGetCotacaoReturn | void> => (
  b3API.get(`/cotacao/cd_acao/${codAtivo}/1`)
    .then((response: AxiosResponse) => {
      const lastCotacao = response.data[0] as IGetCotacao;
      return { codAtivo: lastCotacao.cd_acao, valor: lastCotacao.vl_fechamento };
    })
    .catch((err) => console.log(err.message))
);
