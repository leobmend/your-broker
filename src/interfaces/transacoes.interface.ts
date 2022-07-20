export interface IPostTrancasao {
  codCliente: number;
  valor: number;
}

export interface ITransacao extends IPostTrancasao {
  codTransacao: number;
  data: Date;
}
