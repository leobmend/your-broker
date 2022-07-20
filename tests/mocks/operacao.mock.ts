export const operacaoFullMock = {
  codOperacao: 1,
  data: Date.now(),
  codCliente: 1,
  codAtivo: 'ABC1',
  qtdeAtivo: 100,
  valor: 15.5,
};

export const operacaoFullListMock = [
  {
    codOperacao: 1,
    data: Date.now(),
    codCliente: 1,
    codAtivo: 'ABC1',
    qtdeAtivo: 100,
    valor: 15.5,
  },
  {
    codOperacao: 2,
    data: Date.now(),
    codCliente: 1,
    codAtivo: 'DEF1',
    qtdeAtivo: 200,
    valor: 20.5,
  },
];

export const qtdeNotEnoughMock = {
  ativo: {
    codAtivo: 'ABC1',
    empresa: 'ABC Enterprise',
    qtdeAtivo: 1,
    valor: 15,
  },
  cliente: {
    codCliente: 1,
    nome: 'John Doe',
    email: 'john@test.com',
    saldo: 10000,
  },
  operacao: {
    codCliente: 1,
    codAtivo: 'ABC1',
    qtdeAtivo: 20,
  },
};

export const balanceNotEnoughMock = {
  ativo: {
    codAtivo: 'ABC1',
    empresa: 'ABC Enterprise',
    qtdeAtivo: 100,
    valor: 15,
  },
  cliente: {
    codCliente: 1,
    nome: 'John Doe',
    email: 'john@test.com',
    saldo: 1,
  },
  operacao: {
    codCliente: 1,
    codAtivo: 'ABC1',
    qtdeAtivo: 20,
  },
};

export const balanceAndQtdeEnoughMock = {
  ativo: {
    codAtivo: 'ABC1',
    empresa: 'ABC Enterprise',
    qtdeAtivo: 100,
    valor: 15,
  },
  cliente: {
    codCliente: 1,
    nome: 'John Doe',
    email: 'john@test.com',
    saldo: 1000,
  },
  operacao: {
    codCliente: 1,
    codAtivo: 'ABC1',
    qtdeAtivo: 20,
  },
};

export const investQtdeNotEnoughMock = {
  investimento: {
    codCliente: 1,
    codAtivo: 'ABC1',
    qtdeAtivo: 1,
  },
  ativo: {
    codAtivo: 'ABC1',
    empresa: 'ABC Enterprise',
    qtdeAtivo: 1,
    valor: 15,
  },
  cliente: {
    codCliente: 1,
    nome: 'John Doe',
    email: 'john@test.com',
    saldo: 10000,
  },
  operacao: {
    codCliente: 1,
    codAtivo: 'ABC1',
    qtdeAtivo: 10,
  },
};

export const investQtdeEnoughMock = {
  investimento: {
    codCliente: 1,
    codAtivo: 'ABC1',
    qtdeAtivo: 100,
  },
  ativo: {
    codAtivo: 'ABC1',
    empresa: 'ABC Enterprise',
    qtdeAtivo: 1,
    valor: 15,
  },
  cliente: {
    codCliente: 1,
    nome: 'John Doe',
    email: 'john@test.com',
    saldo: 10000,
  },
  operacao: {
    codCliente: 1,
    codAtivo: 'ABC1',
    qtdeAtivo: 10,
  },
};
