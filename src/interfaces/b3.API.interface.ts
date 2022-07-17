export interface IGetAtivo {
  cd_acao: string;
  nm_empresa: string;
}

export interface IGetAtivoReturn {
  codAcaoB3: string;
  empresa: string;
}

export interface IGetCotacao {
  cd_acao: string;
  vl_fechamento: number;
}

export interface IGetCotacaoReturn {
  codAtivoB3: string;
  valor: number;
}
