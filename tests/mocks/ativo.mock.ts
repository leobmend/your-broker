export const ativoMock = {
  codAtivo: 'ABC1',
  empresa: 'ABC Enterprise',
  qtdeAtivo: 100,
};

export const ativoFullMock = {
  codAtivo: 'ABC1',
  empresa: 'ABC Enterprise',
  qtdeAtivo: 100,
  valor: 15.5,
};

export const ativoListMock = [
  {
    codAtivo: 'ABC1',
    empresa: 'ABC Enterprise',
    qtdeAtivo: 100,
  },
  {
    codAtivo: 'GHI3',
    empresa: 'GHI Enterprise',
    qtdeAtivo: 300,
  },
  {
    codAtivo: 'DEF2',
    empresa: 'DEF Enterprise',
    qtdeAtivo: 200,
  },
];

export const ativoFullListMock = ativoListMock.map((ativo) => ({ ...ativo, valor: 15.5 }));

export const cotacaoMock = {
  codAtivo: 'GENERIC',
  valor: 15,
};
