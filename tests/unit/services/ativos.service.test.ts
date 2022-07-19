import { stub } from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import ativosService from '../../../src/services/ativos.service';

import { IAtivo, IGetAtivo } from '../../../src/interfaces/ativos.interface';

import Ativo from '../../../src/database/models/ativos.model';
import * as b3APIModel from '../../../src/external/b3.API.model';

import { ativoListMock, ativoMock, cotacaoMock } from '../../mocks/ativo.mock';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Service "Ativos":', () => {
  const findAllStub = stub(Ativo, 'findAll');
  const findByPkStub = stub(Ativo, 'findByPk');
  const updateStub = stub(Ativo, 'update');
  const createStub = stub(Ativo, 'create');
  const getCotacaoStub = stub(b3APIModel, 'getCotacao');

  describe('method "getBySearch" should', () => {
    let ativos: IGetAtivo[];

    describe('when search term is not used', () => {
      before(async () => {
        findAllStub.resolves(ativoListMock as Ativo[]);
        getCotacaoStub.resolves(cotacaoMock);
        ativos = await ativosService.getBySearch('', 1);
      });

      after(() => {
        findAllStub.reset();
        getCotacaoStub.reset();
      });

      it('call the Ativo.findAll once', () => {
        expect(findAllStub.calledOnce).to.be.true;
        getCotacaoStub.resolves(cotacaoMock);
      });

      it('return an array', async () => {
        expect(ativos).to.be.an('array');
      });
    });

    describe('when search term is used', () => {
      before(async () => {
        findAllStub.resolves([ativoListMock[1] as Ativo]);
        getCotacaoStub.resolves(cotacaoMock);
        ativos = await ativosService.getBySearch(ativoListMock[1].codAtivo, 1);
      });

      after(() => {
        findAllStub.reset();
        getCotacaoStub.reset();
      });

      it('call the Ativo.findAll once', () => {
        expect(findAllStub.calledOnce).to.be.true;
      });

      it('return an array', async () => {
        expect(ativos).to.be.an('array');
      });

      it('return an array filtered by the term', async () => {
        expect(ativos[0].codAtivo).to.be.equal(ativoListMock[1].codAtivo);
      });
    });
  });

  describe('method "getByCod" should', () => {
    let ativo: IGetAtivo;

    describe('when the asset is not registered', () => {
      before(() => {
        findByPkStub.resolves(null);
      });

      after(() => {
        findByPkStub.reset();
      });

      it('throw an error with the message "Ativo não encontrado"', async () => (
        expect(ativosService.getByCod('XYZ'))
          .to.eventually.be.rejected.and.have.property('message', 'Ativo não encontrado')
      ));
    });

    describe('when the asset is registered', () => {
      before(async () => {
        findByPkStub.resolves(ativoMock as Ativo);
        getCotacaoStub.resolves(cotacaoMock);
        ativo = await ativosService.getByCod('ABC1');
      });

      after(() => {
        findByPkStub.reset();
        getCotacaoStub.reset();
      });

      it('call the Ativo.findByPk once', () => {
        expect(findByPkStub.calledOnce).to.be.true;
      });

      it('return an object', async () => {
        expect(ativo).to.be.an('object');
      });

      it(
        'return an object with the follow properties: "codAtivo", "empresa", "qtdeAtivo" and "valor"',
        async () => {
          ['codAtivo', 'empresa', 'qtdeAtivo', 'valor'].forEach((property) => {
            expect(ativo).to.have.property(property);
          });
        },
      );
    });
  });

  describe('method "updateQtde" should', () => {
    const NEW_QTDE = 1000;

    describe('when the asset is not registered', () => {
      before(() => {
        findByPkStub.resolves(null);
      });

      after(() => {
        findByPkStub.reset();
      });

      it('throw an error with the message "Ativo não encontrado"', async () => (
        expect(ativosService.updateQtde('XYZ', 500))
          .to.eventually.be.rejected.and.have.property('message', 'Ativo não encontrado')
      ));
    });

    describe('when the asset is registered', () => {
      before(async () => {
        findByPkStub.resolves(ativoMock as Ativo);
        await ativosService.updateQtde('ABC1', NEW_QTDE);
      });

      after(() => {
        findByPkStub.reset();
      });

      it('call the Ativo.findByPk once', () => {
        expect(findByPkStub.calledOnce).to.be.true;
      });

      it('call the Ativo.update once', () => {
        expect(updateStub.calledOnce).to.be.true;
      });
    });
  });

  describe('method "create" should', () => {
    describe('when the asset is already registered', () => {
      before(() => {
        findByPkStub.resolves(ativoMock as Ativo);
      });

      after(() => {
        findByPkStub.reset();
      });

      it('throw an error with the message "Já existe ativo com este código B3"', async () => (
        expect(ativosService.create(ativoMock))
          .to.eventually.be.rejected.and.have.property('message', 'Já existe ativo com este código B3')
      ));
    });

    describe('when is a new asset', () => {
      let newAtivo: IAtivo;

      before(async () => {
        findByPkStub.resolves(null);
        createStub.resolves(ativoMock as Ativo);
        newAtivo = await ativosService.create(ativoMock);
      });

      after(() => {
        findByPkStub.reset();
        createStub.reset();
      });

      it('call the Cliente.findOne once', () => {
        expect(findByPkStub.calledOnce).to.be.true;
      });

      it('call the Cliente.create once', () => {
        expect(createStub.calledOnce).to.be.true;
      });

      it('return an object', () => {
        expect(newAtivo).to.be.an('object');
      });

      it('return an object with the follow properties: "codAtivo", "empresa" and "qtdeAtivo"', () => {
        ['codAtivo', 'empresa', 'qtdeAtivo'].forEach((property) => {
          expect(newAtivo).to.have.property(property);
        });
      });
    });
  });
});
