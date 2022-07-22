import { stub, SinonStub } from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import operacoesService from '../../../src/services/operacoes.service';
import clientesService from '../../../src/services/clientes.service';
import ativosService from '../../../src/services/ativos.service';
import investimentosService from '../../../src/services/investimentos.service';

import { IOperacao, IPostOperacaoFull } from '../../../src/interfaces/operacoes.interface';

import Operacao from '../../../src/database/models/operacoes.model';

import {
  qtdeNotEnoughMock, operacaoFullListMock, balanceNotEnoughMock,
  balanceAndQtdeEnoughMock, operacaoFullMock, investQtdeNotEnoughMock, investQtdeEnoughMock,
} from '../../mocks/operacao.mock';
import { investimentoFullMock } from '../../mocks/investimento.mock';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Service "Operacoes":', () => {
  let findAllStub: SinonStub;
  let createStub: SinonStub;
  let clientesGetByCodStub: SinonStub;
  let ativosGetByCodStub: SinonStub;
  let investimentosGetByCodStub: SinonStub;

  before(() => {
    findAllStub = stub(Operacao, 'findAll');
    createStub = stub(Operacao, 'create');
    clientesGetByCodStub = stub(clientesService, 'getByCod');
    ativosGetByCodStub = stub(ativosService, 'getByCod');
    investimentosGetByCodStub = stub(investimentosService, 'getByCod');
  });

  after(() => {
    findAllStub.restore();
    createStub.restore();
    clientesGetByCodStub.restore();
    ativosGetByCodStub.restore();
    investimentosGetByCodStub.restore();
  });

  describe('method "getByCliente" should', () => {
    let operacoes: IOperacao[];

    before(async () => {
      findAllStub.resolves(operacaoFullListMock);
      operacoes = await operacoesService.getByCliente(1);
    });

    after(() => {
      findAllStub.reset();
    });

    it('call the Operacao.findAll once', () => {
      expect(findAllStub.calledOnce).to.be.true;
    });

    it('return an array', () => {
      expect(operacoes).to.be.an('array');
    });

    it('return an array of objects, containing follow properties: "codOperacao", "data", '
        + '"codCliente", "codAtivo", "qtdeAtivo" and "valor', () => {
      ['codOperacao', 'data', 'codCliente', 'codAtivo', 'qtdeAtivo', 'valor']
        .forEach((property) => {
          expect(operacoes[0]).to.have.property(property);
        });
    });
  });

  describe('method "createCompra" should', () => {
    describe('when asset quantity avaiable is not enough', () => {
      before(() => {
        clientesGetByCodStub.resolves(qtdeNotEnoughMock.cliente);
        ativosGetByCodStub.resolves(qtdeNotEnoughMock.ativo);
      });

      after(() => {
        clientesGetByCodStub.reset();
        ativosGetByCodStub.reset();
      });

      it(
        'throw an error with the message "Quantidade insuficiente de ativos disponíveis para compra"',
        async () => (
          expect(operacoesService.createCompra(qtdeNotEnoughMock.operacao as IPostOperacaoFull))
            .to.eventually.be.rejected
            .and.have.property('message', 'Quantidade insuficiente de ativos disponíveis para compra')
        ),
      );
    });

    describe('when account balance is not enough', () => {
      before(() => {
        clientesGetByCodStub.resolves(balanceNotEnoughMock.cliente);
        ativosGetByCodStub.resolves(balanceNotEnoughMock.ativo);
      });

      after(() => {
        clientesGetByCodStub.reset();
        ativosGetByCodStub.reset();
      });

      it(
        'throw an error with the message "Saldo insuficiente para realizar compra"',
        async () => (
          expect(operacoesService.createCompra(balanceNotEnoughMock.operacao as IPostOperacaoFull))
            .to.eventually.be.rejected
            .and.have.property('message', 'Saldo insuficiente para realizar compra')
        ),
      );
    });

    describe('when account balance and asset quantity avaiable are enough', () => {
      let operacao: IOperacao;
      let clientesUpdateSaldoStub: SinonStub;
      let ativosUpdateQtdeStub: SinonStub;
      let investimentosUpdateQtdeStub: SinonStub;

      before(async () => {
        clientesUpdateSaldoStub = stub(clientesService, 'updateSaldo');
        ativosUpdateQtdeStub = stub(ativosService, 'updateQtde');
        investimentosUpdateQtdeStub = stub(investimentosService, 'updateQtde');

        clientesGetByCodStub.resolves(balanceAndQtdeEnoughMock.cliente);
        ativosGetByCodStub.resolves(balanceAndQtdeEnoughMock.ativo);
        investimentosGetByCodStub.resolves(investimentoFullMock);
        createStub.resolves(operacaoFullMock);

        operacao = await operacoesService.createCompra(
          balanceAndQtdeEnoughMock.operacao as IPostOperacaoFull,
        );
      });

      after(() => {
        clientesUpdateSaldoStub.restore();
        ativosUpdateQtdeStub.restore();
        investimentosUpdateQtdeStub.restore();

        clientesGetByCodStub.reset();
        ativosGetByCodStub.reset();
        investimentosGetByCodStub.reset();
        createStub.reset();
      });

      it('call the updators methods on "Clientes", "Ativos" and "Investimentos" services', () => {
        expect(clientesUpdateSaldoStub.calledOnce).to.be.true;
        expect(ativosUpdateQtdeStub.calledOnce).to.be.true;
        expect(investimentosUpdateQtdeStub.calledOnce).to.be.true;
      });

      it('call the Operacao.create once', () => {
        expect(createStub.calledOnce).to.be.true;
      });

      it('return an object', () => {
        expect(operacao).to.be.an('object');
      });

      it('return an object with the follow properties: "codOperacao", "data", "codCliente", '
        + '"codAtivo", "qtdeAtivo" and "valor', () => {
        ['codOperacao', 'data', 'codCliente', 'codAtivo', 'qtdeAtivo', 'valor']
          .forEach((property) => {
            expect(operacao).to.have.property(property);
          });
      });
    });
  });

  describe('method "createVenda" should', () => {
    describe('when client asset quantity is not enough', () => {
      before(() => {
        clientesGetByCodStub.resolves(investQtdeNotEnoughMock.cliente);
        ativosGetByCodStub.resolves(investQtdeNotEnoughMock.ativo);
        investimentosGetByCodStub.resolves(investQtdeNotEnoughMock.investimento);
      });

      after(() => {
        clientesGetByCodStub.reset();
        ativosGetByCodStub.reset();
        investimentosGetByCodStub.reset();
      });

      it(
        'throw an error with the message "Quantidade insuficiente de ativos disponíveis para venda"',
        async () => (
          expect(operacoesService.createVenda(
            investQtdeNotEnoughMock.operacao as IPostOperacaoFull,
          ))
            .to.eventually.be.rejected
            .and.have.property('message', 'Quantidade insuficiente de ativos disponíveis para venda')
        ),
      );
    });

    describe('when client asset quantity is enough', () => {
      let operacao: IOperacao;
      let clientesUpdateSaldoStub: SinonStub;
      let ativosUpdateQtdeStub: SinonStub;
      let investimentosUpdateQtdeStub: SinonStub;

      before(async () => {
        clientesUpdateSaldoStub = stub(clientesService, 'updateSaldo');
        ativosUpdateQtdeStub = stub(ativosService, 'updateQtde');
        investimentosUpdateQtdeStub = stub(investimentosService, 'updateQtde');

        clientesGetByCodStub.resolves(investQtdeEnoughMock.cliente);
        ativosGetByCodStub.resolves(investQtdeEnoughMock.ativo);
        investimentosGetByCodStub.resolves(investimentoFullMock);
        createStub.resolves(operacaoFullMock);

        operacao = await operacoesService.createVenda(
          investQtdeEnoughMock.operacao as IPostOperacaoFull,
        );
      });

      after(() => {
        clientesUpdateSaldoStub.restore();
        ativosUpdateQtdeStub.restore();
        investimentosUpdateQtdeStub.restore();

        clientesGetByCodStub.reset();
        ativosGetByCodStub.reset();
        investimentosGetByCodStub.reset();
        createStub.reset();
      });

      it('call the updators methods on "Clientes", "Ativos" and "Investimentos" services', () => {
        expect(clientesUpdateSaldoStub.calledOnce).to.be.true;
        expect(ativosUpdateQtdeStub.calledOnce).to.be.true;
        expect(investimentosUpdateQtdeStub.calledOnce).to.be.true;
      });

      it('call the Operacao.create once', () => {
        expect(createStub.calledOnce).to.be.true;
      });

      it('return an object', () => {
        expect(operacao).to.be.an('object');
      });

      it('return an object with the follow properties: "codOperacao", "data", "codCliente", '
        + '"codAtivo", "qtdeAtivo" and "valor', () => {
        ['codOperacao', 'data', 'codCliente', 'codAtivo', 'qtdeAtivo', 'valor']
          .forEach((property) => {
            expect(operacao).to.have.property(property);
          });
      });
    });
  });
});
