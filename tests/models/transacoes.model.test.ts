import 'mocha';
import { expect } from 'chai';

import Transacao from '../../src/database/models/transacoes.model';

describe('Model "Transacao":', () => {
  const transacao = new Transacao();

  it(
    'should have the follow properties: "codTransacao", "data", "codCliente" and "valor"',
    () => {
      ['codTransacao', 'data', 'codCliente', 'valor'].forEach((property) => {
        expect(transacao).to.have.property(property);
      });
    },
  );
});
