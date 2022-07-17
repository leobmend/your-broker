export interface IGetAtivo {
  cd_acao: string;
  nm_empresa: string;
}

export interface IGetAtivoReturn {
  codAcao: string;
  empresa: string;
}

export interface IGetCotacao {
  cd_acao: string;
  vl_fechamento: number;
}

export interface IGetCotacaoReturn {
  codAtivo: string;
  valor: number;
}
