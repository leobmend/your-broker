import axios, { AxiosInstance } from 'axios';
import { IGetAcoes, IGetAcoesReturn } from '../database/interfaces/b3API.interface';

const b3API: AxiosInstance = axios.create({
  baseURL: 'https://api-cotacao-b3.labdo.it/api',
});

export const getAtivos = async (): Promise<IGetAcoesReturn[] | void> => (
  b3API.get('/carteira')
    .then((response) => (
      response.data.map(
        (acao: IGetAcoes) => (
          { codAtivoB3: acao.cd_acao, empresa: acao.nm_empresa }
        ),
      )))
    .catch((err) => console.log(err.message))
);

export const getCotacao = async () => {};
