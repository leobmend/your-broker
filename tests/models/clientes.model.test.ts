import 'mocha';
import { expect } from 'chai';

import Cliente from '../../src/database/models/clientes.model';

describe('Model "Cliente":', () => {
  const cliente = new Cliente();

  it(
    'should have the follow properties: "codCliente", "nome", "email", "senha" and "saldo"',
    () => {
      ['codCliente', 'nome', 'email', 'senha', 'saldo'].forEach((property) => {
        expect(cliente).to.have.property(property);
      });
    },
  );
});
