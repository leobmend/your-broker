import { stub, SinonStub } from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import investimentosController from '../../../src/controllers/investimentos.controller';

import investimentosServices from '../../../src/services/investimentos.service';

import { investimentoListMock } from '../../mocks/investimento.mock';

describe('Controller "Investimentos":', () => {
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
    let investimentosGetByClienteStub: SinonStub;
    const result = { data: investimentoListMock };

    before(() => {
      investimentosGetByClienteStub = stub(investimentosServices, 'getByCliente');
      investimentosGetByClienteStub.resolves(investimentoListMock);

      statusStub.returns(response);
    });

    after(() => {
      statusStub.reset();

      investimentosGetByClienteStub.restore();
    });

    it('call the response.status with HTTP status code for OK', async () => {
      await investimentosController.getByCliente(request, response);

      expect(statusStub.calledWith(StatusCodes.OK)).to.be.true;
    });

    it('call the response.json with investments found', async () => {
      await investimentosController.getByCliente(request, response);

      expect(jsonStub.calledWith(result)).to.be.true;
    });
  });
});
