import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jsonwebtoken from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/User';
import {
  dataToken, invalidLogins, loginMock, userMock,
} from './mocks/userMock';
import { afterEach } from 'node:test';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('/login', () => {
  let chaiHttpResponse: Response;

  describe('POST', () => {
    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
      (bcryptjs.compare as sinon.SinonStub).restore();
    });

    describe('OK', () => {
      test('Login OK', async () => {
        sinon.stub(User, 'findOne').resolves(userMock as User);
        sinon.stub(jsonwebtoken, 'sign').resolves('generateToken');
        sinon.stub(bcryptjs, 'compare').resolves(true);

        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(loginMock);

          expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
          expect(chaiHttpResponse.body).to.deep.equal({
            token: 'generateToken',
          });
          (jsonwebtoken.sign as sinon.SinonStub).restore();
      }); 
    });

    describe('ERROR', () => {
      beforeEach(async () => {
        sinon.stub(User, 'findOne').resolves(undefined);
        sinon.stub(bcryptjs, 'compare').resolves(false);
      })

      it('NOT EMAIL', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(invalidLogins[0]);

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.deep.equal({
          message: 'All fields must be filled',
        });
      });

      it('NOT PASSWORD', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(invalidLogins[1]);

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.deep.equal({
          message: 'All fields must be filled',
        });
      });

      it('INVALID EMAIL', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(invalidLogins[2]);

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({
          message: 'Incorrect email or password',
        });
      });

      it('INVALID PASSWORD', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({ ...loginMock, password: 'coxinha' });

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({
          message: 'Incorrect email or password',
        });
      });
    });
  });
});

describe('/login/validate', () => {
  let chaiHttpResponse: Response;

  describe('GET', () => {
    beforeEach(() => {
      sinon.stub(jsonwebtoken, 'verify').resolves(dataToken);
    });

    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    test('RETURN', async () => {
      sinon.stub(User, 'findOne').resolves(userMock as User);

      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'something');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({
        role: userMock.role,
      });
    }); 

    test('NOT EXISTS', async () => {
      sinon.stub(User, 'findOne').resolves(undefined);

      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'something');

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'User not found',
      });
    }); 
  });
});
