import { stub, SinonStub } from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import operacoesController from '../../../src/controllers/operacoes.controller';

import operacoesService from '../../../src/services/operacoes.service';

import { operacaoFullListMock, operacaoFullMock } from '../../mocks/operacao.mock';

describe('Controller "Operacoes":', () => {
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
    let operacoesGetByClienteStub: SinonStub;
    const result = { data: operacaoFullListMock };

    before(() => {
      operacoesGetByClienteStub = stub(operacoesService, 'getByCliente');
      operacoesGetByClienteStub.resolves(operacaoFullListMock);

      statusStub.returns(response);
    });

    after(() => {
      statusStub.reset();

      operacoesGetByClienteStub.restore();
    });

    it('call the response.status with HTTP status code for OK', async () => {
      await operacoesController.getByCliente(request, response);

      expect(statusStub.calledWith(StatusCodes.OK)).to.be.true;
    });

    it('call the response.json with operations found', async () => {
      await operacoesController.getByCliente(request, response);

      expect(jsonStub.calledWith(result)).to.be.true;
    });
  });

  describe('method "create" should', () => {
    describe('when type is "compra"', () => {
      let operationCreateCompraStub: SinonStub;
      const result = { data: operacaoFullMock };

      before(async () => {
        operationCreateCompraStub = stub(operacoesService, 'createCompra');
        operationCreateCompraStub.resolves(operacaoFullMock);

        statusStub.returns(response);
        request.body = { tipo: 'compra' };

        await operacoesController.create(request, response);
      });

      after(() => {
        statusStub.reset();

        operationCreateCompraStub.restore();
        request.body = {};
      });

      it('call the response.status with HTTP status code for CREATED', async () => {
        expect(statusStub.calledWith(StatusCodes.CREATED)).to.be.true;
      });

      it('call the operacoesService.createCompra once', () => {
        expect(operationCreateCompraStub.calledOnce).to.be.true;
      });

      it('call the response.json with operation registered', async () => {
        expect(jsonStub.calledWith(result)).to.be.true;
      });
    });

    describe('when type is "venda"', () => {
      let operationCreateVendaStub: SinonStub;
      const result = { data: operacaoFullMock };

      before(async () => {
        operationCreateVendaStub = stub(operacoesService, 'createVenda');
        operationCreateVendaStub.resolves(operacaoFullMock);

        statusStub.returns(response);
        request.body = { tipo: 'venda' };

        await operacoesController.create(request, response);
      });

      after(() => {
        statusStub.reset();

        operationCreateVendaStub.restore();
        request.body = {};
      });

      it('call the response.status with HTTP status code for CREATED', async () => {
        expect(statusStub.calledWith(StatusCodes.CREATED)).to.be.true;
      });

      it('call the operacoesService.createVenda once', () => {
        expect(operationCreateVendaStub.calledOnce).to.be.true;
      });

      it('call the response.json with operation registered', async () => {
        expect(jsonStub.calledWith(result)).to.be.true;
      });
    });
  });
});
