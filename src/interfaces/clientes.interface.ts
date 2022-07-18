interface NomeEmail {
  nome: string;
  email: string;
}

export interface IPostLogin {
  email: string;
  senha: string;
}

export interface IPostCliente extends NomeEmail {
  senha: string;
}

export interface ICliente extends NomeEmail {
  codCliente: number;
  saldo: number;
}
