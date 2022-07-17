export interface IInvestimento {
  codCliente: number;
  codAtivo: string;
  qtdeAtivo: number;
}

export interface IGetInvestimento extends IInvestimento {
  valor: number;
}
