export interface IPostOperacao {
  codCliente: number;
  codAtivo: string;
  qtdeAtivo: number;
}

export interface IOperacao extends IPostOperacao {
  codOperacao: number;
  data: Date;
  valor: number;
}
