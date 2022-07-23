import { SinonStub, stub } from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import clientesService from '../../../src/services/clientes.service';

import { ICliente } from '../../../src/interfaces/clientes.interface';

import Cliente from '../../../src/database/models/clientes.model';
import jwtUtils from '../../../src/utils/jwt.util';
import bcryptUtils from '../../../src/utils/bcrypt.util';

import {
  clienteFullMock, clienteGetMock, clientePatchMock, clientePostMock,
} from '../../mocks/cliente.mock';

const JWT_TOKEN_MOCK = 'jwt-token-mock';
const HASHED_SENHA_MOCK = 'hashed-senha-mock';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Service "Clientes":', () => {
  let findByPkStub: SinonStub;
  let findOneStub: SinonStub;
  let createStub: SinonStub;
  let updateStub: SinonStub;
  let bcryptHashStub: SinonStub;
  let bcryptCompareStub: SinonStub;
  let jwtGenerateTokenStub: SinonStub;

  before(() => {
    findByPkStub = stub(Cliente, 'findByPk');
    findOneStub = stub(Cliente, 'findOne');
    createStub = stub(Cliente, 'create');
    updateStub = stub(Cliente, 'update');
    bcryptHashStub = stub(bcryptUtils, 'hashPassword');
    bcryptCompareStub = stub(bcryptUtils, 'comparePassword');
    jwtGenerateTokenStub = stub(jwtUtils, 'generateToken');
  });

  after(() => {
    findByPkStub.restore();
    findOneStub.restore();
    createStub.restore();
    updateStub.restore();
    bcryptHashStub.restore();
    bcryptCompareStub.restore();
    jwtGenerateTokenStub.restore();
  });

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
        findByPkStub.resolves(clienteGetMock);
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
        findOneStub.resolves(clienteGetMock);
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
        createStub.resolves(clienteFullMock);
        bcryptHashStub.returns(HASHED_SENHA_MOCK);
        jwtGenerateTokenStub.returns(JWT_TOKEN_MOCK);
        token = await clientesService.create(clientePostMock);
      });

      after(() => {
        findOneStub.reset();
        createStub.reset();
        bcryptHashStub.reset();
        jwtGenerateTokenStub.reset();
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

  describe('method "editProfile" should', () => {
    describe('when the email is already registered', () => {
      before(() => {
        findByPkStub.resolves(clienteGetMock);
        findOneStub.resolves(clienteGetMock);
      });

      after(() => {
        findByPkStub.reset();
        findOneStub.reset();
      });

      it('throw an error with the message "Cadastro inválido"', async () => (
        expect(clientesService.create(clientePatchMock))
          .to.eventually.be.rejected.and.have.property('message', 'Cadastro inválido')
      ));
    });

    describe('when the email isn\'t inside the patch or isn\'t registered yet', () => {
      let cliente: ICliente;

      before(async () => {
        findByPkStub.resolves(clienteGetMock);
        findOneStub.resolves(null);
        bcryptHashStub.returns(HASHED_SENHA_MOCK);
        cliente = await clientesService.editProfile(1, clientePatchMock);
      });

      after(() => {
        findByPkStub.reset();
        findOneStub.reset();
        bcryptHashStub.reset();
        updateStub.reset();
      });

      it('call the Cliente.update once', () => {
        expect(updateStub.calledOnce).to.be.true;
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
        findOneStub.resolves(clienteFullMock);
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
        findOneStub.resolves(clienteFullMock);
        bcryptCompareStub.resolves(true);
        jwtGenerateTokenStub.returns(JWT_TOKEN_MOCK);
        token = await clientesService.authenticate(clientePostMock);
      });

      after(() => {
        findOneStub.reset();
        bcryptCompareStub.reset();
        jwtGenerateTokenStub.reset();
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
        findByPkStub.resolves(clienteGetMock);
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
