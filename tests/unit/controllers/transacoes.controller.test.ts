import { stub, SinonStub } from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import transacoesController from '../../../src/controllers/transacoes.controller';

import transacoesService from '../../../src/services/transacoes.service';

import { transacaoFullListMock, transacaoFullMock } from '../../mocks/transacao.mock';

describe('Controller "Transacoes":', () => {
  const request = { params: {}, query: {}, body: {} } as Request;

  const response = {} as Response;
  response.status = () => response;
  response.json = () => response;

  let statusStub: SinonStub;
  let jsonStub: SinonStub;

  before(() => {
    statusStub = stub(response, 'status');
    jsonStub = stub(response, 'json');
  });

  after(() => {
    statusStub.restore();
    jsonStub.restore();
  });

  describe('method "getByCliente" should', () => {
    let transacoesGetByClienteStub: SinonStub;
    const result = { data: transacaoFullListMock };

    before(async () => {
      transacoesGetByClienteStub = stub(transacoesService, 'getByCliente');
      transacoesGetByClienteStub.resolves(transacaoFullListMock);

      statusStub.returns(response);

      await transacoesController.getByCliente(request, response);
    });

    after(() => {
      statusStub.reset();

      transacoesGetByClienteStub.restore();
    });

    it('call the response.status with HTTP status code for OK', async () => {
      expect(statusStub.calledWith(StatusCodes.OK)).to.be.true;
    });

    it('call the response.json with transactions found', async () => {
      expect(jsonStub.calledWith(result)).to.be.true;
    });
  });

  describe('method "create" should', () => {
    describe('when type is "deposito"', () => {
      let transacaoCreateDepositoStub: SinonStub;
      const result = { data: transacaoFullMock };

      before(async () => {
        transacaoCreateDepositoStub = stub(transacoesService, 'createDeposito');
        transacaoCreateDepositoStub.resolves(transacaoFullMock);

        statusStub.returns(response);
        request.body = { tipo: 'deposito' };

        await transacoesController.create(request, response);
      });

      after(() => {
        statusStub.reset();

        transacaoCreateDepositoStub.restore();
        request.body = {};
      });

      it('call the response.status with HTTP status code for CREATED', async () => {
        expect(statusStub.calledWith(StatusCodes.CREATED)).to.be.true;
      });

      it('call the operacoesService.createDeposito once', () => {
        expect(transacaoCreateDepositoStub.calledOnce).to.be.true;
      });

      it('call the response.json with transaction registered', async () => {
        expect(jsonStub.calledWith(result)).to.be.true;
      });
    });

    describe('when type is "saque"', () => {
      let transacaoCreateSaqueStub: SinonStub;
      const result = { data: transacaoFullMock };

      before(async () => {
        transacaoCreateSaqueStub = stub(transacoesService, 'createSaque');
        transacaoCreateSaqueStub.resolves(transacaoFullMock);

        statusStub.returns(response);
        request.body = { tipo: 'saque' };

        await transacoesController.create(request, response);
      });

      after(() => {
        statusStub.reset();

        transacaoCreateSaqueStub.restore();
        request.body = {};
      });

      it('call the response.status with HTTP status code for CREATED', async () => {
        expect(statusStub.calledWith(StatusCodes.CREATED)).to.be.true;
      });

      it('call the operacoesService.createSaque once', () => {
        expect(transacaoCreateSaqueStub.calledOnce).to.be.true;
      });

      it('call the response.json with transaction registered', async () => {
        expect(jsonStub.calledWith(result)).to.be.true;
      });
    });
  });
});
