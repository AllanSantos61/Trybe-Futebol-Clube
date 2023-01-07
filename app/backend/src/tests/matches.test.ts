import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import { StatusCodes } from 'http-status-codes';
import Match from '../database/models/Match';
import { invalidMatchesMock, matchesMock, missingFieldsMock, newMatchMock, newMatchResponseMock, updateMatchMock } from './mocks/matchesMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('/matches', () => {
  let chaiHttpResponse: Response;

  describe('GET', () => {
    afterEach(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('RETURN OK', async () => {
      sinon.stub(Match, 'findAll').resolves(matchesMock as unknown[] as Match[]);

      chaiHttpResponse = await chai.request(app).get('/matches');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
      expect(chaiHttpResponse.body).to.deep.equal(matchesMock);
    }); 

    it('RETURN IN PROGRESS', async () => {
      sinon.stub(Match, 'findAll').resolves([matchesMock[1]] as unknown[] as Match[]);

      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
      expect(chaiHttpResponse.body).to.deep.equal([matchesMock[1]]);
    });
    
    it('RETURN NOT PROGRESS', async () => {
      sinon.stub(Match, 'findAll').resolves([matchesMock[0]] as unknown[] as Match[]);

      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
      expect(chaiHttpResponse.body).to.deep.equal([matchesMock[0]]);
    }); 
  });

  describe('POST', () => {
    describe('OK', () => {
      it('CREATE', async () => {
        sinon.stub(jwt, 'verify').resolves({ id: 1 });
        sinon.stub(Match, 'create').resolves(newMatchResponseMock as Match);

        chaiHttpResponse = await chai.request(app)
          .post('/matches')
          .send(newMatchMock)
          .set('Authorization', 'something');
  
        expect(chaiHttpResponse.status).to.be.equal(StatusCodes.CREATED);
        expect(chaiHttpResponse.body).to.deep.equal(newMatchResponseMock);

        (jwt.verify as sinon.SinonStub).restore();
      }); 
    });
    
    describe('FAIL', () => {
      describe('POST', () => {
        beforeEach(() => {
          sinon.stub(jwt, 'verify').resolves({ id: 1 });
        });
        
        afterEach(() => {
          (jwt.verify as sinon.SinonStub).restore();
        });

        it('EQUAL', async () => {
          chaiHttpResponse = await chai.request(app)
            .post('/matches')
            .send(invalidMatchesMock[0])
            .set('Authorization', 'something');
    
          expect(chaiHttpResponse.status).to.be.equal(StatusCodes.UNPROCESSABLE_ENTITY);
          expect(chaiHttpResponse.body).to.deep.equal({
            message: 'It is not possible to create a match with two equal teams',
          });
        }); 

        it('TEAM NOT EXIST', async () => {
          chaiHttpResponse = await chai.request(app)
            .post('/matches')
            .send(invalidMatchesMock[1])
            .set('Authorization', 'something');
    
          expect(chaiHttpResponse.status).to.be.equal(StatusCodes.NOT_FOUND);
          expect(chaiHttpResponse.body).to.deep.equal({
            message: 'There is no team with such id!',
          });
        }); 

        it('MISSING FIELDS', async () => {
          chaiHttpResponse = await chai.request(app)
            .post('/matches')
            .send(missingFieldsMock)
            .set('Authorization', 'something');
    
          expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
          expect(chaiHttpResponse.body).to.deep.equal({
            message: 'All fields must be filled',
          });
        }); 
      });

      describe('TOKEN', () => {
        it('INVALID', async () => {
          chaiHttpResponse = await chai.request(app)
            .post('/matches')
            .send(newMatchMock)
            .set('Authorization', 'something');
    
          expect(chaiHttpResponse.status).to.be.equal(StatusCodes.UNAUTHORIZED);
          expect(chaiHttpResponse.body).to.deep.equal({
            message: 'Token must be a valid token',
          });
        }); 
      });
    });
  });
});

describe('/matches/:id', () => {
  let chaiHttpResponse: Response;

  describe('PATCH', () => {
    afterEach(() => {
      (Match.update as sinon.SinonStub).restore();
    });

    describe('/matches/:id', () => {
      it('EDIT OK', async () => {
        sinon.stub(Match, 'update').resolves([1]);

        chaiHttpResponse = await chai.request(app)
          .patch('/matches/1/')
          .send(updateMatchMock);
  
        expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
        expect(chaiHttpResponse.body).to.deep.equal({
          message: 'Successfully updated!',
        });
      }); 

      it('UPDATE FAIL', async () => {
        sinon.stub(Match, 'update').resolves([-1]);

        chaiHttpResponse = await chai.request(app).patch('/matches/1/');
  
        expect(chaiHttpResponse.status).to.be.equal(StatusCodes.NOT_FOUND);
        expect(chaiHttpResponse.body).to.deep.equal({
          message: 'Update unsuccessful!',
        });
      }); 
    });

    describe('/matches/:id/finish', () => {
      it('OK', async () => {
        sinon.stub(Match, 'update').resolves([1]);

        chaiHttpResponse = await chai.request(app).patch('/matches/1/finish')
    
        expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
        expect(chaiHttpResponse.body).to.deep.equal({
          message: 'Finished',
        });
      }); 

      it('FAIL', async () => {
        sinon.stub(Match, 'update').resolves([-1]);

        chaiHttpResponse = await chai.request(app).patch('/matches/1/finish')
    
        expect(chaiHttpResponse.status).to.be.equal(StatusCodes.NOT_FOUND);
        expect(chaiHttpResponse.body).to.deep.equal({
          message: 'Update unsuccessful!',
        });
      }); 
    });
  });
});
