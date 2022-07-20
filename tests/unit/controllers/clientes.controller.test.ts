import { stub, SinonStub } from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import clientesController from '../../../src/controllers/clientes.controller';

import clientesService from '../../../src/services/clientes.service';

import { clienteGetMock } from '../../mocks/cliente.mock';

describe('Controller "Clientes":', () => {
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

  describe('method "getByCod" should', () => {
    let clienteGetByCodStub: SinonStub;
    const result = { data: clienteGetMock };

    before(() => {
      clienteGetByCodStub = stub(clientesService, 'getByCod');
      clienteGetByCodStub.resolves(clienteGetMock);

      statusStub.returns(response);
    });

    after(() => {
      statusStub.reset();

      clienteGetByCodStub.restore();
    });

    it('call the response.status with HTTP status code for OK', async () => {
      await clientesController.getByCod(request, response);

      expect(statusStub.calledWith(StatusCodes.OK)).to.be.true;
    });

    it('call the response.json with client found', async () => {
      await clientesController.getByCod(request, response);

      expect(jsonStub.calledWith(result)).to.be.true;
    });
  });
});
