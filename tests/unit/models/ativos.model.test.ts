import 'mocha';
import { expect } from 'chai';

import Ativo from '../../../src/database/models/ativos.model';

describe('Model "Ativo":', () => {
  const ativo = new Ativo();

  it(
    'should have the follow properties: "codAtivo", "empresa" and "qtdeAtivo"',
    () => {
      ['codAtivo', 'empresa', 'qtdeAtivo'].forEach((property) => {
        expect(ativo).to.have.property(property);
      });
    },
  );
});
