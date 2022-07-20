import 'mocha';
import { expect } from 'chai';

import Investimento from '../../../src/database/models/investimentos.model';

describe('Model "Investimento":', () => {
  const investimento = new Investimento();

  it(
    'should have the follow properties: "codCliente", "codAtivo" and "qtdeAtivo"',
    () => {
      ['codCliente', 'codAtivo', 'qtdeAtivo'].forEach((property) => {
        expect(investimento).to.have.property(property);
      });
    },
  );
});
