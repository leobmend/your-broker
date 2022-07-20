import { stub, SinonStub } from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ativosController from '../../../src/controllers/ativos.controller';

import ativosService from '../../../src/services/ativos.service';

import { ativoFullListMock, ativoFullMock } from '../../mocks/ativo.mock';

describe('Controller "Ativos":', () => {
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

  describe('method "getBySearch" should', () => {
    let ativosGetBySearchStub: SinonStub;
    const result = { data: ativoFullListMock };

    before(() => {
      ativosGetBySearchStub = stub(ativosService, 'getBySearch');
      ativosGetBySearchStub.resolves(ativoFullListMock);

      statusStub.returns(response);
    });

    after(() => {
      statusStub.reset();

      ativosGetBySearchStub.restore();
    });

    it('call the response.status with HTTP status code for OK', async () => {
      await ativosController.getBySearch(request, response);

      expect(statusStub.calledWith(StatusCodes.OK)).to.be.true;
    });

    it('call the response.json with assets found', async () => {
      await ativosController.getBySearch(request, response);

      expect(jsonStub.calledWith(result)).to.be.true;
    });
  });

  describe('method "getByCod" should', () => {
    let ativoGetByCodStub: SinonStub;
    const result = { data: ativoFullMock };

    before(() => {
      ativoGetByCodStub = stub(ativosService, 'getByCod');
      ativoGetByCodStub.resolves(ativoFullMock);

      statusStub.returns(response);
    });

    after(() => {
      statusStub.reset();

      ativoGetByCodStub.restore();
    });

    it('call the response.status with HTTP status code for OK', async () => {
      await ativosController.getByCod(request, response);

      expect(statusStub.calledWith(StatusCodes.OK)).to.be.true;
    });

    it('call the response.json with asset found', async () => {
      await ativosController.getByCod(request, response);

      expect(jsonStub.calledWith(result)).to.be.true;
    });
  });
});
