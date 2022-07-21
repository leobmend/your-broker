export interface IPostOperacao {
  tipo: 'compra'|'venda';
  codAtivo: string;
  qtdeAtivo: number;
}

export interface IPostOperacaoFull extends IPostOperacao {
  codCliente: number;
}

export interface IOperacao extends IPostOperacao {
  codOperacao: number;
  data: Date;
  valor: number;
}
