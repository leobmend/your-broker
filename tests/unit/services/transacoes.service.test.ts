import { stub, SinonStub } from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import transacoesService from '../../../src/services/transacoes.service';
import clientesService from '../../../src/services/clientes.service';

import { ITransacao } from '../../../src/interfaces/transacoes.interface';

import Transacao from '../../../src/database/models/transacoes.model';

import {
  balanceEnoughMock,
  balanceNotEnoughMock, transacaoFullListMock, transacaoFullMock, transacaoPostMock,
} from '../../mocks/transacao.mock';
import { clienteGetMock } from '../../mocks/cliente.mock';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Service "Transacoes":', () => {
  let findAllStub: SinonStub;
  let createStub: SinonStub;
  let clientesGetByCodStub: SinonStub;

  before(() => {
    findAllStub = stub(Transacao, 'findAll');
    createStub = stub(Transacao, 'create');
    clientesGetByCodStub = stub(clientesService, 'getByCod');
  });

  after(() => {
    findAllStub.restore();
    clientesGetByCodStub.restore();
  });

  describe('method "getByCliente" should', () => {
    describe('when client has no transaction registered', () => {
      before(() => {
        findAllStub.resolves([]);
      });

      after(() => {
        findAllStub.reset();
      });

      it('throw an error with the message "Nenhuma transação encontrada"', async () => (
        expect(transacoesService.getByCliente(10))
          .to.eventually.be.rejected.and.have.property('message', 'Nenhuma transação encontrada')
      ));
    });

    describe('when the client has transactions registered', () => {
      let transacoes: ITransacao[];

      before(async () => {
        findAllStub.resolves(transacaoFullListMock);
        transacoes = await transacoesService.getByCliente(1);
      });

      after(() => {
        findAllStub.reset();
      });

      it('call the Investimento.findAll once', () => {
        expect(findAllStub.calledOnce).to.be.true;
      });

      it('return an array', () => {
        expect(transacoes).to.be.an('array');
      });

      it('return an array of objects, containing follow properties: "codTransacao", "data", "codCliente" '
        + 'and "valor', () => {
        ['codTransacao', 'data', 'codCliente', 'valor'].forEach((property) => {
          expect(transacoes[0]).to.have.property(property);
        });
      });
    });
  });

  describe('method "createDeposito" should', () => {
    let transacao: ITransacao;
    let clientesUpdateSaldoStub: SinonStub;

    before(async () => {
      clientesUpdateSaldoStub = stub(clientesService, 'updateSaldo');

      clientesGetByCodStub.resolves(clienteGetMock);
      createStub.resolves(transacaoFullMock);
      transacao = await transacoesService.createDeposito(transacaoPostMock);
    });

    after(() => {
      clientesUpdateSaldoStub.restore();

      clientesGetByCodStub.reset();
      createStub.reset();
    });

    it('call the clientesService.updateSaldo once', () => {
      expect(clientesUpdateSaldoStub.calledOnce).to.be.true;
    });

    it('call the Transacao.create once', () => {
      expect(createStub.calledOnce).to.be.true;
    });

    it('return an object', () => {
      expect(transacao).to.be.an('object');
    });

    it(
      'return an object with the follow properties: "codTransacao", "data", "codCliente" and "valor',
      () => {
        ['codTransacao', 'data', 'codCliente', 'valor'].forEach((property) => {
          expect(transacao).to.have.property(property);
        });
      },
    );
  });

  describe('method "createSaque" should', () => {
    describe('when account balance is not enough', () => {
      before(() => {
        clientesGetByCodStub.resolves(balanceNotEnoughMock.cliente);
      });

      after(() => {
        clientesGetByCodStub.reset();
      });

      it('throw an error with the message "Saldo insuficiente"', async () => (
        expect(transacoesService.createSaque(balanceNotEnoughMock.transacao))
          .to.eventually.be.rejected.and.have.property('message', 'Saldo insuficiente')
      ));
    });

    describe('when account balance is enough', () => {
      let transacao: ITransacao;
      let clientesUpdateSaldoStub: SinonStub;

      before(async () => {
        clientesUpdateSaldoStub = stub(clientesService, 'updateSaldo');

        clientesGetByCodStub.resolves(balanceEnoughMock.cliente);
        createStub.resolves(transacaoFullMock);

        transacao = await transacoesService.createSaque(balanceEnoughMock.transacao);
      });

      after(() => {
        clientesUpdateSaldoStub.restore();

        clientesGetByCodStub.reset();
        createStub.reset();
      });

      it('call the clientesService.updateSaldo once', () => {
        expect(clientesUpdateSaldoStub.calledOnce).to.be.true;
      });

      it('call the Transacao.create once', () => {
        expect(createStub.calledOnce).to.be.true;
      });

      it('return an object', () => {
        expect(transacao).to.be.an('object');
      });

      it(
        'return an object with the follow properties: "codTransacao", "data", "codCliente" and "valor',
        () => {
          ['codTransacao', 'data', 'codCliente', 'valor'].forEach((property) => {
            expect(transacao).to.have.property(property);
          });
        },
      );
    });
  });
});
