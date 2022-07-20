import 'mocha';
import { expect } from 'chai';

import Operacao from '../../../src/database/models/operacoes.model';

describe('Model "Operacao":', () => {
  const operacao = new Operacao();

  it(
    'should have the follow properties: "codOperacao", "data", "codCliente", "codAtivo", "qtdeAtivo" and "valor"',
    () => {
      ['codOperacao', 'data', 'codCliente', 'codAtivo', 'qtdeAtivo', 'valor'].forEach((property) => {
        expect(operacao).to.have.property(property);
      });
    },
  );
});
