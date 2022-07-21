export interface IPostTrancasao {
  tipo: 'deposito'|'saque';
  valor: number;
}

export interface IPostTransacaoFull extends IPostTrancasao {
  codCliente: number;
}

export interface ITransacao extends IPostTrancasao {
  codTransacao: number;
  data: Date;
}
