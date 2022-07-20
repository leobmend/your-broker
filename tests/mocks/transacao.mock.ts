export const transacaoFullMock = {
  codTransacao: 1,
  data: Date.now(),
  codCliente: 1,
  valor: 100,
};

export const transacaoPostMock = {
  codCliente: 1,
  valor: 1000,
};

export const transacaoFullListMock = [
  {
    codTransacao: 1,
    data: Date.now(),
    codCliente: 1,
    valor: 100,
  },
  {
    codTransacao: 2,
    data: Date.now(),
    codCliente: 1,
    valor: -50,
  },
];

export const balanceNotEnoughMock = {
  cliente: {
    codCliente: 1,
    nome: 'John Doe',
    email: 'john@test.com',
    saldo: 500,
  },
  transacao: {
    codCliente: 1,
    valor: 1000,
  },
};

export const balanceEnoughMock = {
  cliente: {
    codCliente: 1,
    nome: 'John Doe',
    email: 'john@test.com',
    saldo: 1000,
  },
  transacao: {
    codCliente: 1,
    valor: 500,
  },
};
