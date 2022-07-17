export interface IAtivo {
  codAtivo: string;
  empresa: string;
  qtdeAtivo: number
}

export interface IGetAtivo extends IAtivo {
  valor: number;
}
