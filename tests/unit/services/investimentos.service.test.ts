import { stub, SinonStub } from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import investimentosService from '../../../src/services/investimentos.service';
import clientesService from '../../../src/services/clientes.service';

import { IGetInvestimento, IInvestimento } from '../../../src/interfaces/investimentos.interface';

import Investimento from '../../../src/database/models/investimentos.model';
import * as b3APIModel from '../../../src/external/b3.API.model';

import { investimentoListMock, investimentoMock } from '../../mocks/investimento.mock';
import { cotacaoMock } from '../../mocks/ativo.mock';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Service "Investimentos":', () => {
  let findOneStub: SinonStub;
  let findAllStub: SinonStub;
  let createStub: SinonStub;
  let updateStub: SinonStub;
  let clientesGetByCodStub: SinonStub;
  let getCotacaoStub: SinonStub;

  before(() => {
    findOneStub = stub(Investimento, 'findOne');
    findAllStub = stub(Investimento, 'findAll');
    createStub = stub(Investimento, 'create');
    updateStub = stub(Investimento, 'update');
    clientesGetByCodStub = stub(clientesService, 'getByCod');
    getCotacaoStub = stub(b3APIModel, 'getCotacao');
  });

  after(() => {
    findOneStub.restore();
    findAllStub.restore();
    createStub.restore();
    updateStub.restore();
    clientesGetByCodStub.restore();
    getCotacaoStub.restore();
  });

  describe('method "getByCod" should', () => {
    describe('when the client don\'t have the asset', () => {
      before(async () => {
        findOneStub.resolves(null);
      });

      after(() => {
        findOneStub.reset();
      });

      it('throw an error with the message "Investimento não encontrado"', async () => (
        expect(investimentosService.getByCod(1, 'XYZ'))
          .to.eventually.be.rejected.and.have.property('message', 'Investimento não encontrado')
      ));
    });

    describe('when the client have the asset', () => {
      let investimento: IInvestimento;

      before(async () => {
        findOneStub.resolves(investimentoMock as Investimento);
        investimento = await investimentosService.getByCod(1, 'ABC1');
      });

      after(() => {
        findOneStub.reset();
      });

      it('call the Investimento.findOne once', () => {
        expect(findOneStub.calledOnce).to.be.true;
      });

      it('return an object', () => {
        expect(investimento).to.be.an('object');
      });

      it('return an object with the follow properties: "codCliente", "codAtivo" and "qtdeAtivo"', () => {
        ['codCliente', 'codAtivo', 'qtdeAtivo'].forEach((property) => {
          expect(investimento).to.have.property(property);
        });
      });
    });
  });

  describe('method "getByCliente" should', () => {
    describe('when the client has no investment', () => {
      before(() => {
        findAllStub.resolves([]);
      });

      after(() => {
        findAllStub.reset();
      });

      it('throw an error with the message "Nenhum investimento encontrado"', async () => (
        expect(investimentosService.getByCliente(10))
          .to.eventually.be.rejected.and.have.property('message', 'Nenhum investimento encontrado')
      ));
    });

    describe('when the client has investments', () => {
      let investimentos: IGetInvestimento[];

      before(async () => {
        findAllStub.resolves(investimentoListMock);
        getCotacaoStub.resolves(cotacaoMock);
        investimentos = await investimentosService.getByCliente(1);
      });

      after(() => {
        findAllStub.reset();
        getCotacaoStub.reset();
      });

      it('call the Investimento.findAll once', () => {
        expect(findAllStub.calledOnce).to.be.true;
      });

      it('return an array', () => {
        expect(investimentos).to.be.an('array');
      });

      it('return an array of objects, containing follow properties: '
        + 'codCliente", "codAtivo" and "qtdeAtivo"', () => {
        ['codCliente', 'codAtivo', 'qtdeAtivo', 'valor'].forEach((property) => {
          expect(investimentos[0]).to.have.property(property);
        });
      });
    });
  });

  describe('method "create" should', () => {
    describe('when the investment is already registered', () => {
      before(() => {
        findOneStub.resolves(investimentoMock);
      });

      after(() => {
        findOneStub.reset();
      });

      it('throw an error with the message "Investimento já cadastrado"', async () => (
        expect(investimentosService.create(investimentoMock))
          .to.eventually.be.rejected.and.have.property('message', 'Investimento já cadastrado')
      ));
    });

    describe('when is a new investment', () => {
      let investimento: IInvestimento;

      before(async () => {
        findOneStub.resolves(null);
        createStub.resolves(investimentoMock);
        investimento = await investimentosService.create(investimentoMock);
      });

      after(() => {
        findOneStub.reset();
        createStub.reset();
      });

      it('call the Investimento.findOne once', () => {
        expect(findOneStub.calledOnce).to.be.true;
      });

      it('return an object', () => {
        expect(investimento).to.be.an('object');
      });

      it('return an object with the follow properties: "codCliente", "codAtivo" and "qtdeAtivo"', () => {
        ['codCliente', 'codAtivo', 'qtdeAtivo'].forEach((property) => {
          expect(investimento).to.have.property(property);
        });
      });
    });
  });

  describe('method "updateQtde" should', () => {
    describe('when the investment is not registered', () => {
      before(() => {
        findOneStub.resolves(null);
      });

      after(() => {
        findOneStub.reset();
      });

      it('throw an error with the message "Investimento não encontrado"', async () => (
        expect(investimentosService.updateQtde(investimentoMock))
          .to.eventually.be.rejected.and.have.property('message', 'Investimento não encontrado')
      ));
    });

    describe('when the investment is registered', () => {
      const newInvestimento = { ...investimentoMock, qtdeAtivo: 1000 };

      before(async () => {
        findOneStub.resolves(investimentoMock);
        updateStub.resolves(newInvestimento);
        await investimentosService.updateQtde(newInvestimento);
      });

      after(() => {
        findOneStub.reset();
        updateStub.reset();
      });

      it('call the Investimento.findOne once', () => {
        expect(findOneStub.calledOnce).to.be.true;
      });

      it('call the Investimento.update once', () => {
        expect(updateStub.calledOnce).to.be.true;
      });
    });
  });
});
