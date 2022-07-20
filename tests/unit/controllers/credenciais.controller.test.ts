import { stub, SinonStub } from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import credenciaisController from '../../../src/controllers/credenciais.controller';

import clientesService from '../../../src/services/clientes.service';

const JWT_TOKEN_MOCK = 'jwt-token-mock';

describe('Controller "Credenciais":', () => {
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

  describe('method "createAccount" should', () => {
    let clienteCreateStub: SinonStub;
    const result = { token: JWT_TOKEN_MOCK };

    before(() => {
      clienteCreateStub = stub(clientesService, 'create');
      clienteCreateStub.resolves(JWT_TOKEN_MOCK);

      statusStub.returns(response);
    });

    after(() => {
      statusStub.reset();

      clienteCreateStub.restore();
    });

    it('call the response.status with HTTP status code for CREATED', async () => {
      await credenciaisController.createAccount(request, response);

      expect(statusStub.calledWith(StatusCodes.CREATED)).to.be.true;
    });

    it('call the response.json with jwt token', async () => {
      await credenciaisController.createAccount(request, response);

      expect(jsonStub.calledWith(result)).to.be.true;
    });
  });

  describe('method "login" should', () => {
    let clienteAuthenticateStub: SinonStub;
    const result = { token: JWT_TOKEN_MOCK };

    before(() => {
      clienteAuthenticateStub = stub(clientesService, 'authenticate');
      clienteAuthenticateStub.resolves(JWT_TOKEN_MOCK);

      statusStub.returns(response);
    });

    after(() => {
      statusStub.reset();

      clienteAuthenticateStub.restore();
    });

    it('call the response.status with HTTP status code for OK', async () => {
      await credenciaisController.login(request, response);

      expect(statusStub.calledWith(StatusCodes.OK)).to.be.true;
    });

    it('call the response.json with jwt token', async () => {
      await credenciaisController.login(request, response);

      expect(jsonStub.calledWith(result)).to.be.true;
    });
  });
});
