import { stub } from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import clientesService from '../../../src/services/clientes.service';

import { ICliente } from '../../../src/interfaces/clientes.interface';

import Cliente from '../../../src/database/models/clientes.model';
import bcryptUtils from '../../../src/utils/bcrypt.util';

import { clienteFullMock, clienteGetMock, clientePostMock } from '../../mocks/cliente.mock';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Service "Clientes":', () => {
  const findByPkStub = stub(Cliente, 'findByPk');
  const findOneStub = stub(Cliente, 'findOne');
  const createStub = stub(Cliente, 'create');
  const updateStub = stub(Cliente, 'update');
  const bcryptCompareSutb = stub(bcryptUtils, 'comparePassword');

  describe('method "getByCod" should', () => {
    describe('when the investor is not registered', () => {
      before(() => {
        findByPkStub.resolves(null);
      });

      after(() => {
        findByPkStub.reset();
      });

      it(
        'throw an error with the message "Cliente não encontrado"',
        async () => (
          expect(clientesService.getByCod(10))
            .to.eventually.be.rejected.and.have.property('message', 'Cliente não encontrado')
        ),
      );
    });

    describe('when the investor is registered', () => {
      let cliente: ICliente;

      before(async () => {
        findByPkStub.resolves(clienteGetMock as Cliente);
        cliente = await clientesService.getByCod(1);
      });

      after(() => {
        findByPkStub.reset();
      });

      it('call the Cliente.findByPk once', () => {
        expect(findByPkStub.calledOnce).to.be.true;
      });

      it('return an object', () => {
        expect(cliente).to.be.an('object');
      });

      it('return an object with the follow properties: "codCliente", "nome", "email" and "saldo"', () => {
        ['codCliente', 'nome', 'email', 'saldo'].forEach((property) => {
          expect(cliente).to.have.property(property);
        });
      });
    });
  });

  describe('method "create" should', () => {
    describe('when the investor is already registered', () => {
      before(() => {
        findOneStub.resolves(clienteGetMock as Cliente);
      });

      after(() => {
        findOneStub.reset();
      });

      it('throw an error with the message "Cadastro inválido"', async () => (
        expect(clientesService.create(clientePostMock))
          .to.eventually.be.rejected.and.have.property('message', 'Cadastro inválido')
      ));
    });

    describe('when is a new investor', () => {
      let token: string;

      before(async () => {
        findOneStub.resolves(null);
        createStub.resolves(clienteFullMock as Cliente);
        token = await clientesService.create(clientePostMock);
      });

      after(() => {
        findOneStub.reset();
        createStub.reset();
      });

      it('call the Cliente.findOne once', () => {
        expect(findOneStub.calledOnce).to.be.true;
      });

      it('call the Cliente.create once', () => {
        expect(createStub.calledOnce).to.be.true;
      });

      it('return a string', () => {
        expect(token).to.be.an('string');
      });
    });
  });

  describe('method "authenticate" should', () => {
    describe('when investor is not registered', () => {
      before(() => {
        findOneStub.resolves(null);
      });

      after(() => {
        findOneStub.reset();
      });

      it('throw an error with the message "Cadastro não encontrado"', async () => (
        expect(clientesService.authenticate(clientePostMock))
          .to.eventually.be.rejected.and.have.property('message', 'Cadastro não encontrado')
      ));
    });

    describe('when investor is registered but password is wrong', () => {
      before(async () => {
        findOneStub.resolves(clienteFullMock as Cliente);
      });

      after(() => {
        findOneStub.reset();
      });

      it('throw an error with the message "Senha incorreta"', async () => (
        expect(clientesService.authenticate({ ...clientePostMock, senha: 'wrong-password' }))
          .to.eventually.be.rejected.and.have.property('message', 'Senha incorreta')
      ));
    });

    describe('when investor is registered and password is correct', () => {
      let token: string;

      before(async () => {
        findOneStub.resolves(clienteFullMock as Cliente);
        bcryptCompareSutb.resolves(true);
        token = await clientesService.authenticate(clientePostMock);
      });

      after(() => {
        findOneStub.reset();
        bcryptCompareSutb.reset();
      });

      it('call the Cliente.findOne once', () => {
        expect(findOneStub.calledOnce).to.be.true;
      });

      it('return a string', () => {
        expect(token).to.be.an('string');
      });
    });
  });

  describe('method "updateSaldo" should', () => {
    const NEW_SALDO = 100000;

    describe('when the investor is not registered', () => {
      before(() => {
        findByPkStub.resolves(null);
      });

      after(() => {
        findByPkStub.reset();
      });

      it('throw an error with the message "Cliente não encontrado"', async () => (
        expect(clientesService.updateSaldo(10, 500))
          .to.eventually.be.rejected.and.have.property('message', 'Cliente não encontrado')
      ));
    });

    describe('when the investor is registered', () => {
      before(async () => {
        findByPkStub.resolves(clienteGetMock as Cliente);
        await clientesService.updateSaldo(1, NEW_SALDO);
      });

      after(() => {
        findByPkStub.reset();
      });

      it('call the Cliente.findByPk once', () => {
        expect(findByPkStub.calledOnce).to.be.true;
      });

      it('call the Cliente.update once', () => {
        expect(updateStub.calledOnce).to.be.true;
      });
    });
  });
});
